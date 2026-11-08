"""
Seeds the database with sample accounts so you can log in and test
immediately, without ever calling a register endpoint.

Run once after setting up the project:
    python seed_data.py

Then log in via POST /auth/login using any of the credentials printed
below. Re-running this script is safe — it skips users that already exist.
"""

from app.database import SessionLocal, Base, engine
from app import models, auth

Base.metadata.create_all(bind=engine)

SAMPLE_USERS = [
    {"username": "higher_admin1", "email": "higheradmin@college.edu", "password": "admin123", "role": "higher_admin"},
    {"username": "admin1", "email": "admin@college.edu", "password": "admin123", "role": "admin"},
    {"username": "student1", "email": "student1@college.edu", "password": "student@123", "role": "student"},
    {"username": "student2", "email": "student2@college.edu", "password": "student123", "role": "student"},
]


def main():
    db = SessionLocal()
    try:
        for u in SAMPLE_USERS:
            existing = db.query(models.User).filter(
                (models.User.username == u["username"]) | (models.User.email == u["email"])
            ).first()
            if existing:
                print(f"Skipping {u['email']} — already exists")
                continue

            user = models.User(
                username=u["username"],
                email=u["email"],
                hashed_password=auth.get_password_hash(u["password"]),
                role=models.RoleEnum(u["role"]),
            )
            db.add(user)
            print(f"Created {u['role']}: {u['email']}")

        db.commit()
        print("\nDone. Sample login credentials:")
        for u in SAMPLE_USERS:
            print(f"  {u['role']:<13} email={u['email']:<26} password={u['password']}")
    finally:
        db.close()


if __name__ == "__main__":
    main()
