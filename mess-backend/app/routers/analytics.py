from datetime import date
from typing import List, Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy import func
from sqlalchemy.orm import Session

from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("/satisfaction", response_model=List[schemas.SatisfactionSummary])
def satisfaction_summary(
    on_date: Optional[date] = Query(default=None, description="Defaults to today"),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(
        auth.require_roles([models.RoleEnum.admin, models.RoleEnum.higher_admin])
    ),
):
    target_date = on_date or date.today()

    rows = (
        db.query(
            models.MenuItem.id,
            models.MenuItem.item_name,
            models.MenuItem.meal_type,
            func.avg(models.Feedback.rating).label("average_rating"),
            func.count(models.Feedback.id).label("total_feedback_count"),
        )
        .join(models.Feedback, models.Feedback.menu_item_id == models.MenuItem.id)
        .filter(models.MenuItem.menu_date == target_date)
        .group_by(models.MenuItem.id)
        .all()
    )

    return [
        schemas.SatisfactionSummary(
            menu_item_id=r.id,
            item_name=r.item_name,
            meal_type=r.meal_type,
            average_rating=round(r.average_rating, 2),
            total_feedback_count=r.total_feedback_count,
        )
        for r in rows
    ]


@router.get("/wastage", response_model=List[schemas.WastageSummary])
def wastage_summary(
    on_date: Optional[date] = Query(default=None, description="Defaults to today"),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(
        auth.require_roles([models.RoleEnum.admin, models.RoleEnum.higher_admin])
    ),
):
    target_date = on_date or date.today()

    rows = (
        db.query(
            models.MenuItem.id,
            models.MenuItem.item_name,
            models.MenuItem.meal_type,
            func.sum(models.Wastage.weight_kg).label("total_weight_kg"),
        )
        .join(models.Wastage, models.Wastage.menu_item_id == models.MenuItem.id)
        .filter(models.Wastage.wastage_date == target_date)
        .group_by(models.MenuItem.id)
        .all()
    )

    return [
        schemas.WastageSummary(
            menu_item_id=r.id,
            item_name=r.item_name,
            meal_type=r.meal_type,
            total_weight_kg=round(r.total_weight_kg, 2),
        )
        for r in rows
    ]


@router.get("/participation", response_model=List[schemas.FeedbackParticipation])
def feedback_participation(
    on_date: Optional[date] = Query(default=None, description="Defaults to today"),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(
        auth.require_roles([models.RoleEnum.admin, models.RoleEnum.higher_admin])
    ),
):
    """Unique students who gave at least one feedback per meal — not total feedback rows,
    since one student can rate multiple dishes within the same meal."""
    target_date = on_date or date.today()

    rows = (
        db.query(
            models.MenuItem.meal_type,
            func.count(func.distinct(models.Feedback.student_id)),
        )
        .join(models.Feedback, models.Feedback.menu_item_id == models.MenuItem.id)
        .filter(models.MenuItem.menu_date == target_date)
        .group_by(models.MenuItem.meal_type)
        .all()
    )

    return [schemas.FeedbackParticipation(meal_type=m, unique_students=c) for m, c in rows]


@router.get("/monthly-report", response_model=List[schemas.MonthlyDishReport])
def monthly_report(
    start_date: Optional[date] = Query(default=None, description="Defaults to the 1st of the current month"),
    end_date: Optional[date] = Query(default=None, description="Defaults to today"),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(
        auth.require_roles([models.RoleEnum.admin, models.RoleEnum.higher_admin])
    ),
):
    today = date.today()
    range_start = start_date or today.replace(day=1)
    range_end = end_date or today

    # Same dish name can appear as separate MenuItem rows on different days,
    # so aggregate by item_name across the whole date range.
    satisfaction_rows = (
        db.query(
            models.MenuItem.item_name,
            func.count(func.distinct(models.MenuItem.id)).label("times_served"),
            func.avg(models.Feedback.rating).label("average_rating"),
            func.count(models.Feedback.id).label("total_feedback_count"),
        )
        .join(models.Feedback, models.Feedback.menu_item_id == models.MenuItem.id)
        .filter(models.MenuItem.menu_date.between(range_start, range_end))
        .group_by(models.MenuItem.item_name)
        .all()
    )

    wastage_by_name = dict(
        db.query(
            models.MenuItem.item_name,
            func.sum(models.Wastage.weight_kg),
        )
        .join(models.Wastage, models.Wastage.menu_item_id == models.MenuItem.id)
        .filter(models.MenuItem.menu_date.between(range_start, range_end))
        .group_by(models.MenuItem.item_name)
        .all()
    )

    report = []
    for r in satisfaction_rows:
        satisfaction_pct = round((r.average_rating / 5) * 100, 1)

        if satisfaction_pct < 50:
            recommendation = "Consider removing — consistently low satisfaction"
        elif satisfaction_pct < 65:
            recommendation = "Monitor closely"
        else:
            recommendation = "Keep on menu"

        report.append(
            schemas.MonthlyDishReport(
                item_name=r.item_name,
                times_served=r.times_served,
                average_satisfaction_pct=satisfaction_pct,
                total_feedback_count=r.total_feedback_count,
                total_wastage_kg=round(wastage_by_name.get(r.item_name, 0) or 0, 2),
                recommendation=recommendation,
            )
        )

    # Worst-performing dishes first, so problem dishes are immediately visible
    report.sort(key=lambda d: d.average_satisfaction_pct)
    return report
