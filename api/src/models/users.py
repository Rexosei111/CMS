import enum
import uuid
from datetime import datetime
from typing import Optional, Union

from backend.config import get_settings
from backend.database import Base, get_async_session
from fastapi import Depends, Request
from fastapi_users import BaseUserManager, InvalidPasswordException, UUIDIDMixin
from fastapi_users_db_sqlalchemy import SQLAlchemyUserDatabase
from fastapi_users_db_sqlalchemy.generics import GUID
from schemas.users import UserCreate
from sqlalchemy import Boolean, Column, DateTime, ForeignKey, String
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import relationship

settings = get_settings()


class UserTypeEnum(str, enum.Enum):
    front_dest = "Front desk"
    director = "Director"
    head = "Department head"


class User(Base):
    __tablename__ = "users"
    id = Column(GUID, primary_key=True, default=uuid.uuid4)
    email = Column(String(length=320), unique=True, index=True, nullable=False)
    hashed_password = Column(String(length=1024), nullable=False)
    phone_number = Column(String(length=15))
    first_name = Column(String(length=30))
    last_name = Column(String(length=30))
    other_names = Column(String(length=30))
    is_active = Column(Boolean, default=True, nullable=False)
    is_superuser = Column(Boolean, default=False, nullable=False)
    is_verified = Column(Boolean, default=True, nullable=False)
    front_desk = Column(Boolean, default=False)
    director = Column(Boolean, default=False)
    department_head = Column(Boolean, default=False)
    officer = Column(Boolean, default=False)
    department_id = Column(GUID, ForeignKey("departments.id"))
    department = relationship("Department", back_populates="officers", lazy="selectin")
    createdAt = Column(DateTime, nullable=True, default=datetime.utcnow)
    updatedAt = Column(
        DateTime, nullable=True, default=datetime.utcnow, onupdate=datetime.utcnow
    )


async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User)  # type: ignore


class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):  # type: ignore
    reset_password_token_secret = settings.reset_password_token_secret
    verification_token_secret = settings.verification_token_secret

    async def on_after_register(
        self,
        user: User,
        request: Optional[Request] = None,
    ):
        print(f"User {user.email} has registered.")

    async def on_after_forgot_password(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        print(f"User {user.id} has forgot their password. Reset token: {token}")

    async def on_after_request_verify(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        print(f"Verification requested for user {user.id}. Verification token: {token}")

    async def validate_password(
        self,
        password: str,
        user: Union[UserCreate, User],
    ) -> None:
        if len(password) < 8:
            raise InvalidPasswordException(
                reason="Password should be at least 8 characters"
            )
        if user.email in password:
            raise InvalidPasswordException(reason="Password should not contain e-mail")


async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)
