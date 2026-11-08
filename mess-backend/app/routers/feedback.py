from datetime import date
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/feedback", tags=["feedback"])


@router.post("/", response_model=schemas.FeedbackOut, status_code=201)
def submit_feedback(
    feedback_in: schemas.FeedbackCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.require_roles([models.RoleEnum.student])),
):
    menu_item = db.query(models.MenuItem).filter(models.MenuItem.id == feedback_in.menu_item_id).first()
    if not menu_item:
        raise HTTPException(status_code=404, detail="Menu item not found")

    existing = (
        db.query(models.Feedback)
        .filter(
            models.Feedback.student_id == current_user.id,
            models.Feedback.menu_item_id == feedback_in.menu_item_id,
        )
        .first()
    )
    if existing:
        raise HTTPException(
            status_code=400,
            detail="You've already submitted feedback for this dish today.",
        )

    feedback = models.Feedback(
        student_id=current_user.id,
        menu_item_id=feedback_in.menu_item_id,
        rating=feedback_in.rating,
        comment=feedback_in.comment,
    )
    db.add(feedback)
    db.commit()
    db.refresh(feedback)
    return feedback


@router.get("/mine", response_model=List[schemas.FeedbackOut])
def my_feedback(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.require_roles([models.RoleEnum.student])),
):
    return db.query(models.Feedback).filter(models.Feedback.student_id == current_user.id).all()


@router.get("/menu-item/{menu_item_id}", response_model=List[schemas.FeedbackOut])
def feedback_for_menu_item(
    menu_item_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(
        auth.require_roles([models.RoleEnum.admin, models.RoleEnum.higher_admin])
    ),
):
    return db.query(models.Feedback).filter(models.Feedback.menu_item_id == menu_item_id).all()


@router.get("/today", response_model=List[schemas.FeedbackWithDish])
def feedback_today(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(
        auth.require_roles([models.RoleEnum.admin, models.RoleEnum.higher_admin])
    ),
):
    rows = (
        db.query(
            models.Feedback.id,
            models.MenuItem.item_name,
            models.MenuItem.meal_type,
            models.Feedback.rating,
            models.Feedback.comment,
            models.Feedback.created_at,
        )
        .join(models.MenuItem, models.Feedback.menu_item_id == models.MenuItem.id)
        .filter(models.MenuItem.menu_date == date.today())
        .order_by(models.Feedback.created_at.desc())
        .all()
    )

    return [
        schemas.FeedbackWithDish(
            id=r.id,
            item_name=r.item_name,
            meal_type=r.meal_type,
            rating=r.rating,
            comment=r.comment,
            created_at=r.created_at,
        )
        for r in rows
    ]
