from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.airports import router as airports_router
from app.api.health import router as health_router
from app.api.meta import router as meta_router
from app.api.routes import router as routes_router


def create_app() -> FastAPI:
    """Application factory for the Flight Price Intelligence backend."""
    app = FastAPI(
        title="Flight Price Intelligence API",
        description="MVP analytics API for route intelligence exploration and context.",
        version="0.2.0",
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://localhost:3000",
            "http://127.0.0.1:3000",
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(health_router)
    app.include_router(airports_router)
    app.include_router(routes_router)
    app.include_router(meta_router)
    return app


app = create_app()
