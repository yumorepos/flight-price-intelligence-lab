-- Flight Price Intelligence Lab: Postgres schema v1 (MVP analytics foundation)

BEGIN;

-- =========================
-- Dimension tables
-- =========================

CREATE TABLE IF NOT EXISTS airports (
    airport_id BIGSERIAL PRIMARY KEY,
    iata_code CHAR(3) NOT NULL UNIQUE,
    airport_name TEXT NOT NULL,
    city TEXT,
    state_code CHAR(2),
    country_code CHAR(2) NOT NULL DEFAULT 'US',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS airlines (
    airline_id BIGSERIAL PRIMARY KEY,
    carrier_code VARCHAR(3) NOT NULL UNIQUE,
    airline_name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS routes (
    route_id BIGSERIAL PRIMARY KEY,
    origin_airport_id BIGINT NOT NULL REFERENCES airports(airport_id),
    destination_airport_id BIGINT NOT NULL REFERENCES airports(airport_id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (origin_airport_id, destination_airport_id),
    CHECK (origin_airport_id <> destination_airport_id)
);

-- =========================
-- Fact tables
-- =========================

-- Grain: one row per route + year + month (all carriers combined for trending)
CREATE TABLE IF NOT EXISTS monthly_fares (
    route_id BIGINT NOT NULL REFERENCES routes(route_id),
    year SMALLINT NOT NULL,
    month SMALLINT NOT NULL CHECK (month BETWEEN 1 AND 12),
    avg_fare_usd NUMERIC(8,2) NOT NULL CHECK (avg_fare_usd >= 0),
    passengers_estimated INTEGER,
    PRIMARY KEY (route_id, year, month)
);

-- Grain: one row per route + carrier + year + month
CREATE TABLE IF NOT EXISTS ontime_stats (
    route_id BIGINT NOT NULL REFERENCES routes(route_id),
    airline_id BIGINT NOT NULL REFERENCES airlines(airline_id),
    year SMALLINT NOT NULL,
    month SMALLINT NOT NULL CHECK (month BETWEEN 1 AND 12),
    flights_total INTEGER NOT NULL CHECK (flights_total >= 0),
    flights_ontime INTEGER NOT NULL CHECK (flights_ontime >= 0),
    ontime_rate NUMERIC(5,4) NOT NULL CHECK (ontime_rate BETWEEN 0 AND 1),
    avg_arrival_delay_minutes NUMERIC(6,2),
    PRIMARY KEY (route_id, airline_id, year, month),
    CHECK (flights_ontime <= flights_total)
);

-- Grain: one row per route + carrier + year + month
-- Kept as a separate table in v1 so cancellations can be independently modeled/queried
-- while retaining a simple, explicit target table for reliability breakdown.
CREATE TABLE IF NOT EXISTS cancellations (
    route_id BIGINT NOT NULL REFERENCES routes(route_id),
    airline_id BIGINT NOT NULL REFERENCES airlines(airline_id),
    year SMALLINT NOT NULL,
    month SMALLINT NOT NULL CHECK (month BETWEEN 1 AND 12),
    flights_total INTEGER NOT NULL CHECK (flights_total >= 0),
    cancellations_count INTEGER NOT NULL CHECK (cancellations_count >= 0),
    cancellation_rate NUMERIC(5,4) NOT NULL CHECK (cancellation_rate BETWEEN 0 AND 1),
    PRIMARY KEY (route_id, airline_id, year, month),
    CHECK (cancellations_count <= flights_total)
);

-- Grain: one row per airport + calendar year
CREATE TABLE IF NOT EXISTS airport_enplanements (
    airport_id BIGINT NOT NULL REFERENCES airports(airport_id),
    year SMALLINT NOT NULL,
    total_enplanements BIGINT NOT NULL CHECK (total_enplanements >= 0),
    PRIMARY KEY (airport_id, year)
);

-- Grain: one row per route + year + month score snapshot
CREATE TABLE IF NOT EXISTS route_scores (
    route_id BIGINT NOT NULL REFERENCES routes(route_id),
    year SMALLINT NOT NULL,
    month SMALLINT NOT NULL CHECK (month BETWEEN 1 AND 12),
    reliability_score NUMERIC(6,3) CHECK (reliability_score BETWEEN 0 AND 100),
    fare_volatility NUMERIC(10,4),
    deal_signal VARCHAR(20) NOT NULL,
    route_attractiveness_score NUMERIC(6,3) CHECK (route_attractiveness_score BETWEEN 0 AND 100),
    calculated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (route_id, year, month),
    CHECK (deal_signal IN ('strong_deal', 'deal', 'neutral', 'expensive'))
);

-- =========================
-- Indexes for product queries
-- =========================

CREATE INDEX IF NOT EXISTS idx_routes_origin ON routes (origin_airport_id);
CREATE INDEX IF NOT EXISTS idx_routes_destination ON routes (destination_airport_id);

CREATE INDEX IF NOT EXISTS idx_monthly_fares_route_period ON monthly_fares (route_id, year, month);

CREATE INDEX IF NOT EXISTS idx_ontime_route_period ON ontime_stats (route_id, year, month);
CREATE INDEX IF NOT EXISTS idx_ontime_carrier_period ON ontime_stats (airline_id, year, month);

CREATE INDEX IF NOT EXISTS idx_cancellations_route_period ON cancellations (route_id, year, month);
CREATE INDEX IF NOT EXISTS idx_cancellations_carrier_period ON cancellations (airline_id, year, month);

CREATE INDEX IF NOT EXISTS idx_airport_enplanements_year ON airport_enplanements (year);

CREATE INDEX IF NOT EXISTS idx_route_scores_period ON route_scores (year, month);
CREATE INDEX IF NOT EXISTS idx_route_scores_lookup_latest ON route_scores (route_id, year DESC, month DESC);

-- Optional helper view for route detail pages: latest available score per route
CREATE OR REPLACE VIEW v_latest_route_scores AS
SELECT DISTINCT ON (rs.route_id)
    rs.route_id,
    rs.year,
    rs.month,
    rs.reliability_score,
    rs.fare_volatility,
    rs.deal_signal,
    rs.route_attractiveness_score,
    rs.calculated_at
FROM route_scores rs
ORDER BY rs.route_id, rs.year DESC, rs.month DESC;

COMMIT;
