from pydantic import BaseModel

class UserBase(BaseModel):
    email: str
    username: str

class UserCreate(UserBase):
    password: str

class UserDisplay(UserBase):
    id: int
    message: str = "Logged in successfully"
    session_token: str

class UserLogin(BaseModel):
    email_or_username: str
    password: str
