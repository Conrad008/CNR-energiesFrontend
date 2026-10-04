# CNR Energies — Frontend

React + Vite frontend for the CNR Energies fuel station operations platform. Consumes the CNR Energies Django REST API to provide role-based tools for shift management, fuel reconciliation, tank inventory, B2B credit accounts, and M-Pesa payments.

**Live app:** https://cnr-energies-frontend.vercel.app
**Backend API:** https://cnr-energies-backend.onrender.com/api

---

## Tech Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`)
- **Icons:** lucide-react
- **Routing:** React Router v6
- **Data fetching:** Axios + TanStack Query
- **Charts:** Recharts
- **Fonts:** Tailwind's default system font stack (no external font loading)

---

## Features

- **Authentication** — JWT login via Simple JWT, automatic access-token refresh on 401, role-aware routing
- **Shifts** — start a shift, record closing meters, view shift history and per-nozzle revenue
- **Reconciliation** — live variance calculation against cash/M-Pesa/card/credit collections
- **Credit customers** — B2B account management, credit sales, payment recording
- **M-Pesa** — STK push integration with live status polling (sending → waiting → success/failed/timeout)
- **Tanks** — stock level visualization, dip readings, delivery logging
- **Fuel products** — price updates with historical price ledger
- **Dashboard** — revenue summary, payment channel breakdown, stock summary, charts
- **Users** — staff account creation, activate/deactivate, delete (where safe)
- **Audit log** — tracks price changes, reconciliation approvals, and user creation
- **Dark mode** — persisted theme preference, custom palette (see below)
- **Responsive** — mobile-first layouts with a collapsible nav drawer below `md`

---

## Role-Based Access

| Role | Access |
|---|---|
| `SUPER_ADMIN` | Full access, including Users and Audit log |
| `MANAGER` | Price updates, shift approvals, credit account registration, deliveries |
| `ATTENDANT` | Start/close own shifts, record sales |
| `ACCOUNTANT` | Reconciliation, credit payments and sales |
| `INVENTORY_OFFICER` | Dip readings, deliveries |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A running instance of the [CNR Energies backend](https://github.com/Conrad008/CNR-Energies) (local or deployed)

### Installation

```bash
git clone https://github.com/Conrad008/CNR-energiesFrontend.git
cd CNR-energiesFrontend
npm install
```

### Environment variables

Create a `.env` file in the project root (not committed — see `.gitignore`):

```dotenv
VITE_API_URL=http://127.0.0.1:8000/api
```

If unset, the app falls back to a relative `/api` path, which works locally against Vite's dev proxy (configured in `vite.config.js`) but **must** be set explicitly for any deployed environment, since there's no proxy in production.

> **Note:** Vite only exposes variables prefixed with `VITE_` to the client bundle, and bakes them in at **build time** — changing this value requires a rebuild, not just a restart.

### Run locally

```bash
npm run dev
```

App runs at `http://localhost:5173`. Requires the backend running separately (see backend README) at `http://127.0.0.1:8000`.

### Build for production

```bash
npm run build
npm run preview   # serve the production build locally to sanity-check before deploying
```

---

## Project Structure
```

src/
├── api/ One file per API resource (auth, shifts, tanks, credit, mpesa, etc.)
├── auth/ AuthContext, ProtectedRoute (with optional role gating)
├── theme/ ThemeContext — dark mode, persisted to localStorage
├── components/
│ ├── ui/ Reusable primitives (Button, Input, Card, Badge, Spinner, EmptyState, ErrorState)
│ └── layout/ AppShell (responsive sidebar/drawer + topbar)
├── features/ Domain-specific components, grouped by area (shifts/, reconciliation/, credit/, mpesa/, tanks/, fuel/, users/, analytics/)
├── hooks/ useFetch (loading/error/data wrapper)
├── lib/ format.js (currency, liters, dates), roles.js (role constants + helpers)
├── pages/ Route-level page components
├── App.jsx
└── main.jsx

```

---

## Color Palette

Defined as CSS custom properties in `src/index.css`, mapped to Tailwind utility classes (`bg-primary`, `text-danger`, `bg-surface`, `text-muted`, etc.):

| Token | Light | Dark |
|---|---|---|
| Primary (green) | `#15803D` | `#4ADE80` |
| Danger (red) | `#DC2626` | `#F87171` |
| Background | `#F6F8F7` | `#0E1311` |
| Surface | `#FFFFFF` | `#161C19` |
| Border | `#DDE5E0` | `#26302B` |
| Text | `#111827` | `#E6EDE9` |
| Muted text | `#5B6B63` | `#93A59B` |

---

## Deployment

Deployed on **Vercel**, auto-building from the `main` branch.

Required environment variable (Project Settings → Environment Variables, type **Config**, not Secret — this value is intentionally exposed to the browser):

VITE_API_URL=https://cnr-energies-backend.onrender.com/api

## License

Proprietary software developed for CNR Energies. All rights reserved.

## Author

Conrad Kipngeno