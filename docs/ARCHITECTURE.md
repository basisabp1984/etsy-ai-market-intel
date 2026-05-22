# Architecture

This document describes how MarketIntel AI is wired internally. It is the technical
reference for a developer joining the project. For product framing, see
[README](../README.md). For framework intent, see
[TECHNICAL_BRIEF](../TECHNICAL_BRIEF.md). For specific design decisions, see the ADRs
in [`adr/`](adr/).

---

## 1. System overview

MarketIntel AI is a single Next.js application that runs three roles in one process:

- **UI shell** — the seller-facing dashboard (server-rendered shell, client-hydrated
  surfaces).
- **Mock API surface** — Next.js route handlers under `app/api/*` that return JSON
  shaped like a real market-intelligence backend.
- **AI analyst stub** — a pure-function classifier that maps natural-language seller
  questions to canned analytic answers over the mock dataset.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                              Seller browser                              │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐    │
│  │  React 19 (App Router client surfaces)                           │    │
│  │  • Dashboard / Trends / Competitors / Research / Reports /       │    │
│  │    Settings                                                      │    │
│  │  • React Portals: AiAnalystPanel, ResearchModal,                 │    │
│  │    CommandPalette, ToastHost                                     │    │
│  └────────────────────────────────────────────┬─────────────────────┘    │
│                                               │ fetch JSON               │
└───────────────────────────────────────────────┼──────────────────────────┘
                                                ▼
┌──────────────────────────────────────────────────────────────────────────┐
│  Next.js 16 App Router server (one process)                              │
│                                                                          │
│  app/api/trends           ──┐                                            │
│  app/api/competitors      ──┤                                            │
│  app/api/products         ──┤                                            │
│  app/api/research         ──┼──► src/lib/mock-data.ts                    │
│  app/api/research/run     ──┤    (single source of truth, in-memory)     │
│  app/api/reports          ──┤                                            │
│  app/api/ai/analyze       ──┘                                            │
└──────────────────────────────────────────────────────────────────────────┘
```

Everything inside the lower box is what a production deployment would replace — see
[§5 Real-MVP path](#5-real-mvp-path).

## 2. Folder layout

```
src/
  app/
    api/                       Mock API route handlers
      trends/route.ts          GET trends + dashboard KPIs
      competitors/route.ts     GET competitor list
      products/route.ts        GET tracked products
      research/route.ts        GET research-runs ledger
      research/run/route.ts    POST start a new research run
      reports/route.ts         GET generated reports
      ai/analyze/route.ts      POST AI analyst Q&A
    page.tsx                   Dashboard route
    trends/page.tsx
    competitors/page.tsx
    research/page.tsx
    reports/page.tsx
    settings/page.tsx
    layout.tsx                 Root layout, mounts AppLayout
    globals.css                Light premium-SaaS theme tokens

  components/
    layout/
      AppLayout.tsx            Frame: sidebar + topbar + portals + main
      Sidebar.tsx              Desktop navigation
      Topbar.tsx               Search trigger + user profile
      MobileNav.tsx            Mobile bottom navigation
    dashboard/
      DashboardClient.tsx      Dashboard composition
    portals/
      Portal.tsx               createPortal wrapper that waits for mount
      AiAnalystPanel.tsx       Floating AI Analyst chat
      ResearchModal.tsx        Run-New-Research form
      CommandPalette.tsx       Ctrl+K command palette
      ToastHost.tsx            Notification deck
    ui/
      MetricCard.tsx           KPI card with accent gradient
      Badge.tsx                Color-coded status badge
      Sparkline.tsx            Polyline sparkline for trend score series
      BarChart.tsx             Horizontal bar chart for opportunity ranking

  lib/
    mock-data.ts               Single source of truth for the mock layer
    api.ts                     Typed client for the route handlers
    utils.ts                   Formatting helpers (currency, cn)

  types/index.ts               Shared TS types: Trend, Product, Competitor,
                               ResearchRun, Report
```

## 3. Request flow

When the user opens `/` (Dashboard):

1. Next.js renders `app/layout.tsx` (server). The layout mounts `<AppLayout />`, which
   renders the sidebar, topbar, mobile nav, and the four portals.
2. `<DashboardClient />` mounts and fires `useEffect` to fetch in parallel:
   `/api/trends`, `/api/competitors`, `/api/products`.
3. Each route handler imports the relevant slice of `src/lib/mock-data.ts` and returns
   `NextResponse.json({ data: ..., kpis?: ... })`.
4. The dashboard composes the hero block, KPI cards, the trends table with sparkline
   momentum, the opportunity bar chart, the competitor watch panel, and the products
   panel from the responses.

Posting:

- **`POST /api/research/run`** — `ResearchModal` calls it on submit. Handler
  fabricates a completed `ResearchRun` and returns it. The toast host then surfaces a
  "research completed" notification.
- **`POST /api/ai/analyze`** — `AiAnalystPanel` calls it on each user question.
  Handler inspects the question for trigger keywords (fastest/growing, price-drop/
  aggressive, low-competition/rising-demand, report) and returns a templated answer
  over the mock dataset.

## 4. State, routing, and rendering choices

- **App Router with route handlers** instead of `pages/api`. See
  [ADR-0001](adr/0001-nextjs-app-router-and-route-handlers.md).
- **All data flows through the route handlers**, not direct imports from
  `mock-data.ts`. The UI never sees `mock-data.ts` directly. This invariant was
  restored in v0.1.1 (research-runs page used to import the mock module). See
  [ADR-0002](adr/0002-api-first-mock-layer.md).
- **Portals for overlay UI** rather than DOM siblings. AI panel, modal, palette, and
  toasts escape the layout tree. See
  [ADR-0003](adr/0003-react-portals-for-overlays.md).
- **Light premium-SaaS theme** via Tailwind tokens. Matches the audience — Etsy
  sellers running a small business, browsing on a laptop or phone. See
  [ADR-0004](adr/0004-light-premium-saas-theme.md).
- **No client-side state library.** Each surface fetches its own slice in
  `useEffect` and renders. `AppLayout` is the only place with stateful coordination
  (palette, modal, toast queue) and it uses local `useState`. See
  [ADR-0005](adr/0005-no-state-library.md).

## 5. Real-MVP path

This prototype is the carrier. The actual product replaces the shaded box of the
diagram:

| Boundary                         | Today                            | Production replacement                                       |
|----------------------------------|----------------------------------|--------------------------------------------------------------|
| `mock-data.ts`                   | hand-shaped TS literals          | Postgres + Prisma/Drizzle; seeded from real feeds            |
| `GET /api/trends`                | reads `trends` array             | Reads from DB, scored from Etsy listing + TikTok signals     |
| `GET /api/competitors`           | reads `competitors` array        | Reads from seller-tracking DB, updated by background jobs    |
| `GET /api/products`              | reads `products` array           | Reads from product-watch DB, listing changes captured daily  |
| `GET /api/research`              | reads `researchRuns` array       | Reads from research-run DB, mirrors job-queue history        |
| `POST /api/research/run`         | fabricates one `ResearchRun`     | Enqueues a real research job: scrape + enrich + LLM summary  |
| `GET /api/reports`               | reads `reports` array            | Reads generated reports + LLM weekly summaries               |
| `POST /api/ai/analyze`           | keyword classifier               | LLM with retrieval over the seller's own trends + reports    |
| Auth                             | none                             | Auth.js / Clerk / custom session                             |
| Background work                  | none                             | Queue (e.g. Inngest, Trigger.dev) for trends/competitor poll |
| Observability                    | none                             | Sentry + log shipping + uptime monitoring                    |
| Tenancy                          | single anonymous seller          | Sellers, teams, RBAC, audit log                              |

Notice that **no page in `app/` changes** when these swaps happen. That is the value
of the API-first boundary.

## 6. Operational notes

- `npm run dev` — Next.js dev server.
- `npm run lint` — ESLint flat config (`eslint-config-next/core-web-vitals` + typescript).
  `--max-warnings=0` so any warning fails CI.
- `npm run build` — production build.
- `npm run start` — serves the production build on the configured port.
- Deployment is GitHub-connected to Vercel. Pushes to `master` trigger a production
  deploy. The custom subdomain `marketintel.radai-1984.dev` points at Vercel's anycast
  IP via Cloudflare DNS (see [DEPLOYMENT](../DEPLOYMENT.md)).

## 7. Security & secrets

The prototype carries **no secrets**. There are no API keys, no auth tokens, no
environment variables required to run it locally or in production. If you fork it and
add a real provider integration (Etsy API, TikTok signals, LLM), route the secret
through `process.env` and store it in the Vercel project settings — never commit
`.env.local`.

The Vercel deployment-protection feature is currently *off* on this project so that
prospective sellers can open the live URL without an account. If you fork it into a
real product, turn protection back on while the audience is invite-only.

For the full picture — what is intentionally absent, what arrives before production,
and how to report a vulnerability — see [`SECURITY.md`](../SECURITY.md).
