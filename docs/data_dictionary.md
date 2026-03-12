# Data Dictionary (Schema v1)

This data model is intentionally scoped to MVP analytical use cases: route exploration, route detail trends, reliability context, and score lookup.

## 1) `airports`
**Purpose**
- Airport dimension used to define routes and attach airport-level context.

**Grain**
- One row per airport (`iata_code`).

**Key columns**
- `airport_id` (PK)
- `iata_code` (unique, 3-letter)
- `airport_name`, `city`, `state_code`, `country_code`

**Product connection**
- Powers origin/destination search labels and route endpoint metadata.

---

## 2) `airlines`
**Purpose**
- Airline/carrier dimension for operational reliability facts.

**Grain**
- One row per carrier (`carrier_code`).

**Key columns**
- `airline_id` (PK)
- `carrier_code` (unique)
- `airline_name`

**Product connection**
- Supports carrier-specific reliability breakdowns on route detail.

---

## 3) `routes`
**Purpose**
- Canonical route dimension linking origin and destination airports.

**Grain**
- One row per directed airport pair (`origin_airport_id`, `destination_airport_id`).

**Key columns**
- `route_id` (PK)
- `origin_airport_id` (FK → `airports`)
- `destination_airport_id` (FK → `airports`)
- Unique constraint on (`origin_airport_id`, `destination_airport_id`)

**Product connection**
- Core key for route explorer results and all route-level facts.

---

## 4) `monthly_fares`
**Purpose**
- Monthly fare trend table for route-level pricing history (DB1B-style aggregation).

**Grain**
- One row per `route_id` + `year` + `month`.

**Key columns**
- Composite PK: (`route_id`, `year`, `month`)
- `avg_fare_usd`
- `passengers_estimated` (optional context)

**Product connection**
- Drives route fare trend charts.
- Provides the base series used later for `cheapest_month`, `fare_volatility`, and `deal_signal` derivation.

---

## 5) `ontime_stats`
**Purpose**
- Monthly operational reliability facts focused on on-time performance.

**Grain**
- One row per `route_id` + `airline_id` + `year` + `month`.

**Key columns**
- Composite PK: (`route_id`, `airline_id`, `year`, `month`)
- `flights_total`, `flights_ontime`, `ontime_rate`
- `avg_arrival_delay_minutes`

**Product connection**
- Supports route and carrier reliability summaries used by route detail and score computation.

---

## 6) `cancellations`
**Purpose**
- Monthly cancellation facts separated from on-time stats for explicit reliability decomposition.

**Grain**
- One row per `route_id` + `airline_id` + `year` + `month`.

**Key columns**
- Composite PK: (`route_id`, `airline_id`, `year`, `month`)
- `flights_total`, `cancellations_count`, `cancellation_rate`

**Product connection**
- Enables direct cancellation trend and reliability breakdown queries.
- Kept separate in v1 to keep cancellation logic explicit, reduce overloaded semantics in `ontime_stats`, and satisfy the required MVP target table while preserving clean table purpose.

---

## 7) `airport_enplanements`
**Purpose**
- Annual FAA airport traffic context.

**Grain**
- One row per `airport_id` + `year`.

**Key columns**
- Composite PK: (`airport_id`, `year`)
- `total_enplanements`

**Product connection**
- Supports airport context panels and route endpoint context.

---

## 8) `route_scores`
**Purpose**
- Monthly route-level derived score snapshot table.

**Grain**
- One row per `route_id` + `year` + `month`.

**Key columns**
- Composite PK: (`route_id`, `year`, `month`)
- `reliability_score`
- `fare_volatility`
- `deal_signal`
- `route_attractiveness_score`
- `calculated_at`

**Product connection**
- Fast lookup for route ranking, route cards, and latest route-detail score display.

---

## View: `v_latest_route_scores`
**Purpose**
- Convenience view that returns the latest score snapshot per route.

**Why included in v1**
- Simplifies route explorer and route detail queries that need “latest score” semantics without duplicating windowing logic across API queries.
