from sqlalchemy import Column, Integer, String, Text, JSON
from app.db.base import Base

class WebContent(Base):
    __tablename__ = 'web_content'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    link = Column(String(255), unique=True, nullable=False)
    content = Column(Text, nullable=False)
    embeddings = Column(JSON, nullable=True)

    def __repr__(self):
        return f"<WebContent(id={self.id}, link='{self.link}', content='{self.content[:30]}...')>"
