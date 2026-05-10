from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship
from app.db.base import Base

class SessionLog(Base):
    __tablename__ = 'session_logs'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    session_token = Column(String(255), nullable=False, unique=True)
    created_at = Column(DateTime, default=func.now())
    ended_at = Column(DateTime, nullable=True)
    user = relationship("User", back_populates="sessions")

    def __repr__(self):
        return f"<SessionLog(user_id={self.user_id}, session_token='{self.session_token}', created_at={self.created_at}, ended_at={self.ended_at})>"
