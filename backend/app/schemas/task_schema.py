from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime



class TaskCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=500)
    priority: Optional[str] = Field("medium", pattern="^(low|medium|high)$")



class TaskUpdate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=500)
    priority: Optional[str] = Field("medium", pattern="^(low|medium|high)$")



class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    priority: str
    completed: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True