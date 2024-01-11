"""departement table

Revision ID: fff877520ca0
Revises: bcced5fa1688
Create Date: 2023-12-06 13:13:44.729240

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from backend.database import Base
import fastapi_users_db_sqlalchemy



# revision identifiers, used by Alembic.
revision: str = 'fff877520ca0'
down_revision: Union[str, None] = 'bcced5fa1688'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('front_desk', sa.Boolean(), nullable=True))
    op.add_column('users', sa.Column('director', sa.Boolean(), nullable=True))
    op.add_column('users', sa.Column('department_head', sa.Boolean(), nullable=True))
    op.add_column('users', sa.Column('officer', sa.Boolean(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'officer')
    op.drop_column('users', 'department_head')
    op.drop_column('users', 'director')
    op.drop_column('users', 'front_desk')
    # ### end Alembic commands ###
