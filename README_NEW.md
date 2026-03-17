# ✈️ Flight Price Intelligence Lab

> **Full-stack aviation analytics platform** — Convert public flight data into route-level intelligence with transparent scoring.

**Live Demo:** [https://flight-price-intelligence-lab-iwnt.vercel.app](https://flight-price-intelligence-lab-iwnt.vercel.app) *(fixing deployment - see [DEPLOYMENT_FIX.md](DEPLOYMENT_FIX.md))*

**Tech Stack:** Next.js · FastAPI · PostgreSQL · TypeScript · Python · Data Engineering

---

## 🎯 What It Does

Flight Price Intelligence Lab transforms raw aviation data (fares, on-time performance, cancellations) into **actionable route intelligence** for travel professionals, data analysts, and aviation enthusiasts.

**Core Features:**
- 🔍 **Airport Search** - Find routes from any US origin
- 📊 **Route Intelligence** - Transparent scoring (0-100) based on price, reliability, and stability
- 🎯 **Deal Detection** - Identify historically attractive fares vs. route baseline
- 📈 **Trend Analysis** - Historical fare patterns with confidence indicators
- ⚠️ **Transparent Methodology** - No black-box algorithms, explainable scores

---

## 🖼️ Screenshots

### Homepage - Route Explorer
*[Screenshot placeholder - Airport search + Route cards]*

Search from any major US airport and see ranked routes with attractiveness scores.

### Route Detail View
*[Screenshot placeholder - Score breakdown + Trend chart]*

Dive deep into fare history, reliability metrics, and score composition.

### Deal Signal Dashboard
*[Screenshot placeholder - Deal labels + Historical context]*

Compare latest fares against route-specific baselines (not global averages).

---

## 🚀 Key Technical Highlights

### Architecture
```
Public Data Sources (BTS, FAA)
         ↓
  Raw Ingestion (scripts/ingest_*.py)
         ↓
  Staging Normalization
         ↓
  Marts Aggregation (scores, fares, reliability)
         ↓
  PostgreSQL Database
         ↓
  FastAPI REST API
         ↓
  Next.js Frontend (TypeScript)
```

### Code Quality
- **2,610+ lines** of production code (Python + TypeScript)
- **Clean separation** - Backend, frontend, data pipeline all decoupled
- **Typed contracts** - Pydantic schemas (backend) + TypeScript interfaces (frontend)
- **Tested** - pytest suite for API endpoints
- **Documented** - 4 comprehensive docs (architecture, methodology, roadmap, data dictionary)

### Data Intelligence
- **Deterministic scoring** - Weighted blend of price attractiveness, reliability, and fare volatility
- **Confidence-aware** - Scores shrink toward neutral when data is sparse
- **Deal detection** - Route-relative signals (not global comparisons)
- **Transparent caveats** - Fallback mode and data completeness surfaced in UI

### Production-Ready Practices
- **PostgreSQL** with schema v1 (dimensions + facts)
- **Environment-based config** (dev/staging/prod)
- **Error handling** - Graceful API failures + user-friendly messages
- **Metadata contracts** - Every response includes provenance (data_source, is_fallback, completeness)

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router, React Server Components)
- **TypeScript** (strict mode, typed API contracts)
- **Client-side state** (React hooks for search, route selection)
- **Responsive design** (mobile-friendly layouts)

### Backend
- **FastAPI** (async Python web framework)
- **PostgreSQL** (relational data store)
- **Pydantic** (schema validation + serialization)
- **uvicorn** (ASGI server)

### Data Pipeline
- **Python scripts** (pandas, numpy)
- **Raw → Staging → Marts** (layered transformations)
- **BTS DB1B** (fare data), **BTS On-Time** (reliability), **FAA Enplanements** (airport traffic)

### Tools
- **Git** (version control)
- **pytest** (automated testing)
- **Vercel** (frontend deployment)
- **PostgreSQL** (local + remote database)

---

## 📊 What Makes This Different

### 1. **Transparent Methodology**
Most flight deal platforms use opaque algorithms. This project:
- Documents scoring logic in detail ([methodology.md](docs/methodology.md))
- Shows score component breakdowns
- Explains when confidence is low

### 2. **Portfolio-Strength Architecture**
Not a tutorial clone:
- Real data pipeline (not mock data)
- Production-grade separation (backend/frontend/data)
- Tested API contracts
- Honest about MVP limitations

### 3. **Analytics Product Thinking**
Built like a SaaS analytics tool:
- Decision-support signals (not guarantees)
- Provenance metadata in every response
- Fallback mode for demos without full data
- User-friendly error states

---

## 🎓 What I Learned Building This

### Technical Growth
- **API design patterns** - RESTful contracts, typed schemas, error handling
- **Data pipeline architecture** - Layered transformations (raw/staging/marts)
- **Full-stack integration** - Backend ↔ Frontend communication
- **PostgreSQL optimization** - Indexing, materialized views, query performance
- **TypeScript at scale** - Typed API clients, React hooks, state management

### Product Thinking
- **MVP scoping** - What to build first vs. defer
- **Explainability** - Users trust scores they understand
- **Confidence-aware UX** - Show uncertainty, don't hide it
- **Portfolio storytelling** - Honest documentation > overpromising

### Professional Practices
- **Documentation first** - Wrote architecture.md before scaling
- **Testing early** - pytest suite from day 1
- **Version control** - Clean commit history, feature branches
- **Deployment readiness** - Environment configs, error handling

---

## 🚦 Current Status

### ✅ What's Working (MVP)
- Airport search across 125+ US airports
- Route exploration with attractiveness scoring
- Route detail views with fare trends
- Reliability signals (on-time, cancellations)
- Deal detection (route-relative)
- Metadata provenance in every response

### 🟡 What's Partial (Improving)
- Data coverage (MVP slice, not all routes/months)
- Score calibration (heuristic thresholds, not ML-optimized)
- Visual polish (basic charts, no animations yet)
- Automated pipeline (manual refresh currently)

### ⬜ What's Next (Roadmap)
- Automated data refresh (GitHub Actions)
- Enhanced visualizations (Recharts integration)
- Score explainability UI (component breakdowns)
- Seasonal pattern detection
- Simple ML forecasting (linear regression)
- Production hardening (monitoring, alerts, rate limiting)

See full roadmap: [docs/roadmap.md](docs/roadmap.md)

---

## 🏃 Run Locally

### Prerequisites
- Node.js 18+
- Python 3.10+
- PostgreSQL 14+

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000`

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API runs at `http://localhost:8000`

### Data Pipeline
```bash
cd scripts
python ingest_bts_db1b.py
python build_monthly_fares.py
python build_route_scores.py
python load_postgres.py
```

See [docs/architecture.md](docs/architecture.md) for detailed setup.

---

## 📂 Project Structure

```
flight-price-intelligence-lab/
├── frontend/          # Next.js app
│   ├── app/           # Routes (page.tsx, layout.tsx)
│   ├── components/    # React components
│   └── lib/           # API client, utilities
├── backend/           # FastAPI service
│   ├── app/           # API endpoints, schemas
│   └── tests/         # pytest suite
├── scripts/           # Data pipeline
│   ├── ingest_*.py    # Raw data extraction
│   └── build_*.py     # Staging + marts
├── data/              # Raw/staging/marts CSVs
├── sql/               # PostgreSQL schema
└── docs/              # Architecture, methodology, roadmap
```

---

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest tests/ -v

# Frontend build test
cd frontend
npm run build
```

---

## 🎯 Portfolio Context

**Who I am:**  
Self-taught software developer in Montreal transitioning from travel operations to tech. I learn by building real projects that solve real problems.

**Why I built this:**  
- Leverage my aviation industry experience
- Demonstrate full-stack capability (frontend + backend + data)
- Show I can scope and ship production-ready MVPs
- Prove I understand product thinking, not just coding

**What this showcases:**
- Data engineering (ETL pipelines)
- Backend API design (FastAPI + PostgreSQL)
- Frontend development (Next.js + TypeScript)
- System architecture (end-to-end design)
- Technical communication (documentation)
- Professional practices (testing, version control, deployment)

---

## 📬 Contact

**Yumo Xu**  
Montreal, Canada  
[LinkedIn](https://linkedin.com/in/yumo-xu-1589b7326) · [Portfolio](https://yumorepos.github.io) · [GitHub](https://github.com/yumorepos)

Looking for **Python Developer**, **Data Analyst**, or **Full-Stack Engineer** roles (Montreal or Remote).

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- Data sources: Bureau of Transportation Statistics (BTS), Federal Aviation Administration (FAA)
- Built with: Next.js, FastAPI, PostgreSQL, Vercel
- Inspired by: The need for transparent, explainable aviation analytics

---

**Status:** MVP deployed (fixing Vercel config) · Active development · Portfolio showcase project

*Last updated: March 17, 2026*
