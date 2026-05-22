# Technical Brief

## Product

MarketIntel AI is a demo SaaS prototype for Etsy toy sellers.

It helps sellers understand:

- which toy niches are growing;
- which competitors are changing prices;
- which products look promising;
- which TikTok-style signals are rising;
- what an AI analyst would recommend next.

This is not a production backend. It is an MVP skeleton designed to show product direction, UI behavior, and API-first architecture.

## Architecture

The project uses Next.js App Router with React, TypeScript, and Tailwind CSS.

Main folders:

- `src/app` - application routes and pages;
- `src/app/api` - mock API route handlers;
- `src/components/layout` - sidebar, top bar, mobile navigation, shell layout;
- `src/components/dashboard` - main dashboard experience;
- `src/components/portals` - portal-based interactions;
- `src/components/ui` - reusable UI primitives;
- `src/lib` - API client helpers, mock data, utilities;
- `src/types` - shared TypeScript types.

## API-First Design

The frontend is structured as if a real backend already exists.

The UI consumes API endpoints:

- `GET /api/trends`
- `GET /api/competitors`
- `GET /api/products`
- `POST /api/research/run`
- `POST /api/ai/analyze`
- `GET /api/reports`

Today these endpoints return mock JSON from `src/lib/mock-data.ts`.

Later they can be replaced with:

- database queries;
- Etsy API integration;
- compliant data ingestion pipelines;
- TikTok trend data providers;
- background research agents;
- LLM analysis;
- persistent report storage.

The goal is to keep the UI stable while the backend becomes real.

## React Portals

The app demonstrates modern SaaS interaction patterns using React Portals.

Portal entry point:

- `src/components/portals/Portal.tsx`

Portal-based UI:

- `AiAnalystPanel.tsx` - floating AI analyst chat;
- `ResearchModal.tsx` - modal for running new research;
- `CommandPalette.tsx` - `Ctrl+K` command palette;
- `ToastHost.tsx` - toast notifications after research completion.

These components mount outside the normal layout tree through `document.body`, which is the right pattern for overlays, floating panels, modals, and global notifications.

## Mock Data

Mock data includes:

- toy products;
- Etsy-style sellers;
- competitor activity;
- price movements;
- trend scores;
- TikTok mention counts;
- opportunity scores;
- research runs;
- generated reports.

No real scraping is performed.
No real Etsy API is called.
No real TikTok API is called.
No authentication is implemented.
No API keys are required.

## Real MVP Path

A practical production path would be:

1. Add authentication and teams.
2. Add a database for sellers, products, runs, reports, and alerts.
3. Replace mock API handlers with service-layer calls.
4. Add background jobs for research runs.
5. Add compliant marketplace and trend-data integrations.
6. Add LLM provider abstraction for the AI analyst.
7. Add billing and usage limits.
8. Add monitoring, logging, and admin tools.

## Why This Exists

This prototype is meant to help a founder evaluate direction quickly.

It shows:

- product thinking;
- SaaS interface structure;
- API boundaries;
- agent-ready workflow design;
- how real data systems can plug in later.

It intentionally avoids pretending that mock data is production intelligence.
