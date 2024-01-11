from typing import Optional

from fastapi_users import models
from fastapi_users.schemas import CreateUpdateDictModel
from pydantic import BaseModel, EmailStr, Field

from schemas.departments import DepartmentRead


class UserRead(BaseModel):
    id: models.ID  # type: ignore
    email: EmailStr
    phone_number: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    other_names: Optional[str] = Field(default=None)
    front_desk: Optional[bool] = False
    director: Optional[bool] = False
    department_head: Optional[bool] = False
    department: Optional[DepartmentRead] = None
    officer: Optional[bool] = False

    class Config:
        from_attributes = True


class UserCreate(CreateUpdateDictModel):
    email: EmailStr
    password: str
    phone_number: Optional[str] = Field(default=None)
    first_name: Optional[str] = Field(default=None)
    last_name: Optional[str] = Field(default=None)
    other_names: Optional[str] = Field(default=None)
    front_desk: Optional[bool] = False
    director: Optional[bool] = False
    department_head: Optional[bool] = False
    department_id: Optional[str] = None
    officer: Optional[bool] = False


class UserUpdate(CreateUpdateDictModel):
    password: Optional[str] = None
    email: Optional[EmailStr] = None
    phone_number: Optional[str] = None
    first_name: Optional[str] = Field(default=None)
    last_name: Optional[str] = Field(default=None)
    other_names: Optional[str] = Field(default=None)
    front_desk: Optional[bool] = False
    director: Optional[bool] = False
    department_head: Optional[bool] = False
    department_id: Optional[str] = None
    officer: Optional[bool] = False


class UserCredentialsRead(BaseModel):
    email: str
    password: str
