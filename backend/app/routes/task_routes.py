from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.models.user_model import User
from app.db.database import get_db
from app.schemas.task_schema import TaskCreate, TaskUpdate, TaskResponse
from app.services.task_service import (
    get_all_tasks,
    create_task,
    delete_task,
    update_task,
    toggle_task
)

router = APIRouter()


@router.get("/tasks", response_model=List[TaskResponse])
def get_tasks(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_all_tasks(db, current_user.id)


@router.post(
    "/tasks",
    response_model=TaskResponse,
    status_code=status.HTTP_201_CREATED
)
def add_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)   
):
    return create_task(
        db,
        task.title,
        task.description,
        task.priority,
        current_user.id   
    )


@router.delete("/tasks/{task_id}")
def remove_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    delete_task(db, task_id, current_user.id)


@router.put("/tasks/{task_id}", response_model=TaskResponse)
def edit_task(
    task_id: int,
    task: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return update_task(
        db,
        task_id,
        task.title,
        task.description,
        task.priority,
        current_user.id
    )


@router.patch("/tasks/{task_id}/toggle", response_model=TaskResponse)
def toggle(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return toggle_task(db, task_id, current_user.id)