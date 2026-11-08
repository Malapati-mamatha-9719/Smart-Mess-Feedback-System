# Smart Mess Feedback System — Backend

FastAPI backend for the mess feedback system, with three roles:
- **student** — views today's menu, submits feedback
- **admin** — enters the daily menu and food wastage (by weight)
- **higher_admin** — views satisfaction and wastage analytics

## Setup

```bash
cd mess-backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Optional: set a real secret key for JWT signing (defaults to a dev value otherwise):
```bash
export SECRET_KEY="your-random-secret-string"   # Windows: set SECRET_KEY=...
```

## Run

```bash
uvicorn app.main:app --reload
```

API will be live at `http://127.0.0.1:8000`.
Interactive docs (Swagger UI): `http://127.0.0.1:8000/docs`

## Auth flow

1. `POST /auth/register` — create a user with a role (`student`, `admin`, or `higher_admin`)
2. `POST /auth/login` — form-encoded `username` + `password`, returns a JWT `access_token`
3. Send `Authorization: Bearer <token>` on subsequent requests

## Endpoints

| Method | Path | Role | Purpose |
|---|---|---|---|
| POST | `/auth/register` | any | Register a new user |
| POST | `/auth/login` | any | Log in, get JWT |
| GET | `/auth/me` | any (logged in) | Get current user info |
| POST | `/menu/` | admin | Add a menu item for a date |
| GET | `/menu/today` | any (logged in) | Get today's menu |
| GET | `/menu/{menu_date}` | any (logged in) | Get menu for a specific date |
| POST | `/feedback/` | student | Submit feedback for a menu item |
| GET | `/feedback/mine` | student | View own feedback history |
| GET | `/feedback/menu-item/{id}` | admin, higher_admin | View all feedback for a menu item |
| POST | `/wastage/` | admin | Log food wastage weight for a menu item |
| GET | `/wastage/today` | admin, higher_admin | View today's wastage entries |
| GET | `/analytics/satisfaction` | admin, higher_admin | Average rating per menu item (satisfaction rate) |
| GET | `/analytics/wastage` | admin, higher_admin | Total wastage weight per menu item |

## Notes

- Uses SQLite (`mess_feedback.db`) by default — zero setup for local dev. Swap the URL
  in `app/database.py` for Postgres/MySQL when you deploy.
- CORS is wide open (`allow_origins=["*"]`) for local dev with your Vite frontend —
  restrict this to your actual frontend domain before deploying.
- `average_rating` in `/analytics/satisfaction` is what you described as the
  "satisfaction rate" shown to admin/higher admin.
