import time
from collections.abc import Callable
from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.exc import OperationalError
from sqlalchemy.orm import Session

from app import models, schemas
from app.config import settings
from app.database import Base, SessionLocal, engine, get_db
from app.seed import seed_database
from app.security import create_token, hash_password, verify_password, verify_token
from app.serializers import (
    booking_to_dict,
    dispute_to_dict,
    forum_to_dict,
    inventory_to_dict,
    knowledge_to_dict,
    master_to_dict,
    proof_to_dict,
    request_to_dict,
    user_to_dict,
)


def wait_for_database() -> None:
    for _ in range(30):
        try:
            with engine.connect() as connection:
                connection.execute(text("SELECT 1"))
            return
        except OperationalError:
            time.sleep(1)
    raise RuntimeError("Database is not available")


@asynccontextmanager
async def lifespan(app: FastAPI):
    wait_for_database()
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        seed_database(db)
    yield


app = FastAPI(title=settings.app_name, lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_current_user(
    authorization: str | None = Header(default=None),
    db: Session = Depends(get_db),
) -> models.User:
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="Missing bearer token")
    user_id = verify_token(authorization.split(" ", 1)[1].strip())
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = db.get(models.User, user_id)
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


@app.get("/health")
def health() -> dict:
    return {"status": "ok", "app": settings.app_name}


@app.post("/api/auth/register")
def register(payload: schemas.RegisterCreate, db: Session = Depends(get_db)) -> dict:
    email = payload.email.strip().lower()
    if db.query(models.User).filter(models.User.email == email).first():
        raise HTTPException(status_code=409, detail="Email already registered")

    allowed_roles = {"client", "master", "store"}
    role = payload.role if payload.role in allowed_roles else "client"
    user = models.User(
        name=payload.name.strip(),
        email=email,
        role=role,
        rating=5.0,
        balance=0,
        trust=70,
    )
    db.add(user)
    db.flush()
    db.add(models.AuthAccount(user_id=user.id, password_hash=hash_password(payload.password)))
    db.commit()
    db.refresh(user)
    return {"token": create_token(user.id), "user": user_to_dict(user), "role": user.role}


@app.post("/api/auth/login")
def login(payload: schemas.LoginCreate, db: Session = Depends(get_db)) -> dict:
    email = payload.email.strip().lower()
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    account = db.query(models.AuthAccount).filter(models.AuthAccount.user_id == user.id).first()
    if not account or not verify_password(payload.password, account.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {"token": create_token(user.id), "user": user_to_dict(user), "role": user.role}


@app.get("/api/auth/me")
def me(user: models.User = Depends(get_current_user)) -> dict:
    return {"user": user_to_dict(user), "role": user.role}


@app.get("/api/bootstrap")
def bootstrap(db: Session = Depends(get_db)) -> dict:
    user = db.query(models.User).order_by(models.User.id).first()
    if not user:
        raise HTTPException(status_code=500, detail="Seed user missing")

    return {
        "currentUser": user_to_dict(user),
        "masters": [master_to_dict(item) for item in db.query(models.Master).order_by(models.Master.id).all()],
        "requests": [
            request_to_dict(item)
            for item in db.query(models.ServiceRequest).order_by(models.ServiceRequest.id.desc()).all()
        ],
        "knowledge": [
            knowledge_to_dict(item)
            for item in db.query(models.KnowledgeArticle).order_by(models.KnowledgeArticle.id).all()
        ],
        "bookings": [booking_to_dict(item) for item in db.query(models.Booking).order_by(models.Booking.id.desc()).all()],
        "inventory": [
            inventory_to_dict(item) for item in db.query(models.InventoryItem).order_by(models.InventoryItem.sku).all()
        ],
        "forum": [forum_to_dict(item) for item in db.query(models.ForumTopic).order_by(models.ForumTopic.id.desc()).all()],
        "disputes": [dispute_to_dict(item) for item in db.query(models.Dispute).order_by(models.Dispute.id.desc()).all()],
        "proofLog": [proof_to_dict(item) for item in db.query(models.ProofLog).order_by(models.ProofLog.id.desc()).all()],
    }


@app.post("/api/requests")
def create_request(payload: schemas.RequestCreate, db: Session = Depends(get_db)) -> dict:
    item = models.ServiceRequest(**payload.model_dump(), status="open")
    db.add(item)
    db.commit()
    db.refresh(item)
    return request_to_dict(item)


@app.patch("/api/requests/{request_id}")
def patch_request(request_id: int, payload: schemas.RequestPatch, db: Session = Depends(get_db)) -> dict:
    item = db.get(models.ServiceRequest, request_id)
    if not item:
        raise HTTPException(status_code=404, detail="Request not found")

    data = payload.model_dump(exclude_unset=True)
    if "status" in data:
        item.status = data["status"]
    if "masterId" in data:
        item.master_id = data["masterId"]
    if "slot" in data:
        item.slot = data["slot"] or ""

    db.commit()
    db.refresh(item)
    return request_to_dict(item)


@app.post("/api/bookings")
def create_booking(payload: schemas.BookingCreate, db: Session = Depends(get_db)) -> dict:
    request = db.get(models.ServiceRequest, payload.requestId)
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")
    if not db.get(models.Master, payload.masterId):
        raise HTTPException(status_code=404, detail="Master not found")

    booking = models.Booking(
        request_id=payload.requestId,
        master_id=payload.masterId,
        slot=payload.slot,
        status=payload.status,
    )
    request.master_id = payload.masterId
    request.slot = payload.slot
    request.status = "booked"
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking_to_dict(booking)


@app.post("/api/forum")
def create_forum_topic(payload: schemas.ForumCreate, db: Session = Depends(get_db)) -> dict:
    topic = models.ForumTopic(author=payload.author, role=payload.role, topic=payload.topic, replies=0)
    db.add(topic)
    db.commit()
    db.refresh(topic)
    return forum_to_dict(topic)


@app.post("/api/disputes")
def create_dispute(payload: schemas.DisputeCreate, db: Session = Depends(get_db)) -> dict:
    request = db.get(models.ServiceRequest, payload.requestId)
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")

    request.status = "dispute"
    dispute = models.Dispute(
        request_id=payload.requestId,
        opened_by=payload.openedBy,
        reason=payload.reason,
        status=payload.status,
    )
    db.add(dispute)
    db.commit()
    db.refresh(dispute)
    return dispute_to_dict(dispute)


@app.post("/api/proofs")
def create_proof(payload: schemas.ProofCreate, db: Session = Depends(get_db)) -> dict:
    request = db.get(models.ServiceRequest, payload.requestId)
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")

    request.status = "proof"
    proof = models.ProofLog(
        request_id=payload.requestId,
        created_at=payload.createdAt,
        geo=payload.geo,
        note=payload.note,
    )
    db.add(proof)
    db.commit()
    db.refresh(proof)
    return proof_to_dict(proof)


@app.post("/api/reset-demo")
def reset_demo(db: Session = Depends(get_db)) -> dict:
    deletion_order = [
        models.ProofLog,
        models.Dispute,
        models.ForumTopic,
        models.InventoryItem,
        models.Booking,
        models.KnowledgeArticle,
        models.ServiceRequest,
        models.Master,
        models.AuthAccount,
        models.User,
    ]
    for model in deletion_order:
        db.query(model).delete()
    db.commit()
    seed_database(db)
    return bootstrap(db)
