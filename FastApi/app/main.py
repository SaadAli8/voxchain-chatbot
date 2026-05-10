import logging
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from dotenv import load_dotenv
from app.db.database import create_tables
from app.routes.user_routes import router as user_router
from app.routes.content_routes import router as content_router
from app.routes.query_routes import router as query_router

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        create_tables()
    except Exception as e:
        logging.error(f"Failed to connect to the database: {e}")
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router, prefix="/api/user", tags=["User"])
app.include_router(content_router, prefix="/api/content", tags=["Content"])
app.include_router(query_router, prefix="/api/query", tags=["Query"])

@app.get("/")
async def root():
    return {"message": "Welcome to VoxChain-Chatbot API"}
