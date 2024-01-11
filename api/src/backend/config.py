import logging
from functools import lru_cache
from logging import Logger
from typing import Union

from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()


@lru_cache
def get_logger(name: Union[str, None] = "app_logger") -> Logger:
    logger = logging.getLogger(name if name else __name__)
    handler = logging.StreamHandler()
    handler.setLevel(logging.DEBUG)
    formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    return logger


class Settings(BaseSettings):
    authjwt_secret_key: str
    jwt_secret: str
    jwt_expire_time: int
    reset_password_token_secret: str
    verification_token_secret: str
    db_url: str

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings():
    return Settings()
