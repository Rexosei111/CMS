import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_pagination import add_pagination
from routers import departments, users
from version import __version__

app = FastAPI(title="Client Management System API", version=__version__)


app.include_router(users.auth_router)
app.include_router(users.users_router)
app.include_router(departments.department_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


add_pagination(app)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True, log_level="debug")
