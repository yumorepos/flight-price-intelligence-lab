# Deployment Fix Documentation

## Issue Identified
Live Vercel deployment at `https://flight-price-intelligence-lab-iwnt.vercel.app/` returns 404.

## Root Cause
Vercel likely deployed from repository root instead of `/frontend/` subdirectory, causing routing failure.

## Solution Applied

### 1. Created `vercel.json` Configuration
```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "frontend/$1"
    }
  ]
}
```

This tells Vercel:
- Build source is in `/frontend/` subdirectory
- Use Next.js builder
- Route all traffic to frontend

### 2. Verified Local Build
```bash
cd frontend
npm install
npm run build
```

**Result:** ✅ Build successful (no TypeScript errors, Next.js compiled cleanly)

## Deployment Steps

### Option A: Vercel Dashboard (Recommended)
1. Go to https://vercel.com/dashboard
2. Find `flight-price-intelligence-lab` project
3. Go to Settings → Build & Development Settings
4. Set:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
5. Redeploy from Deployments tab

### Option B: Vercel CLI
```bash
cd /path/to/flight-price-intelligence-lab
vercel --prod
# Follow prompts, should auto-detect Next.js in frontend/
```

### Option C: GitHub Push (if auto-deploy enabled)
```bash
git add vercel.json
git commit -m "fix: Add Vercel config for frontend subdirectory"
git push origin main
```

Vercel will auto-redeploy on push.

## Expected Result
- Live URL should load properly
- Homepage displays airport search
- Routes work (no 404s)

## Next Steps After Deployment Works
1. Take screenshots (homepage, route explorer, route detail)
2. Create animated GIF demo
3. Update README.md with live link + visuals
4. Add UI library (Recharts + Tailwind)

## Verification Checklist
- [ ] `vercel.json` exists in repo root
- [ ] Vercel dashboard shows successful build
- [ ] Live URL loads without 404
- [ ] Navigation works (search → routes → detail)
- [ ] API calls work (check browser console for errors)

## Troubleshooting

### If build still fails:
1. Check Vercel build logs for specific error
2. Verify `BACKEND_URL` environment variable is set
3. Ensure all dependencies in `package.json` are correct

### If 404 persists:
1. Verify Root Directory is set to `frontend`
2. Check routes in `next.config.mjs` are correct
3. Clear Vercel cache and rebuild

## Status
- [x] Local build verified
- [x] `vercel.json` created
- [ ] Vercel redeployed (user action required)
- [ ] Live URL verified working
