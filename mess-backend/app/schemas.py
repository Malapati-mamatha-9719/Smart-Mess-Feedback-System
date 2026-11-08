from datetime import date, datetime
from typing import Optional, List

from pydantic import BaseModel, EmailStr, Field

from .models import RoleEnum, MealTypeEnum


# ---------- Auth / Users ----------
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: RoleEnum = RoleEnum.student


class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: RoleEnum

    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: RoleEnum


# ---------- Menu ----------
class MenuItemCreate(BaseModel):
    menu_date: Optional[date] = None
    meal_type: MealTypeEnum
    item_name: str


class MenuItemOut(BaseModel):
    id: int
    menu_date: date
    meal_type: MealTypeEnum
    item_name: str

    class Config:
        from_attributes = True


# ---------- Feedback ----------
class FeedbackCreate(BaseModel):
    menu_item_id: int
    rating: int = Field(ge=1, le=5)
    comment: Optional[str] = None


class FeedbackOut(BaseModel):
    id: int
    student_id: int
    menu_item_id: int
    rating: int
    comment: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class FeedbackWithDish(BaseModel):
    id: int
    item_name: str
    meal_type: MealTypeEnum
    rating: int
    comment: Optional[str]
    created_at: datetime


# ---------- Wastage ----------
class WastageCreate(BaseModel):
    menu_item_id: int
    wastage_date: Optional[date] = None
    weight_kg: float = Field(gt=0)


class WastageOut(BaseModel):
    id: int
    menu_item_id: int
    wastage_date: date
    weight_kg: float
    entered_by: int

    class Config:
        from_attributes = True


# ---------- Analytics ----------
class SatisfactionSummary(BaseModel):
    menu_item_id: int
    item_name: str
    meal_type: MealTypeEnum
    average_rating: float
    total_feedback_count: int


class WastageSummary(BaseModel):
    menu_item_id: int
    item_name: str
    meal_type: MealTypeEnum
    total_weight_kg: float


class MonthlyDishReport(BaseModel):
    item_name: str
    times_served: int
    average_satisfaction_pct: float
    total_feedback_count: int
    total_wastage_kg: float
    recommendation: str


class FeedbackParticipation(BaseModel):
    meal_type: MealTypeEnum
    unique_students: int


# ---------- Attendance ----------
class AttendanceCreate(BaseModel):
    meal_type: MealTypeEnum


class AttendanceOut(BaseModel):
    id: int
    meal_type: MealTypeEnum
    attendance_date: date

    class Config:
        from_attributes = True


class AttendanceStats(BaseModel):
    meals_attended: int
    total_meals_available: int
    attendance_rate_pct: float


class AttendanceHeadcount(BaseModel):
    meal_type: MealTypeEnum
    count: int
