# Project Audit: GraySync

This document details the architectural, structural, and dependency analysis of the GraySync web application in preparation for deployment on Cloudflare Pages.

---

## 1. Technical Stack & Architecture

- **Core Framework**: React (v19.2.7)
- **Build System**: Vite (v8.0.16)
- **Styling Engine**: Tailwind CSS (v3.4.19) + PostCSS + Autoprefixer
- **Navigation**: Client-side state navigation (home, technology, diagnostics, specifications) inside [App.jsx](file:///c:/games/SYNC/src/App.jsx) combined with Framer Motion transitions.
- **State Management**: Context-driven telemetry provider ([TelemetryContext.jsx](file:///c:/games/SYNC/src/context/TelemetryContext.jsx)) supplying mock biosensor streams down to downstream consumer components via the [useTelemetry.js](file:///c:/games/SYNC/src/hooks/useTelemetry.js) hook.
- **Interactivity / Animation**: Framer Motion (v12.40.0) with reduced-motion support checking.
- **API Integrations**: Fully simulated local data loops. No external endpoints are called.
- **Environment Variables**: None required.
- **Build Directory**: `dist`

---

## 2. Folder Structure

```text
c:\games\SYNC\
├── public/                 # Static assets copied directly to build root
│   ├── _headers            # Cloudflare Pages security headers
│   ├── _redirects          # Cloudflare Pages SPA rewrite rules
│   ├── favicon.svg         # Tab brand icon
│   └── icons.svg           # Component icon assets
├── src/
│   ├── assets/             # Bundled static media (e.g. hero.png, vite.svg)
│   ├── components/
│   │   ├── sections/       # Primary shell layout panels (Header, Hero, Diagnostics, TechOverview, TechSpecs, Footer)
│   │   └── ui/             # Reusable aesthetic component elements (Badge, Button, TelemetryGraph, FAQItem, etc.)
│   ├── context/            # React Context files containing telemetry state
│   ├── hooks/              # Custom hooks (e.g. useTelemetry)
│   ├── utils/              # Animation variants and helper utilities
│   ├── App.jsx             # Main application shell component
│   ├── index.css           # Global custom styles and theme variables
│   └── main.jsx            # React root entry mountpoint
├── package.json            # Dependencies and npm script targets
├── tailwind.config.js      # Tailwind theme configuration
└── vite.config.js          # Vite build options
```

---

## 3. Dependency Analysis

### Key Dependencies

- `react` & `react-dom` (v19.2.7): Latest stable React release.
- `framer-motion` (v12.40.0): Drives subpixel spring animations.
- `lucide-react` (v1.17.0): Interface icons.
- `react-scroll` (v1.9.3): Layout viewport transitions.

### Resolved Blockers

- **`react-tsparticles`**: Remnant package removed. The installation phase inside Cloudflare Pages would otherwise fail due to a deprecated postinstall check crash in the `@tsparticles/engine` sub-dependency.
- **`zod`**: Locked at `4.4.3` via npm overrides in package.json to guarantee dependency resolution safety.

---

## 4. Security & Compliance Concerns

- **Exposed Secrets**: None. The project relies on simulated local client logic with 0 credentials or database connection strings.
- **XSS & unsafe practices**: No use of `dangerouslySetInnerHTML`, `eval()`, or unsafe `localStorage` reading.
- **Content Security**: Security headers need to be explicitly configured on the Cloudflare Edge to prevent clickjacking and MIME sniffing.

---

## 5. Performance Concerns

- **Oscilloscope Waveforms**: TelemetryGraph renders high-frequency sinusoidal paths locally using lightweight SVG maths instead of heavy canvas layers, preserving layout responsiveness.
- **Reduced Motion**: Keyboard focus outlines and accessibility options are wired in to ensure smooth animations switch off cleanly under reduced-motion user preferences.

---

## 6. Recommended Fixes for Cloudflare Pages

1. Remove `react-tsparticles` and `tsparticles` from dependencies (Completed).
2. Create Cloudflare-specific routing config file `_redirects` in `public/` (Pending).
3. Create Cloudflare-specific headers config file `_headers` in `public/` (Pending).
4. Remove `vercel.json` to keep build clean (Pending).
