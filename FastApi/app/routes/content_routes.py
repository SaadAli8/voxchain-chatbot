import logging
import json
import numpy as np
from fastapi import APIRouter, HTTPException, Depends, Request
from sqlalchemy.orm import Session
from app.config import settings
from app.models.webcontent_models import WebContent
from app.utilities.scraper import scrape_content_with_selenium
from app.utilities.document_processing import load_document, vectorize_to_supabase
from langchain_openai import OpenAIEmbeddings
from app.dependencies import get_db
from supabase import create_client
from pydantic import BaseModel

logger = logging.getLogger(__name__)
router = APIRouter()

try:
    supabase = create_client(settings.supabase_url, settings.supabase_key.get_secret_value())
    logger.info("Supabase client initialized successfully")
except Exception as e:
    logger.error(f"Error initializing Supabase client: {e}")
    raise HTTPException(status_code=500, detail="Failed to initialize Supabase client")

class WebURLRequest(BaseModel):
    web_url: str

@router.post("/scrape-and-store-content/")
async def scrape_and_store_content(request: Request, db: Session = Depends(get_db)):
    payload = await request.json()
    web_url = payload.get("web_url")
    if not web_url:
        raise HTTPException(status_code=400, detail="Web URL is missing")

    content = scrape_content_with_selenium(web_url)
    if content == "No content found on the page.":
        raise HTTPException(status_code=404, detail=content)

    embeddings = OpenAIEmbeddings(api_key=settings.openai_api_key.get_secret_value())
    if embeddings is None:
        raise HTTPException(status_code=500, detail="Failed to generate embeddings.")

    existing_content = db.query(WebContent).filter(WebContent.link == web_url).first()
    if existing_content:
        raise HTTPException(status_code=409, detail="Content already exists.")

    new_content = WebContent(link=web_url, content=content, embeddings=embeddings)
    db.add(new_content)
    db.commit()
    db.refresh(new_content)

    try:
        if isinstance(embeddings, np.ndarray):
            serialized_embeddings = json.dumps(embeddings.tolist())
        else:
            serialized_embeddings = json.dumps(embeddings)

        response = supabase.table('vox_chain').insert({
            "id": new_content.id,
            "link": new_content.link,
            "content": new_content.content,
            "embeddings": serialized_embeddings
        }).execute()

        logger.info(f"Supabase response: {response.data}")
    except Exception as e:
        logger.error(f"Exception occurred while uploading to Supabase: {e}")
        raise HTTPException(status_code=500, detail=f"An error occurred while uploading embeddings to Supabase: {str(e)}")

    return {"message": "Content and embeddings stored successfully", "supabase_response": response.data, "data": new_content}
