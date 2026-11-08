import enum
from datetime import datetime, date

from sqlalchemy import (
    Column, Integer, String, Float, Date, DateTime, ForeignKey, Enum, Text
)
from sqlalchemy.orm import relationship

from .database import Base


class RoleEnum(str, enum.Enum):
    student = "student"
    admin = "admin"
    higher_admin = "higher_admin"


class MealTypeEnum(str, enum.Enum):
    breakfast = "breakfast"
    lunch = "lunch"
    snacks = "snacks"
    dinner = "dinner"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(RoleEnum), nullable=False, default=RoleEnum.student)
    created_at = Column(DateTime, default=datetime.utcnow)

    feedbacks = relationship("Feedback", back_populates="student")


class MenuItem(Base):
    __tablename__ = "menu_items"

    id = Column(Integer, primary_key=True, index=True)
    menu_date = Column(Date, default=date.today, nullable=False)
    meal_type = Column(Enum(MealTypeEnum), nullable=False)
    item_name = Column(String, nullable=False)
    created_by = Column(Integer, ForeignKey("users.id"))

    feedbacks = relationship("Feedback", back_populates="menu_item")
    wastages = relationship("Wastage", back_populates="menu_item")


class Feedback(Base):
    __tablename__ = "feedback"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    menu_item_id = Column(Integer, ForeignKey("menu_items.id"), nullable=False)
    rating = Column(Integer, nullable=False)  # 1-5
    comment = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    student = relationship("User", back_populates="feedbacks")
    menu_item = relationship("MenuItem", back_populates="feedbacks")


class Wastage(Base):
    __tablename__ = "wastage"

    id = Column(Integer, primary_key=True, index=True)
    menu_item_id = Column(Integer, ForeignKey("menu_items.id"), nullable=False)
    wastage_date = Column(Date, default=date.today, nullable=False)
    weight_kg = Column(Float, nullable=False)
    entered_by = Column(Integer, ForeignKey("users.id"), nullable=False)

    menu_item = relationship("MenuItem", back_populates="wastages")


class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    meal_type = Column(Enum(MealTypeEnum), nullable=False)
    attendance_date = Column(Date, default=date.today, nullable=False)
    marked_at = Column(DateTime, default=datetime.utcnow)
