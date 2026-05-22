# MarketIntel AI for Etsy Toy Sellers

This is a complete demo SaaS prototype built with Next.js, React, TypeScript, and Tailwind CSS.

The product concept: an AI market intelligence platform for Etsy toy sellers. It helps sellers monitor fast-growing niches, competitor price moves, TikTok trend signals, product opportunities, research runs, and AI analyst summaries.

No real Etsy API, TikTok API, scraping, authentication, database, or paid service is used. Everything runs on mock data, but the structure is intentionally shaped like a real MVP skeleton.

## Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## What Is Included

- Main dashboard
- Trends page
- Competitors page
- Research runs page
- Reports page
- Settings page
- Left navigation and top search bar
- Responsive desktop and mobile layouts
- KPI cards, charts, tables, badges, and smooth SaaS interactions
- Mock AI Analyst chat
- Mock research run modal and completion toast
- Command palette with `Ctrl+K`

## Additional Documentation

- `TECHNICAL_BRIEF.md` explains the architecture, API-first design, mock-data boundary, React Portals, and real MVP path.
- `DEPLOYMENT.md` explains how to publish the project to GitHub, deploy it to Vercel, attach a custom domain, and present it to a founder.

## API-First Structure

The frontend consumes mock API routes as if they were real backend endpoints:

- `GET /api/trends`
- `GET /api/competitors`
- `GET /api/products`
- `POST /api/research/run`
- `POST /api/ai/analyze`
- `GET /api/reports`

The mock source of truth is in `src/lib/mock-data.ts`. The route handlers live under `src/app/api/*/route.ts`.

This keeps the UI separate from the data boundary. Later, the mock route handlers can be replaced with database reads, external API clients, queue jobs, scraping agents, or LLM calls without redesigning the React screens.

## Where Next.js Is Used

- App Router structure in `src/app`
- Route handlers for API endpoints in `src/app/api`
- File-based routing for SaaS pages
- Root layout in `src/app/layout.tsx`
- Client components where interactivity is needed

## Where React Portals Are Used

All portal UI is mounted through `src/components/portals/Portal.tsx`.

Portal-based interactions:

- Floating AI Analyst panel: `src/components/portals/AiAnalystPanel.tsx`
- Run New Research modal: `src/components/portals/ResearchModal.tsx`
- Command palette opened by `Ctrl+K`: `src/components/portals/CommandPalette.tsx`
- Toast notifications after research completion: `src/components/portals/ToastHost.tsx`

## How Real Systems Can Be Connected Later

- Replace `src/lib/mock-data.ts` with database models and seed data.
- Replace route handlers with real service calls.
- Add Etsy API integration or a compliant data ingestion pipeline.
- Add TikTok signal collectors or third-party trend data providers.
- Add background research agents using queues and scheduled jobs.
- Add auth with a provider such as Auth.js, Clerk, or a custom session layer.
- Add persistent chat and report storage.
- Replace mock AI responses with an LLM provider behind `/api/ai/analyze`.

The current goal is not production infrastructure. The goal is a credible interactive MVP skeleton that shows product thinking, architecture, and UI behavior.
