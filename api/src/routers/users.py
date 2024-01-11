from typing import Any, Dict, Optional

from backend.config import get_settings
from fastapi import APIRouter, Depends, HTTPException, status
from models.users import User
from schemas.users import UserCreate, UserRead, UserUpdate
from services.users import auth_backend, fastapi_users

settings = get_settings()

auth_router = APIRouter(tags=["Auth"], prefix="/auth")
users_router = APIRouter(tags=["Users"], prefix="/users")

auth_router.include_router(fastapi_users.get_auth_router(auth_backend))
auth_router.include_router(fastapi_users.get_verify_router(UserRead))
# reset_password_router = fastapi_users.get_reset_password_router()
users_router.include_router(fastapi_users.get_users_router(UserRead, UserUpdate))
users_router.include_router(fastapi_users.get_register_router(UserRead, UserCreate))
users_router.include_router(fastapi_users.get_reset_password_router())

users_router.routes = [route for route in users_router.routes if route.path != "/{id}"]

get_current_active_user = fastapi_users.current_user()


class GetCurrentUser:
    def __init__(self, **kwargs) -> None:
        for key, value in kwargs.items():
            setattr(self, key, value)

    def __call__(self, user: User | None = Depends(get_current_active_user)) -> Any:
        if user is not None:
            if user.is_superuser:
                return user
            match = all(
                getattr(user, key) == value for key, value in self.__dict__.items()
            )
            if not match:
                raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
            return user
