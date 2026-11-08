from datetime import date
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session

from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/attendance", tags=["attendance"])


@router.post("/", response_model=schemas.AttendanceOut, status_code=201)
def mark_attendance(
    attendance_in: schemas.AttendanceCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.require_roles([models.RoleEnum.student])),
):
    today = date.today()

    # Only allow marking attendance for a meal that's actually being served today
    meal_offered = (
        db.query(models.MenuItem)
        .filter(
            models.MenuItem.menu_date == today,
            models.MenuItem.meal_type == attendance_in.meal_type,
        )
        .first()
    )
    if not meal_offered:
        raise HTTPException(status_code=404, detail="This meal isn't on today's menu yet.")

    existing = (
        db.query(models.Attendance)
        .filter(
            models.Attendance.student_id == current_user.id,
            models.Attendance.meal_type == attendance_in.meal_type,
            models.Attendance.attendance_date == today,
        )
        .first()
    )
    if existing:
        raise HTTPException(status_code=400, detail="You've already marked attendance for this meal today.")

    attendance = models.Attendance(
        student_id=current_user.id,
        meal_type=attendance_in.meal_type,
        attendance_date=today,
    )
    db.add(attendance)
    db.commit()
    db.refresh(attendance)
    return attendance


@router.get("/mine/today", response_model=List[schemas.AttendanceOut])
def my_attendance_today(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.require_roles([models.RoleEnum.student])),
):
    return (
        db.query(models.Attendance)
        .filter(
            models.Attendance.student_id == current_user.id,
            models.Attendance.attendance_date == date.today(),
        )
        .all()
    )


@router.get("/mine/stats", response_model=schemas.AttendanceStats)
def my_attendance_stats(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.require_roles([models.RoleEnum.student])),
):
    today = date.today()
    month_start = today.replace(day=1)

    meals_attended = (
        db.query(func.count(models.Attendance.id))
        .filter(
            models.Attendance.student_id == current_user.id,
            models.Attendance.attendance_date.between(month_start, today),
        )
        .scalar()
    )

    # Every distinct (date, meal_type) that had a menu this month counts as one available meal slot
    distinct_meal_slots = (
        db.query(models.MenuItem.menu_date, models.MenuItem.meal_type)
        .filter(models.MenuItem.menu_date.between(month_start, today))
        .distinct()
        .all()
    )
    total_meals_available = len(distinct_meal_slots)

    rate = round((meals_attended / total_meals_available) * 100, 1) if total_meals_available else 0.0

    return schemas.AttendanceStats(
        meals_attended=meals_attended,
        total_meals_available=total_meals_available,
        attendance_rate_pct=rate,
    )


@router.get("/today", response_model=List[schemas.AttendanceHeadcount])
def attendance_today(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(
        auth.require_roles([models.RoleEnum.admin, models.RoleEnum.higher_admin])
    ),
):
    rows = (
        db.query(models.Attendance.meal_type, func.count(models.Attendance.id))
        .filter(models.Attendance.attendance_date == date.today())
        .group_by(models.Attendance.meal_type)
        .all()
    )
    return [schemas.AttendanceHeadcount(meal_type=m, count=c) for m, c in rows]
