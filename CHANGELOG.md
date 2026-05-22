# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.1] — 2026-05-22

### Added

- `GET /api/research` endpoint that returns the research-runs ledger.

### Changed

- Research-runs page now fetches via `/api/research` instead of importing the mock
  module directly. This restores the API-first invariant across every surface — no
  page imports `mock-data.ts` anymore.
- Documentation (`README`, `TECHNICAL_BRIEF`) reflects the new endpoint.

## [0.1.0] — 2026-05-22

Initial prototype release.

### Added

- Next.js 16 App Router project with React 19, TypeScript 5, Tailwind CSS 3.
- Six operator surfaces: Dashboard, Trends, Competitors, Research runs, Reports, Settings.
- Six mock API route handlers:
  - `GET /api/trends`, `GET /api/competitors`, `GET /api/products`, `GET /api/reports`
  - `POST /api/research/run`, `POST /api/ai/analyze`
- Four React Portal interactions:
  - Floating AI Analyst chat panel
  - Run-New-Research modal
  - Command palette (`Ctrl+K`)
  - Toast host for research-completion notifications
- Mock dataset: 4 trends, 5 products, 5 competitors, 3 reports, 3 research runs with
  dashboard KPIs.
- Light premium-SaaS visual language: white background, navy ink text, soft shadows,
  blue/cyan/emerald/amber accent system, sparklines, bar chart, KPI tiles.
- Documentation: README, TECHNICAL_BRIEF, DEPLOYMENT.
- GitHub repository connected to Vercel; live custom domain
  [`marketintel.radai-1984.dev`](https://marketintel.radai-1984.dev).

### Out of scope (intentionally)

- No real Etsy / TikTok API integration.
- No real scraping, no authentication, no database, no LLM provider.
- No background jobs, no queues.
- No tests beyond manual smoke checks.

[Unreleased]: https://github.com/basisabp1984/etsy-ai-market-intel/compare/v0.1.1...HEAD
[0.1.1]: https://github.com/basisabp1984/etsy-ai-market-intel/releases/tag/v0.1.1
[0.1.0]: https://github.com/basisabp1984/etsy-ai-market-intel/releases/tag/v0.1.0
