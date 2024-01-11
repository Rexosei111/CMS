from fastapi import HTTPException
from fastapi_pagination.ext.sqlalchemy import paginate
from models.departments import Department
from models.users import User
from schemas.departments import DepartmentCreate
from sqlalchemy import delete, select, update
from sqlalchemy.exc import MultipleResultsFound, NoResultFound, SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession


async def get_all_departments(session: AsyncSession, query):
    try:
        return await paginate(
            session, select(Department).where(Department.name.ilike(f"%{query}%"))
        )
    except SQLAlchemyError:
        raise HTTPException(500, detail="Something went wrong!")


async def get_all_department_officers(session: AsyncSession, department_id: str, query):
    try:
        return await paginate(
            session,
            select(User)
            .where(User.department_id == department_id)
            .where(User.first_name.ilike(f"%{query}%"))
            .where(User.last_name.ilike(f"%{query}%")),
        )

    except SQLAlchemyError:
        raise HTTPException(500, detail="Something went wrong!")


async def get_department_by_id(session: AsyncSession, department_id: str):
    result = await session.execute(
        select(Department).where(Department.id == department_id)
    )
    try:
        department = result.scalar_one()
        return department
    except NoResultFound:
        raise HTTPException(404, detail="Department not found")
    except MultipleResultsFound:
        raise HTTPException(500, detail="Something went wrong!")


async def create_new_department(session: AsyncSession, data: DepartmentCreate):
    new_department = Department(**data.model_dump())
    session.add(new_department)
    await session.commit()
    return new_department


async def update_a_department(
    session: AsyncSession, department_id: str, data: DepartmentCreate
):
    await session.execute(
        update(Department)
        .where(Department.id == department_id)
        .values(**data.model_dump(exclude_none=True))
    )
    department = await get_department_by_id(
        session=session, department_id=department_id
    )

    return department


async def delete_a_department(session: AsyncSession, department_id: str):
    try:
        await session.execute(delete(Department).where(Department.id == department_id))
        return True
    except SQLAlchemyError:
        raise HTTPException(500, detail="Unable to delete department!")
