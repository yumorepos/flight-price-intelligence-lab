# Screenshot Guide - Visual Documentation

**Purpose:** Capture professional screenshots for README.md and portfolio

---

## 🖼️ Required Screenshots (5 Total)

### 1. Homepage / Route Explorer
**URL:** `http://localhost:3000/` (or `/test-ui` for enhanced components)

**What to capture:**
- Airport search bar with "JFK" entered
- Route cards displayed (3-4 visible)
- Scores visible (75, 82, 68, etc.)
- Deal signal badges (STRONG DEAL, DEAL, EXPENSIVE)
- Professional layout with Tailwind styling

**How to take:**
1. Run `cd frontend && npm run dev`
2. Visit `http://localhost:3000/test-ui` (shows enhanced components)
3. Take full-screen screenshot: **Cmd+Shift+4** (Mac) or **Windows+Shift+S** (Windows)
4. Save as: `docs/images/01-homepage-route-explorer.png`

**Tip:** Zoom browser to 90% for better composition

---

### 2. Enhanced Route Card (Close-up)
**URL:** `http://localhost:3000/test-ui`

**What to capture:**
- Single route card in detail
- Plane icon
- Score badge (78)
- Deal signal (STRONG DEAL with icon)
- Latest Fare + Reliability metrics grid
- Confidence badge (HIGH CONFIDENCE)
- Hover effect (shadow lift)

**How to take:**
1. Hover over one route card
2. Zoom in to 125%
3. Capture just the card (not full screen)
4. Save as: `docs/images/02-enhanced-route-card.png`

---

### 3. Enhanced Line Chart (Interactive)
**URL:** `http://localhost:3000/test-ui`

**What to capture:**
- Fare trend chart with Recharts
- Trend indicator (↗ +3.2%)
- Interactive tooltip (hover over data point)
- Smooth line with dots
- CartesianGrid background
- Latest value display

**How to take:**
1. Scroll to "Fare Trend (Last 5 Months)" chart
2. Hover over a data point to show tooltip
3. Capture the chart with tooltip visible
4. Save as: `docs/images/03-fare-trend-chart.png`

---

### 4. Deal Signal Examples (Multiple States)
**URL:** `http://localhost:3000/test-ui`

**What to capture:**
- 3 route cards side-by-side:
  - STRONG DEAL (green badge)
  - DEAL (light green badge)
  - EXPENSIVE (red badge)
- Shows different confidence levels (HIGH, MEDIUM, LOW)

**How to take:**
1. Capture the "Route Cards" section showing all 3 variants
2. Save as: `docs/images/04-deal-signal-states.png`

---

### 5. Mobile Responsive View
**URL:** `http://localhost:3000/test-ui`

**What to capture:**
- iPhone/Android viewport (375px width)
- Route cards stack vertically
- Search bar adapts
- Touch-friendly targets

**How to take (Chrome DevTools):**
1. Open DevTools (F12 or Cmd+Option+I)
2. Click "Toggle device toolbar" (Cmd+Shift+M)
3. Select "iPhone 12 Pro" or "Pixel 5"
4. Take screenshot: DevTools → ⋮ → Capture screenshot
5. Save as: `docs/images/05-mobile-responsive.png`

---

## 🎥 Animated GIF Demo (30 seconds)

### Option A: QuickTime + Gifski (Mac)

**1. Record screen with QuickTime:**
```bash
# Open QuickTime Player
# File → New Screen Recording
# Select area around browser window
# Record 30-second demo
# Save as demo-recording.mov
```

**2. Convert to GIF:**
```bash
# Install gifski if needed
brew install gifski

# Convert
gifski demo-recording.mov -o docs/images/demo.gif --width 800 --fps 15
```

**Demo flow (30 seconds):**
1. Show homepage (2 sec)
2. Type "JFK" in search (2 sec)
3. Route cards appear (3 sec)
4. Scroll through routes (3 sec)
5. Click on one route card (2 sec)
6. Route detail page loads (3 sec)
7. Scroll to see fare chart (3 sec)
8. Hover over chart data points (3 sec)
9. Scroll to reliability metrics (3 sec)
10. Scroll back up (2 sec)
11. Click back button (2 sec)
12. Show homepage again (2 sec)

---

### Option B: LICEcap (Free, Cross-Platform)

**1. Download:** https://www.cockos.com/licecap/

**2. Record:**
- Set recording area to browser window
- Set FPS: 15
- Click "Record"
- Perform demo flow (above)
- Click "Stop"
- Save as `docs/images/demo.gif`

**Settings:**
- Max width: 800px
- FPS: 15
- Title frame: None
- Mouse button press indicator: Yes

---

### Option C: OBS Studio + GIF Converter

**1. Install OBS Studio:** https://obsproject.com/

**2. Record:**
- Add source: "Window Capture" (browser)
- Start recording
- Perform demo flow
- Stop recording (saved as MP4)

**3. Convert to GIF:**
- Go to https://ezgif.com/video-to-gif
- Upload MP4
- Set width: 800px
- Set FPS: 15
- Convert & download

---

## 📸 Screenshot Best Practices

### Preparation
- ✅ Clean browser (no bookmarks bar, extensions hidden)
- ✅ Full screen mode (F11 or Cmd+Ctrl+F)
- ✅ Zoom to 90% for better composition
- ✅ Hide mouse cursor (or position intentionally)
- ✅ Wait for animations to complete

### Lighting
- ✅ Use light mode (better contrast in docs)
- ✅ Increase screen brightness to 80-100%
- ✅ Avoid glare if photographing screen

### Framing
- ✅ Include enough context (surrounding UI)
- ✅ Crop out OS UI (taskbar, menu bar)
- ✅ Center the main element
- ✅ Leave some whitespace around edges

### File Format
- ✅ **PNG** for screenshots (lossless, text-friendly)
- ✅ **GIF** for animations (max 10MB for GitHub)
- ✅ Compress with TinyPNG if >500KB

---

## 🗂️ File Organization

```
docs/
└── images/
    ├── 01-homepage-route-explorer.png
    ├── 02-enhanced-route-card.png
    ├── 03-fare-trend-chart.png
    ├── 04-deal-signal-states.png
    ├── 05-mobile-responsive.png
    └── demo.gif
```

---

## 📝 Add to README.md

After taking screenshots, update README.md:

```markdown
## 🖼️ Screenshots

### Homepage - Route Explorer
![Homepage](docs/images/01-homepage-route-explorer.png)

Search from any major US airport and see ranked routes with attractiveness scores.

### Enhanced Route Cards
![Route Cards](docs/images/02-enhanced-route-card.png)

Color-coded deal signals, confidence indicators, and interactive hover effects.

### Fare Trend Analysis
![Fare Chart](docs/images/03-fare-trend-chart.png)

Interactive Recharts visualizations with trend indicators and tooltips.

### 🎥 Demo
![Demo](docs/images/demo.gif)

30-second walkthrough of the full user experience.

### 📱 Mobile Responsive
![Mobile](docs/images/05-mobile-responsive.png)

Touch-friendly design adapts to all screen sizes.
```

---

## ✅ Checklist

Before considering screenshots complete:

- [ ] 5 screenshots taken (PNG format)
- [ ] 1 animated GIF created (30 seconds)
- [ ] All files in `docs/images/` directory
- [ ] Files compressed (<500KB each)
- [ ] README.md updated with images
- [ ] Images committed to Git
- [ ] GitHub displays them correctly

---

## 🎯 Why This Matters

**Recruiters/Hiring Managers:**
- Won't run code locally
- Need visual proof it works
- Spend 10-30 seconds per portfolio project

**Good screenshots:**
- ✅ Show it works (credibility)
- ✅ Demonstrate UI/UX quality
- ✅ Differentiate from code-only projects
- ✅ Increase click-through to live demo

**Impact:** 3-5x more engagement with visual portfolio

---

## 🚀 Quick Start (5 Minutes)

```bash
# 1. Start dev server
cd /path/to/flight-price-intelligence-lab/frontend
npm run dev

# 2. Open browser
open http://localhost:3000/test-ui

# 3. Take 5 screenshots (Cmd+Shift+4 on Mac)
# Save to docs/images/

# 4. Record 30-second GIF
# Use QuickTime or LICEcap

# 5. Update README.md
# Add image links

# 6. Commit
git add docs/images/ README.md
git commit -m "docs: Add screenshots and demo GIF"
git push
```

**Done! Your portfolio now has visual proof.** ✅

---

*Last updated: 2026-03-17*
