# Portfolio Project: Why I Built This

This document explains the **strategic thinking** behind this project, why it exists, and what it demonstrates about my capabilities as a developer.

---

## The Big Question: Why This Project?

**Short answer:** To demonstrate I can build production-ready data products, not just follow tutorials.

**Long answer:** 👇

---

## My Background & Transition

### Where I'm Coming From
- **Current role:** Travel operations (booking, customer service, logistics)
- **Experience:** 3+ years in aviation/travel industry
- **Gap:** Limited formal software engineering experience

### Where I'm Going
- **Target role:** Python Developer, Data Analyst, Full-Stack Engineer
- **Location:** Montreal or Remote
- **Timeline:** Actively applying (3+ applications/week)

### The Challenge
Most self-taught developers build:
- Todo apps (overdone)
- E-commerce clones (generic)
- Tutorial follow-alongs (no differentiation)

**I needed something that:**
1. Leverages my industry knowledge (travel/aviation)
2. Demonstrates full-stack capability
3. Shows data engineering skills
4. Proves I can ship production-ready code
5. Differentiates me from other bootcamp grads

---

## Why Aviation Data?

### Strategic Advantages

**1. Domain Expertise**
- I've worked in travel operations for 3 years
- I understand fare pricing, route economics, airline operations
- I can speak intelligently about the problem space

**Interview advantage:**
> "I built this because I saw firsthand how opaque flight pricing is. Travelers and travel agents lack tools to evaluate route attractiveness beyond just price. This project solves a real problem I encountered daily."

**2. Rich Public Data**
- Bureau of Transportation Statistics (BTS): Free, comprehensive
- FAA datasets: Airport traffic, delays
- No API keys needed (lower barrier)

**3. Interesting Problems**
- Sparse data handling (not all routes have full coverage)
- Time-series analysis (fare trends over months)
- Multi-dimensional scoring (price + reliability + volatility)
- Performance optimization (450+ routes, <200ms queries)

**4. Portfolio Differentiation**
- Most portfolio projects: CRUD apps, games, clones
- This project: Real data, real analytics, real product thinking

---

## What This Project Demonstrates

### 1. Full-Stack Capability ✅

**Backend:**
- FastAPI (modern Python web framework)
- SQLAlchemy (ORM for database operations)
- PostgreSQL (relational database)
- Pydantic (data validation)
- Structured logging (JSON format)
- Error handling middleware

**Frontend:**
- Next.js 14 (React framework)
- TypeScript (type safety)
- Recharts (data visualization)
- Tailwind CSS (modern styling)
- Responsive design (mobile-friendly)

**Data Pipeline:**
- ETL scripts (raw → staging → marts)
- Pandas/NumPy (data transformation)
- Data quality checks
- Automated refresh (GitHub Actions)

**DevOps:**
- GitHub Actions (CI/CD)
- Pytest (automated testing)
- Vercel deployment (frontend)
- Security scanning (Trivy)

**Total:** 4 distinct skill areas in one project

---

### 2. Data Engineering Skills ✅

**Pipeline architecture:**
```
Public Data Sources (BTS, FAA)
    ↓
Raw Ingestion (scripts/ingest_*.py)
    ↓
Staging Normalization (clean, validate)
    ↓
Marts Aggregation (scores, trends)
    ↓
PostgreSQL Database
    ↓
API Layer (FastAPI)
    ↓
Frontend (Next.js)
```

**Key challenges solved:**
- Handling missing data (confidence-aware scoring)
- Time-series aggregation (monthly fare trends)
- Multi-source joins (fares + reliability + airports)
- Performance optimization (materialized views, indexing)

**What this shows:**
- I understand ETL patterns
- I can design data pipelines
- I know SQL beyond basic queries
- I think about performance

---

### 3. Product Thinking ✅

**Not just code - actual product decisions:**

**1. Transparent Methodology**
- Users can see how scores are calculated
- Confidence levels surface data quality
- Methodology documented in detail

**Why:** Builds trust, demonstrates communication skills

**2. MVP Scoping**
- Shipped core features first (search, explore, detail)
- Deferred nice-to-haves (auth, alerts, mobile)
- Documented roadmap for future

**Why:** Shows I can prioritize, not overengineer

**3. Error States & Loading**
- Graceful handling of API failures
- Loading spinners during data fetch
- Empty states with helpful messages

**Why:** Professional UX, not just happy-path code

**4. Responsive Design**
- Mobile-friendly layouts
- Accessible (semantic HTML, ARIA labels)
- Fast (<200ms API responses)

**Why:** Demonstrates attention to detail

---

### 4. Professional Practices ✅

**Testing:**
- pytest for backend (70% coverage target)
- Type checking (TypeScript strict mode)
- CI/CD (automated tests on every push)

**Code Quality:**
- Linting (ruff for Python, ESLint for TypeScript)
- Formatting (black, prettier)
- Type safety (mypy, TypeScript)

**Documentation:**
- Architecture diagram (clear system design)
- Methodology explanation (transparent scoring)
- Challenges & solutions (problem-solving showcase)
- Contribution guide (open-source ready)

**Security:**
- Dependency scanning (npm audit, Trivy)
- CORS configuration (cross-origin security)
- Input validation (Pydantic schemas)

**What this shows:**
- I write maintainable code
- I think about security
- I document for others
- I follow industry best practices

---

## What I Learned Building This

### Technical Skills (Concrete)
- **FastAPI:** RESTful API design, async Python, middleware
- **Next.js:** App Router, Server Components, API routes
- **PostgreSQL:** Schema design, indexing, materialized views
- **TypeScript:** Strict mode, interface design, type inference
- **Data Engineering:** ETL patterns, data quality, pipeline orchestration
- **DevOps:** GitHub Actions, CI/CD, deployment automation

### Soft Skills (Abstract)
- **Scoping:** Ruthless prioritization (MVP vs. vision)
- **Communication:** Writing docs as product features
- **Problem-Solving:** 7 major challenges documented (see CHALLENGES_SOLUTIONS.md)
- **User Empathy:** Transparency > precision (confidence levels)
- **Debugging:** Vercel 404 → monorepo routing fix (see CHALLENGES_SOLUTIONS.md)

### Meta-Learning (Career)
- **Portfolio strategy:** Domain expertise + technical skills = differentiation
- **Interview prep:** Every challenge is an interview story
- **Personal brand:** "I build data products for industries I understand"

---

## How This Helps My Job Search

### 1. Resume Talking Points

**Before:**
> "Self-taught developer with Python and JavaScript experience"

**After:**
> "Built full-stack aviation analytics platform processing 50k+ data points, achieving <200ms API response times with PostgreSQL optimization, deployed with CI/CD via GitHub Actions"

**Impact:** Specific, measurable, credible

---

### 2. Interview Stories

**Question:** "Tell me about a time you optimized performance."

**Answer:**
> "In my Flight Price Intelligence project, initial route queries took 3-5 seconds due to on-the-fly score calculations across 4 joined tables. I refactored to use pre-computed materialized views with strategic indexing, reducing response times to under 200ms - a 15-25x improvement. This taught me that for analytics workloads, batch pre-computation often beats real-time calculation."

**Shows:** Problem-solving, performance thinking, learned optimization

---

### 3. Technical Credibility

**Portfolio projects without this level of depth:**
- "Built a weather app" → Every bootcamp does this
- "Built a todo app" → Standard tutorial
- "Built an e-commerce site" → Clone project

**This project:**
- "Built a full-stack data analytics platform with ETL pipeline, RESTful API, and responsive frontend, processing public aviation data to generate route intelligence scores with confidence-aware methodology"

**Impact:** Stands out in applicant pool

---

### 4. Conversation Starter

**Recruiters/Hiring Managers ask:** "Walk me through your project."

**I can talk for 5-20 minutes about:**
- Why I chose this domain (travel background)
- Technical architecture (full-stack + data pipeline)
- Key challenges (7 documented with solutions)
- Product decisions (MVP scoping, transparency)
- What I'd do differently (roadmap)

**Other candidates:** Struggle to articulate beyond "I followed a tutorial"

---

## Why Montreal Companies Should Care

### Local Relevance

**Montreal → Aviation hub:**
- Air Canada HQ
- Bombardier
- CAE (flight simulation)
- Pratt & Whitney Canada
- Montreal-Trudeau Airport (YUL)

**My pitch:**
> "I understand the aviation industry from operational experience, and I can build data products for it. This project proves both."

### Bilingual Advantage
- Project docs in English (international standard)
- Can present in French (Montreal requirement)
- Interface could be localized (future enhancement)

### Remote-First Mindset
- Built while working full-time
- Documented for async collaboration
- CI/CD for distributed teams
- Shows self-direction

---

## What's Next (Roadmap Thinking)

### Phase 2 Enhancements (If Hired)
- **Real-time updates:** WebSocket integration
- **User accounts:** Authentication, saved searches
- **Email alerts:** Price drop notifications
- **ML forecasting:** Predict fare trends (LSTM, Prophet)

### Business Thinking
- **Monetization:** Freemium model (basic free, advanced paid)
- **API product:** Offer data access to travel agencies
- **White-label:** Sell to OTAs (Online Travel Agencies)

### Why Document This?
**Shows I think beyond code:**
- Product strategy
- Business model
- Go-to-market

**Hiring managers want:** Developers who understand the business

---

## Honest Reflection: What I'd Do Differently

### If I Started Over Today:

**1. Start with TypeScript from Day 1**
- Migrating mid-project was painful
- Caught 12 bugs, but cost 2 weeks

**2. Design Database Schema Earlier**
- Initial schema was too normalized
- Had to refactor for performance

**3. Use Supabase Instead of Raw PostgreSQL**
- Would save 1-2 weeks of backend work
- Still learn SQL, but faster iteration

**4. Add E2E Tests Sooner**
- Manual testing took too long
- Playwright would have caught UI bugs

**5. Deploy Backend from Start**
- Built backend, but it's not deployed yet
- Should have used Railway/Fly.io earlier

### Why Share This?
**Shows self-awareness:**
- I can critique my own work
- I learn from experience
- I think about process improvement

**Interview advantage:**
> "What would you improve about your project?"
> → I have a thoughtful answer ready

---

## The Bottom Line

### For Recruiters:
This project proves I can:
- Build production-ready software
- Work across the full stack
- Handle real data challenges
- Ship polished products
- Communicate technically

### For Hiring Managers:
This project shows I:
- Understand product thinking (not just code)
- Can work independently (self-directed)
- Prioritize effectively (MVP scoping)
- Document thoroughly (maintenance-ready)
- Think about users (confidence levels, error states)

### For Me:
This project is:
- My strongest portfolio piece
- Interview preparation (7 documented challenges)
- Career transition proof (travel → tech)
- Learning vehicle (full-stack + data)
- Confidence builder (I can ship real products)

---

## Contact & Next Steps

**Yumo Xu**  
Montreal, Canada  
[LinkedIn](https://linkedin.com/in/yumo-xu-1589b7326) · [GitHub](https://github.com/yumorepos) · [Portfolio](https://yumorepos.github.io)

**Looking for:**
- Python Developer roles
- Data Analyst roles
- Full-Stack Engineer roles

**Open to:**
- Montreal (on-site or hybrid)
- Remote (Canada/US)
- Contract or Full-Time

**Currently:** Actively applying (3+ applications/week)

---

*This project is a work in progress. I continue to refine it as I learn and apply for roles. Last updated: 2026-03-17*
