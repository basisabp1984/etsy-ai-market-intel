# MarketIntel AI — Market Intelligence for Etsy Toy Sellers

> An AI market-intelligence platform for Etsy toy sellers — trending niches,
> competitor price moves, TikTok signals, opportunity scoring, research runs, and an
> AI analyst. Built as an API-first MVP prototype on Next.js + React + TypeScript +
> Tailwind.

![Next.js](https://img.shields.io/badge/Next.js-16-000?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-149eca?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-22c55e)
![Deploy](https://img.shields.io/badge/Vercel-Live-000?logo=vercel)

- **Live demo:** [https://marketintel.radai-1984.dev](https://marketintel.radai-1984.dev)
- **Vercel alias:** [https://etsy-ai-market-intel.vercel.app](https://etsy-ai-market-intel.vercel.app)
- **GitHub:** [basisabp1984/etsy-ai-market-intel](https://github.com/basisabp1984/etsy-ai-market-intel)

> **This is a reusable SaaS MVP skeleton.** The visible product (Etsy toy market
> intelligence) is a placeholder — the architecture, API-first contract, React
> Portal interactions, light premium-SaaS theme, build pipeline, and deploy
> automation are the reusable parts. Tell me what your product is — I will swap
> the mock data, brand strings, and AI prompts and give you a live URL in a
> couple of days. See [`docs/CUSTOMIZE.md`](docs/CUSTOMIZE.md) for the exact
> swap checklist.

---

## What is this?

MarketIntel AI is a working prototype of an AI-assisted market-intelligence cockpit
for Etsy toy sellers. A small-business operator opens it in the morning and can see —
at a glance — which toy niches are growing fastest, which competitors are aggressively
moving on price, which TikTok signals are surfacing new demand, and which product
opportunities to test next.

Every screen consumes mock JSON from Next.js route handlers shaped exactly like a
real backend. There is no real Etsy API, TikTok API, scraping, database, auth, or
LLM provider in this repo. The architecture is intentionally built so each of those
layers can be replaced without touching the dashboard. See
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) §5.

## What you'll see

The product covers six seller-facing surfaces:

| Surface         | What's on it                                                                  |
|-----------------|-------------------------------------------------------------------------------|
| **Dashboard**   | KPIs, trending-niches table with momentum sparklines, opportunity bar chart, competitor watch, products to watch |
| **Trends**      | Niche cards with growth, TikTok mentions, trend score; TikTok-signal bar chart |
| **Competitors** | Seller table — listings, average price, price move, review velocity, risk; products by tracked sellers |
| **Research**    | Research runs ledger — scope, signals collected, findings, status              |
| **Reports**     | Generated market reports with period, summary, and opportunity score          |
| **Settings**    | Integration readiness and alert preferences                                   |

Dashboard, schematically:

```
┌───────────────────────────────────────────────────────────────────────────────┐
│ AI market intelligence                                                        │
│ Etsy toy signals, competitor moves, and niche opportunities in one cockpit.   │
│                                                                               │
│ ── This week's strongest read ─────────────────────────────────────────       │
│ Tactile learning toys are pulling away. Busy boards = low comp; magnetic      │
│ puzzles = best growth velocity.                                               │
│                                                                               │
│ ── KPI cards ──────────────────────────────────────────────────────────       │
│ Trending niches  4    Avg price movement  +2.1%    Competitor activity  2     │
│ TikTok signal score  87    Opportunity score  85                              │
│                                                                               │
│ ┌─── Trending Niches ─────────────────────┐ ┌── Opportunity Ranking ──┐       │
│ │ Montessori magnetic puzzles   +28% Med  │ │ ████████████████  91    │       │
│ │ Miniature plush keychains     +22% High │ │ ███████████████   78    │       │
│ │ Wooden sensory busy boards    +19% Low  │ │ █████████████     88    │       │
│ │ DIY felt story kits           +14% Low  │ │ ████████████      84    │       │
│ └─────────────────────────────────────────┘ └─────────────────────────┘       │
│                                                                               │
│ ┌─── Competitor Watch ────────────────────┐ ┌── Products to Watch ────┐       │
│ │ TinyMochiCrafts          -13.4% move    │ │ Magnetic Safari Puzzle  │       │
│ │ CraftyPebbleKids          -7.9% move    │ │ Personalized Busy Board │       │
│ └─────────────────────────────────────────┘ │ Kawaii Pocket Plush     │       │
│                                              │ Felt Farm Story Kit    │       │
│                                              └─────────────────────────┘      │
└───────────────────────────────────────────────────────────────────────────────┘

Floating bottom-right: [AI Analyst chat]   Ctrl+K opens Command Palette
```

## Tech stack

- **Next.js 16** App Router with route handlers
- **React 19** with Server + Client Components
- **TypeScript 5** strict
- **Tailwind CSS 3** with a light premium-SaaS token set
- **lucide-react** for iconography
- **Vercel** for deployment, **Cloudflare** for the DNS zone

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. No environment variables required — the prototype
ships with mock data.

## QA pipeline

This prototype carries no Jest/Vitest unit tests — at the mock-data layer they
would be tests of fixtures. Instead it uses a layered pyramid that catches
everything the prototype can actually break:

1. **TypeScript strict** — caught at `npm run build`.
2. **ESLint `--max-warnings=0`** — any warning fails CI. `npm run lint`.
3. **Production build** — `npm run build` fails on type or compile errors
   that escape lint.
4. **Smoke** — [`scripts/smoke.sh`](scripts/smoke.sh) hits every API endpoint
   and every page, asserts HTTP 200 + recognizable JSON content. Runnable
   against any base URL:

   ```bash
   bash scripts/smoke.sh                                 # localhost:3000
   bash scripts/smoke.sh https://marketintel.radai-1984.dev
   ```

Jest + Playwright are added later, when mock route handlers are replaced
with real providers — at that point there is actual logic to assert against.

## Documentation

| Doc | What it covers |
|-----|----------------|
| [`README.md`](README.md) | This file — product overview, what you'll see, links |
| [`TECHNICAL_BRIEF.md`](TECHNICAL_BRIEF.md) | Product framing, architecture summary, real-MVP path |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | System diagram, request flow, folder layout, decisions overview |
| [`docs/API.md`](docs/API.md) | Full endpoint reference: shape, examples, curl commands |
| [`docs/adr/`](docs/adr/) | Architecture Decision Records — why we chose what we chose |
| [`DEPLOYMENT.md`](DEPLOYMENT.md) | GitHub + Vercel + Cloudflare DNS step-by-step |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | How to develop, commit conventions, folder rules |
| [`SECURITY.md`](SECURITY.md) | Security posture, what's intentionally absent, pre-production plan |
| [`CHANGELOG.md`](CHANGELOG.md) | Version history |
| [`LICENSE`](LICENSE) | MIT |

## API surface — at a glance

```
GET  /api/trends           → trends list + dashboard KPIs
GET  /api/competitors      → competitor snapshot
GET  /api/products         → tracked products
GET  /api/research         → research-runs ledger
GET  /api/reports          → generated market reports
POST /api/research/run     → trigger a mock research run
POST /api/ai/analyze       → AI analyst Q&A
```

Full reference with shapes, examples, and curl commands is in
[`docs/API.md`](docs/API.md).

## React Portals — four interactions

All four mount through [`src/components/portals/Portal.tsx`](src/components/portals/Portal.tsx)
to `document.body`. Why portals and not DOM siblings — see
[ADR-0003](docs/adr/0003-react-portals-for-overlays.md).

1. **Floating AI Analyst panel** — bottom-right chat, mock LLM with seeded questions.
2. **Run-New-Research modal** — form that posts to `/api/research/run`.
3. **Command Palette** — `Ctrl+K` for global navigation and quick actions.
4. **Toast host** — research-completion notifications.

## License

[MIT](LICENSE) © 2026 Andrii Radkobski.
