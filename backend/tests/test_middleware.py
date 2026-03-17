"""Tests for error handling middleware."""

import pytest
from fastapi.testclient import TestClient

from app.main import create_app


@pytest.fixture
def client():
    """Create test client."""
    app = create_app()
    return TestClient(app)


def test_health_check(client):
    """Test health check endpoint works."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "version" in data
    assert "uptime_seconds" in data


def test_liveness_probe(client):
    """Test liveness probe endpoint."""
    response = client.get("/health/liveness")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "alive"


def test_readiness_probe(client):
    """Test readiness probe endpoint."""
    response = client.get("/health/readiness")
    assert response.status_code in [200, 503]
    data = response.json()
    assert "status" in data


def test_root_endpoint(client):
    """Test root endpoint."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "version" in data
    assert data["version"] == "0.2.0"


def test_404_error_handling(client):
    """Test 404 errors are handled correctly."""
    response = client.get("/nonexistent")
    assert response.status_code == 404
    data = response.json()
    assert "detail" in data


def test_cors_headers(client):
    """Test CORS headers are present."""
    response = client.options("/health")
    assert "access-control-allow-origin" in response.headers


def test_request_logging(client, caplog):
    """Test that requests are logged."""
    with caplog.at_level("INFO"):
        client.get("/health")
    
    # Check that request was logged
    assert any("GET" in record.message and "/health" in record.message 
               for record in caplog.records)
