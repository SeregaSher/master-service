from pydantic import BaseModel, Field


class RegisterCreate(BaseModel):
    name: str
    email: str
    password: str = Field(min_length=6)
    role: str = "client"


class LoginCreate(BaseModel):
    email: str
    password: str


class RequestCreate(BaseModel):
    client: str
    category: str
    city: str
    symptom: str
    budget: int = 0
    urgency: str = "Не срочно"
    slot: str = ""


class RequestPatch(BaseModel):
    status: str | None = None
    masterId: int | None = None
    slot: str | None = None


class BookingCreate(BaseModel):
    requestId: int
    masterId: int
    slot: str
    status: str = "Подтверждено"


class ForumCreate(BaseModel):
    author: str
    role: str
    topic: str


class DisputeCreate(BaseModel):
    requestId: int
    openedBy: str
    reason: str
    status: str = "Сбор доказательств"


class ProofCreate(BaseModel):
    requestId: int
    createdAt: str
    geo: str
    note: str = Field(default="Мастер зафиксировал приезд.")
