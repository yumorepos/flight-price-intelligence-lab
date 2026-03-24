# Roadmap

## Status legend
- ✅ Done / usable now
- 🟡 Partial / MVP quality
- ⬜ Not started

## Phase 0 — Truth cleanup + naming cleanup ✅
- Runtime-mode reality clarified in README
- Contradictory production language removed
- Product framed as modular aviation playground with price-intelligence core

## Phase 1 — IA repositioning ✅
- Added global module navigation
- Homepage repositioned as module hub
- Price Intelligence explicitly retained as flagship module

## Phase 2 — Demo/API parity fixes ✅
- Added Next.js mock routes for route detail, airport context, methodology, network hubs, and seasonality index
- Reduced broken navigation paths in mock mode
- Confidence semantics standardized to categorical labels in contracts/UI

## Phase 3 — New enthusiast modules ✅
- Airport Intelligence page backed by `/api/airports/[iata]/context`
- Route Network page backed by `/api/network/hubs`
- Seasonality page backed by `/api/seasonality/index`
- Learn page backed by `/api/meta/methodology`

## Phase 4 — Hardening pass ✅ (MVP-consistency)
- Backend repository now supports PostgreSQL query mode when `FPI_DATABASE_URL` is set
- Data-refresh workflow now passes required ingest `--input` args and validates configured source paths
- Added backend contract tests for categorical confidence + DB-mode branch behavior

## Next hardening targets 🟡
1. Add integration tests against a temporary Postgres instance
2. Add route/airport/seasonality API contract tests in frontend test harness
3. Expand airline intelligence and richer route-map visualization
4. Add data freshness metadata and SLA-style “last refreshed” surfaces
