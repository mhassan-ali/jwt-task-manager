from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.task_model import TaskModel


def get_all_tasks(db: Session, user_id: int):
    return db.query(TaskModel).filter(
        TaskModel.user_id == user_id
    ).all()


def create_task(
    db: Session,
    title: str,
    description: str,
    priority: str,
    user_id: int
):
    if not title.strip():
        raise HTTPException(
            status_code=400,
            detail="Task title cannot be empty"
        )

    new_task = TaskModel(
        title=title.strip(),
        description=description,
        priority=priority,
        user_id=user_id
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


def delete_task(db: Session, task_id: int, user_id: int):
    task = db.query(TaskModel).filter(
        TaskModel.id == task_id,
        TaskModel.user_id == user_id
    ).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()


def update_task(
    db: Session,
    task_id: int,
    title: str,
    description: str,
    priority: str,
    user_id: int
):
    task = db.query(TaskModel).filter(
        TaskModel.id == task_id,
        TaskModel.user_id == user_id
    ).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if not title.strip():
        raise HTTPException(status_code=400, detail="Task title cannot be empty")

    task.title = title.strip()
    task.description = description
    task.priority = priority

    db.commit()
    db.refresh(task)

    return task


def toggle_task(db: Session, task_id: int, user_id: int):
    task = db.query(TaskModel).filter(
        TaskModel.id == task_id,
        TaskModel.user_id == user_id
    ).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    task.completed = not task.completed

    db.commit()
    db.refresh(task)

    return task