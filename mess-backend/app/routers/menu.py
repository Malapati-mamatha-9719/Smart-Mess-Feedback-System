from datetime import date
from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/menu", tags=["menu"])


@router.post("/", response_model=schemas.MenuItemOut, status_code=201)
def add_menu_item(
    item_in: schemas.MenuItemCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.require_roles([models.RoleEnum.admin])),
):
    item = models.MenuItem(
        menu_date=item_in.menu_date or date.today(),
        meal_type=item_in.meal_type,
        item_name=item_in.item_name,
        created_by=current_user.id,
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.get("/today", response_model=List[schemas.MenuItemOut])
def get_today_menu(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    return db.query(models.MenuItem).filter(models.MenuItem.menu_date == date.today()).all()


@router.get("/{menu_date}", response_model=List[schemas.MenuItemOut])
def get_menu_by_date(
    menu_date: date,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    return db.query(models.MenuItem).filter(models.MenuItem.menu_date == menu_date).all()
