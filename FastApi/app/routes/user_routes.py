import logging
from fastapi import APIRouter, HTTPException, Depends, Request
from sqlalchemy.orm import Session
from typing import cast
from app.models.user_models import User
from app.schemas.user_schemas import UserLogin, UserDisplay, UserCreate
from app.utilities.security import hash_password, verify_password
from app.dependencies import get_db

logger = logging.getLogger(__name__)
router = APIRouter()

active_sessions = {}

@router.post("/register", response_model=UserDisplay)
async def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already taken")
    hashed_password = hash_password(user.password)
    new_user = User(email=user.email, username=user.username, hashed_password=hashed_password, is_verified=False)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"email": new_user.email, "username": new_user.username, "id": new_user.id, "message": "User registered successfully", "session_token": ""}

@router.post("/login", response_model=UserDisplay)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(
        (User.email == user.email_or_username) |
        (User.username == user.email_or_username)
    ).first()
    if not db_user:
        logger.warning("Login failed: User not found for '%s'", user.email_or_username)
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(user.password, cast(str, db_user.hashed_password)):
        logger.warning("Login failed: Incorrect password for '%s'", user.email_or_username)
        raise HTTPException(status_code=400, detail="Incorrect password")

    session_token = f"session_{db_user.id}"
    active_sessions[session_token] = db_user.id

    return {
        "email": db_user.email,
        "username": db_user.username,
        "id": db_user.id,
        "message": "Logged in successfully",
        "session_token": session_token
    }

@router.post("/logout")
def logout(request: Request):
    authorization: str = request.headers.get("Authorization", "")
    logger.debug(f"Authorization Header: {authorization}")
    
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header is missing")

    if authorization.startswith("Bearer "):
        session_token = authorization[7:]
    else:
        raise HTTPException(status_code=401, detail="Bearer token not found")

    logger.debug(f"Session Token Extracted: {session_token}")

    if session_token not in active_sessions:
        logger.debug("Active sessions: " + str(active_sessions))
        raise HTTPException(status_code=401, detail="Invalid or missing session token")

    active_sessions.pop(session_token)
    return {"message": "Logged out successfully"}
