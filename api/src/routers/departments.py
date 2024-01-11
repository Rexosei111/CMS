from typing import Annotated

from backend.database import get_async_session
from fastapi import APIRouter, Depends
from fastapi_pagination import Page
from models.users import User
from schemas.departments import DepartmentCreate, DepartmentRead, DepartmentUpdate
from schemas.users import UserRead
from services.departments import (
    create_new_department,
    delete_a_department,
    get_all_department_officers,
    get_all_departments,
    get_department_by_id,
    update_a_department,
)
from sqlalchemy.ext.asyncio import AsyncSession

from routers.users import GetCurrentUser

get_department_user = GetCurrentUser(is_active=True, officer=True)
get_department_head_user = GetCurrentUser(is_active=True, department_head=True)
get_superuser = GetCurrentUser(is_active=True, is_superuser=True)


department_router = APIRouter(prefix="/departments", tags=["Departments"])


@department_router.get("/")
async def get_departments(
    *,
    query: Annotated[str | None, "Search query to check with department names"] = "",
    user: Annotated[User, Depends(get_department_user)],
    session: AsyncSession = Depends(get_async_session)
) -> Page[DepartmentRead]:
    return await get_all_departments(session=session, query=query)


@department_router.get("/{department_id}")
async def get_department(
    *,
    department_id: Annotated[str, "Unique uuid for the department to be retrieved"],
    user: Annotated[User, Depends(get_department_user)],
    session: AsyncSession = Depends(get_async_session)
) -> DepartmentRead:
    return await get_department_by_id(session=session, department_id=department_id)


@department_router.get(
    "/{department_id}/officers", response_model_exclude={"department"}
)
async def get_department_officers(
    *,
    query: Annotated[
        str | None, "Search query to check with department officers names"
    ] = "",
    user: Annotated[User, Depends(get_department_head_user)],
    department_id: Annotated[str, "Unique Identify for the department"],
    session: AsyncSession = Depends(get_async_session)
) -> Page[UserRead]:
    return await get_all_department_officers(
        session=session, department_id=department_id, query=query
    )


@department_router.post("/")
async def create_department(
    *,
    user: Annotated[User, Depends(get_superuser)],
    data: DepartmentCreate,
    session: AsyncSession = Depends(get_async_session)
) -> DepartmentRead:
    return await create_new_department(session=session, data=data)


@department_router.patch("/{department_id}")
async def update_department(
    *,
    user: Annotated[User, Depends(get_department_head_user)],
    department_id: Annotated[str, "Unique uuid for the department to update"],
    data: DepartmentUpdate,
    session: AsyncSession = Depends(get_async_session)
) -> DepartmentRead:
    return await update_a_department(
        session=session, department_id=department_id, data=data
    )


@department_router.delete("/{department_id}")
async def delete_department(
    *,
    department_id: Annotated[str, "Unique uuid for the department to be deleted"],
    user: Annotated[User, Depends(get_superuser)],
    session: AsyncSession = Depends(get_async_session)
) -> bool:
    return await delete_a_department(session=session, department_id=department_id)
