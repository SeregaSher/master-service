from app import models


def user_to_dict(user: models.User) -> dict:
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "rating": user.rating,
        "balance": user.balance,
        "trust": user.trust,
    }


def master_to_dict(master: models.Master) -> dict:
    return {
        "id": master.id,
        "name": master.name,
        "profession": master.profession,
        "city": master.city,
        "rating": master.rating,
        "reviews": master.reviews,
        "verified": master.verified,
        "skills": master.skills,
        "price": master.price,
    }


def request_to_dict(request: models.ServiceRequest) -> dict:
    return {
        "id": request.id,
        "client": request.client,
        "category": request.category,
        "city": request.city,
        "symptom": request.symptom,
        "budget": request.budget,
        "urgency": request.urgency,
        "status": request.status,
        "masterId": request.master_id,
        "slot": request.slot,
        "evidence": [],
    }


def knowledge_to_dict(article: models.KnowledgeArticle) -> dict:
    return {
        "id": article.id,
        "audience": article.audience,
        "category": article.category,
        "title": article.title,
        "difficulty": article.difficulty,
        "redFlags": article.red_flags,
        "priceRange": article.price_range,
        "steps": article.steps,
    }


def booking_to_dict(booking: models.Booking) -> dict:
    return {
        "id": booking.id,
        "requestId": booking.request_id,
        "masterId": booking.master_id,
        "slot": booking.slot,
        "status": booking.status,
    }


def inventory_to_dict(item: models.InventoryItem) -> dict:
    return {
        "sku": item.sku,
        "name": item.name,
        "qty": item.qty,
        "supplier": item.supplier,
        "price": item.price,
    }


def forum_to_dict(topic: models.ForumTopic) -> dict:
    return {
        "id": topic.id,
        "author": topic.author,
        "role": topic.role,
        "topic": topic.topic,
        "replies": topic.replies,
    }


def dispute_to_dict(dispute: models.Dispute) -> dict:
    return {
        "id": dispute.id,
        "requestId": dispute.request_id,
        "openedBy": dispute.opened_by,
        "reason": dispute.reason,
        "status": dispute.status,
    }


def proof_to_dict(proof: models.ProofLog) -> dict:
    return {
        "id": proof.id,
        "requestId": proof.request_id,
        "createdAt": proof.created_at,
        "geo": proof.geo,
        "note": proof.note,
    }
