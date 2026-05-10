from dotenv import load_dotenv
from pydantic import Field, SecretStr
from pydantic_settings import BaseSettings

load_dotenv()

class Settings(BaseSettings):
    supabase_url: str = Field(..., env="SUPABASE_URL")
    supabase_key: SecretStr = Field(..., env="SUPABASE_KEY")
    db_database_url: str = Field(..., env="DB_DATABASE_URL")
    openai_api_key: SecretStr = Field(..., env="OPENAI_API_KEY")

    class Config:
        env_file = ".env"

settings = Settings()

DATABASE_URL = settings.db_database_url
