# Firebase Finance — Codex NEO

Complete starter: Firestore (mv_yearly/mv_quarterly/mv_monthly), Cloud Functions to (re)build views, and a React (Vite + TS) web app with Codex NEO UI.

## Quick Start
1) Install Firebase CLI and login:
   ```bash
   npm i -g firebase-tools
   firebase login
   ```
2) Create a Firebase project or use existing. Update `.firebaserc` and `web/src/firebaseConfig.ts` with your config.
3) Install deps:
   ```bash
   cd web && npm i && cd ../functions && npm i
   ```
4) (Optional) Initialize Firestore indexes from `firestore.indexes.json`.
5) Deploy functions and hosting (or run locally):
   ```bash
   # Functions build & deploy
   cd functions && npm run build && firebase deploy --only functions && cd ..
   # Local web
   cd web && npm run dev
   # Or deploy hosting:
   firebase deploy --only hosting
   ```

## Collections
- `fact_ledgers`: raw facts (date, year, quarter, month, report_type, account_code, amount, ...)
- `mv_monthly`, `mv_quarterly`, `mv_yearly`: materialized views.

## Function
- `rebuildViews`: rebuilds mv_* for a given year per report type.

## Web
- Filters: Year/Quarter/Month + Compare
- Table: Current, Previous, Change, %
- Theme: Codex NEO (RTL friendly)

