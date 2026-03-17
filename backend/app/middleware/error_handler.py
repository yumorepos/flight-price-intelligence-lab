"""Global error handling middleware."""

import logging
import traceback

from fastapi import Request, status
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

logger = logging.getLogger(__name__)


class ErrorHandlerMiddleware(BaseHTTPMiddleware):
    """Middleware to handle all unhandled exceptions."""

    async def dispatch(self, request: Request, call_next):
        try:
            return await call_next(request)
        except Exception as exc:
            return await self.handle_exception(request, exc)

    async def handle_exception(self, request: Request, exc: Exception) -> JSONResponse:
        """Handle exception and return appropriate JSON response."""

        # Log the full exception with traceback
        logger.error(
            f"Unhandled exception: {exc}",
            extra={
                "path": request.url.path,
                "method": request.method,
                "client": request.client.host if request.client else "unknown",
                "traceback": traceback.format_exc(),
            },
        )

        # Determine status code and message
        if isinstance(exc, ValueError):
            status_code = status.HTTP_400_BAD_REQUEST
            detail = str(exc)
        elif isinstance(exc, PermissionError):
            status_code = status.HTTP_403_FORBIDDEN
            detail = "Permission denied"
        elif isinstance(exc, FileNotFoundError):
            status_code = status.HTTP_404_NOT_FOUND
            detail = "Resource not found"
        else:
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
            detail = "Internal server error"

        return JSONResponse(
            status_code=status_code,
            content={
                "detail": detail,
                "error_type": type(exc).__name__,
                "path": request.url.path,
            },
        )


async def validation_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """Handle validation errors from Pydantic."""
    logger.warning(
        f"Validation error: {exc}",
        extra={"path": request.url.path, "method": request.method},
    )

    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "detail": "Validation error",
            "errors": exc.errors() if hasattr(exc, "errors") else [str(exc)],
        },
    )
