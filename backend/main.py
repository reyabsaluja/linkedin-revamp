from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict

class RevampRequest(BaseModel):
    url: str

class RevampResponse(BaseModel):
    original_profile: Dict
    message: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/revamp", response_model=RevampResponse)
async def revamp_profile(data: RevampRequest):
    print(f"Received LinkedIn URL: {data.url}")

    # Simulated scraped data
    scraped_data = {
        "name": "Jane Doe",
        "headline": "Software Engineer at Meta",
        "about": "Passionate about building impactful tech products.",
        "experience": [
            {"title": "Software Engineer", "company": "Meta", "years": "2022–Present"},
            {"title": "Intern", "company": "Amazon", "years": "2021"},
        ],
    }

    return {
        "original_profile": scraped_data,
        "message": "Profile scraped successfully (simulated)",
    }
