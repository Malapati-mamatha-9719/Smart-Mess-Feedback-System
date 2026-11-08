from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SQLite for local development. Swap the URL for Postgres/MySQL in production,
# e.g. "postgresql://user:password@localhost/mess_feedback"
SQLALCHEMY_DATABASE_URL = "sqlite:///./mess_feedback.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
