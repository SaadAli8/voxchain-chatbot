import openai
import logging

class EmbeddingService:
    def __init__(self, api_key: str):
        openai.api_key = api_key

    def get_embeddings(self, text: str, model: str = "text-embedding-3-small") -> list:
        try:
            response = openai.Embedding.create(
                model=model,
                input=text
            )
            if 'data' in response and response['data']:
                return response['data'][0]['embedding']
            else:
                logging.warning("No embedding data returned from OpenAI.")
                return None
        except Exception as e:
            logging.error(f"Error in generating embeddings: {e}")
            return None
