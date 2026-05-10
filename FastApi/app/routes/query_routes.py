import logging
import json
import numpy as np
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.config import settings
from app.utilities.embedding_service import EmbeddingService
from app.dependencies import get_db
from pydantic import BaseModel
from supabase import create_client

logger = logging.getLogger(__name__)
router = APIRouter()

try:
    supabase = create_client(settings.supabase_url, settings.supabase_key.get_secret_value())
    logger.info("Supabase client initialized successfully")
except Exception as e:
    logger.error(f"Error initializing Supabase client: {e}")
    raise HTTPException(status_code=500, detail="Failed to initialize Supabase client")

embedding_service = EmbeddingService(api_key=settings.openai_api_key.get_secret_value())

class QueryRequest(BaseModel):
    query: str

@router.post("/process-query/")
async def process_query(request: QueryRequest, db: Session = Depends(get_db)):
    try:
        query_embedding = embedding_service.get_embeddings(request.query)
        if query_embedding is None:
            raise HTTPException(status_code=500, detail="Failed to generate query embeddings.")

        if isinstance(query_embedding, np.ndarray):
            serialized_query_embedding = json.dumps(query_embedding.tolist())
        else:
            serialized_query_embedding = json.dumps(query_embedding)

        response = supabase.rpc(
            'match_vectors',
            {
                'query_embedding': serialized_query_embedding,
                'similarity_threshold': 0.8,
                'match_count': 5
            }
        ).execute()

        matched_data = response.data

        if not matched_data:
            logger.warning("No relevant data found for the given query embedding")
            raise HTTPException(status_code=404, detail="No relevant data found")

        # Construct context from matched data
        context = " ".join([item['content'] for item in matched_data])

    except Exception as e:
        logger.error(f"Error processing query: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing query: {str(e)}")
    
    return {"context": context}
