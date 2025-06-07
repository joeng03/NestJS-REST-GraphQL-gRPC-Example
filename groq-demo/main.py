from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from datetime import datetime, timedelta
from jose import JWTError, jwt
from typing import Optional
import os
from dotenv import load_dotenv
from groq_service import GroqService


# Load environment variables
load_dotenv()

# Secret key to encode JWT
SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='login')

# User model
class User(BaseModel):
    username: str
    password: str

# Token model
class Token(BaseModel):
    access_token: str
    token_type: str

# In-memory user store
users_db = {}

groq_service = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load Groq service
    global groq_service
    groq_service = GroqService()
    yield

# FastAPI app
app = FastAPI(lifespan=lifespan)

# Create access token
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=60)
    to_encode.update({'exp': expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Signup endpoint
@app.post('/signup')
async def signup(user: User):
    if user.username in users_db:
        raise HTTPException(status_code=400, detail='User already exists')
    users_db[user.username] = user.password
    return {'msg': 'User created successfully'}

# Login endpoint
@app.post('/login', response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user_password = users_db.get(form_data.username)
    if not user_password or user_password != form_data.password:
        raise HTTPException(status_code=400, detail='Incorrect username or password')
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={'sub': form_data.username}, expires_delta=access_token_expires
    )
    return {'access_token': access_token, 'token_type': 'bearer'}


@app.post('/transcribe')
async def transcribe(file: UploadFile = File(...), token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get('sub')
        if username is None:
            raise HTTPException(status_code=401, detail='Could not validate credentials')
    except JWTError:
        raise HTTPException(status_code=401, detail='Could not validate credentials')
    
    transcription = await groq_service.transcribe(file.file)
    return transcription

# Rate limiting middleware
@app.middleware('http')
async def rate_limit(request, call_next):
    # Implement rate limiting logic here
    response = await call_next(request)
    return response