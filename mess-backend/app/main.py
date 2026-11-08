from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routers import auth_router, menu, feedback, wastage, analytics, attendance

# Create tables on startup (fine for dev; use Alembic migrations in production)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Smart Mess Feedback System API",
    description="Backend for student feedback, admin menu/wastage entry, and higher-admin analytics",
    version="1.0.0",
)

# Allow the Vite dev server (and any frontend origin) to call this API.
# Tighten allow_origins to your deployed frontend URL in production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(menu.router)
app.include_router(feedback.router)
app.include_router(wastage.router)
app.include_router(analytics.router)
app.include_router(attendance.router)


@app.get("/")
def root():
    return {"message": "Smart Mess Feedback System API is running"}
