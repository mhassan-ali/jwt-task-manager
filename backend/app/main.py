from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models import user_model
from app.routes.task_routes import router as task_router
from app.db.database import engine, Base
from app.models import task_model 
from app.routes.auth_routes import router as auth_router


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

app.include_router(task_router)
app.include_router(auth_router)