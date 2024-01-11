from datetime import datetime
from typing import Optional

from fastapi_users import models
from pydantic import BaseModel


class DepartmentRead(BaseModel):
    id: models.ID  # type: ignore
    name: str
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True


class DepartmentCreate(BaseModel):
    name: str


class DepartmentUpdate(BaseModel):
    name: Optional[str] = None
