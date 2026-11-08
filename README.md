# Smart Mess Feedback System

An intelligent, full-stack mess management and feedback analytics platform designed to bridge communication between students, mess administrators, and higher authorities. The system enables real-time feedback collection, food wastage tracking, meal attendance marking, and comprehensive analytics to optimize hostel dining operations and reduce food waste.

---

## 🚀 Features

### 👨‍🎓 Student Portal
- **Daily Menu View:** View today's meal schedule across Breakfast, Lunch, Snacks, and Dinner.
- **Meal Feedback Submission:** Submit ratings and detailed reviews for individual dishes.
- **Attendance Marker:** Mark meal attendance to help mess staff forecast preparation quantities.
- **Activity History:** Track past feedback and meal participation history.

### 👨‍🍳 Mess Admin Portal
- **Menu Management:** Create and update daily meal menus with dietary indicators and meal types.
- **Wastage Logging:** Record leftover food wastage (by weight in kg) for each meal session.
- **Daily Overview:** Access real-time counts and summaries of daily feedback and wastage metrics.

### 📊 Higher Admin / Management Portal
- **Analytics Dashboard:** Visual representation of satisfaction rates and wastage trends over time.
- **Dish Scorecard:** Ranked performance analysis of menu items by satisfaction score.
- **Correlation Insights:** Correlate student satisfaction ratings against food wastage data.
- **Monthly Reports:** Exportable summary reports for administrative reviews and decision-making.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 + Vite
- **Styling:** TailwindCSS
- **Routing:** React Router v7
- **Icons & UI:** Lucide React, Framer Motion
- **Data Visualization:** Chart.js, React-ChartJS-2

### Backend
- **Framework:** FastAPI (Python 3.10+)
- **Authentication:** OAuth2 with JWT (JSON Web Tokens) & PassLib (bcrypt)
- **Database:** SQLite with SQLAlchemy ORM
- **Data Validation:** Pydantic models
- **Server:** Uvicorn ASGI server

---

## 📁 Project Structure

```text
├── mess-backend/             # FastAPI Backend Service
│   ├── app/
│   │   ├── routers/          # API route handlers (auth, menu, feedback, wastage, etc.)
│   │   ├── auth.py           # JWT security & password hashing
│   │   ├── database.py       # SQLAlchemy engine & session setup
│   │   ├── main.py           # FastAPI app entry point & CORS configuration
│   │   ├── models.py         # SQLAlchemy database models
│   │   └── schemas.py        # Pydantic request/response schemas
│   ├── requirements.txt      # Python dependencies
│   ├── seed_data.py          # Sample data generator
│   └── README.md             # Backend documentation
├── public/                   # Static public assets
├── src/                      # React Frontend Source
│   ├── components/
│   │   ├── admin/            # Mess Admin components (MenuForm, WastageForm, Stats)
│   │   ├── analytics/        # Higher Admin analytics & scorecard charts
│   │   ├── common/           # Reusable UI components (Button, Card, Modal, Loader)
│   │   ├── landing/          # Public landing page sections
│   │   ├── layout/           # Navbar, Sidebar, Footer, Container
│   │   ├── login/            # Authentication forms & role selection
│   │   └── student/          # Student portal components (Feedback, Menu, Attendance)
│   ├── pages/                # Route pages (Home, RoleLogin, Dashboards)
│   ├── mockData/             # Mock data fixtures
│   ├── App.jsx               # Application routes and main shell
│   └── main.jsx              # React app entry point
├── package.json              # Frontend npm dependencies and scripts
└── vite.config.js            # Vite configuration
```

---

## ⚡ Getting Started

### Prerequisites
- **Node.js:** v18+ and `npm`
- **Python:** v3.10+ and `pip`

---

### 1. Backend Setup

```bash
# Navigate to the backend directory
cd mess-backend

# Create and activate virtual environment
python -m venv venv

# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# (Optional) Seed the database with sample data
python seed_data.py

# Start the FastAPI server
uvicorn app.main:app --reload
```

The backend API will run at `http://127.0.0.1:8000`.
- **Swagger API Documentation:** `http://127.0.0.1:8000/docs`
- **ReDoc:** `http://127.0.0.1:8000/redoc`

---

### 2. Frontend Setup

In a new terminal window:

```bash
# Navigate to the project root directory
npm install

# Start the Vite development server
npm run dev
```

The frontend will run at `http://localhost:5173`.

---

## 🔐 Default User Roles

| Role | Access Level | Description |
|---|---|---|
| `student` | Student Dashboard | Browse menu, submit dish ratings, mark meal attendance |
| `admin` | Mess Admin Dashboard | Manage menu items, record daily food wastage |
| `higher_admin` | Higher Admin Dashboard | Review institution-wide satisfaction trends & reports |

---

## 📄 License

This project is licensed under the MIT License.
