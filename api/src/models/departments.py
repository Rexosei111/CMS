import uuid
from datetime import datetime

from backend.database import Base
from fastapi_users_db_sqlalchemy.generics import GUID
from sqlalchemy import Column, DateTime, String
from sqlalchemy.orm import relationship


class Department(Base):
    __tablename__ = "departments"
    id = Column(GUID, primary_key=True, default=uuid.uuid4)
    name = Column(String(500), nullable=False, index=True)

    officers = relationship("User", back_populates="department", lazy="selectin")
    createdAt = Column(DateTime, nullable=True, default=datetime.utcnow)
    updatedAt = Column(
        DateTime, nullable=True, default=datetime.utcnow, onupdate=datetime.utcnow
    )
