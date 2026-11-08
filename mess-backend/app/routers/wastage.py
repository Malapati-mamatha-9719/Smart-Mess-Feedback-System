from datetime import date
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/wastage", tags=["wastage"])


@router.post("/", response_model=schemas.WastageOut, status_code=201)
def add_wastage(
    wastage_in: schemas.WastageCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.require_roles([models.RoleEnum.admin])),
):
    menu_item = db.query(models.MenuItem).filter(models.MenuItem.id == wastage_in.menu_item_id).first()
    if not menu_item:
        raise HTTPException(status_code=404, detail="Menu item not found")

    wastage = models.Wastage(
        menu_item_id=wastage_in.menu_item_id,
        wastage_date=wastage_in.wastage_date or date.today(),
        weight_kg=wastage_in.weight_kg,
        entered_by=current_user.id,
    )
    db.add(wastage)
    db.commit()
    db.refresh(wastage)
    return wastage


@router.get("/today", response_model=List[schemas.WastageOut])
def wastage_today(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(
        auth.require_roles([models.RoleEnum.admin, models.RoleEnum.higher_admin])
    ),
):
    return db.query(models.Wastage).filter(models.Wastage.wastage_date == date.today()).all()
