# Contributing to MarketIntel AI

Thanks for taking a look. This file covers how to work on the code if you want to
extend the prototype or use it as a starting point for a real product.

## Local development

```bash
git clone https://github.com/basisabp1984/etsy-ai-market-intel.git
cd etsy-ai-market-intel
npm install
npm run dev
```

Open `http://localhost:3000`.

## Before opening a pull request

All three checks below must pass clean:

```bash
npm run lint              # eslint-config-next, --max-warnings=0
npm run build             # production build, fails on type or compile errors
bash scripts/smoke.sh     # hits every API endpoint and every page
```

The smoke script defaults to `http://localhost:3000` — start the dev server
first with `npm run dev`, then run it. You can also point it at a deployed
URL for post-deploy validation:

```bash
bash scripts/smoke.sh https://marketintel.radai-1984.dev
```

For curl-by-curl exploration of a single endpoint, see [`docs/API.md`](docs/API.md).

## Code conventions

- **TypeScript strict.** No `any`. Use the shared types in
  [`src/types/index.ts`](src/types/index.ts) instead of inlining.
- **Server vs client components.** Default to server components. Add `"use client"`
  only when you need state, effects, browser APIs, or event handlers.
- **No direct imports from `mock-data.ts` outside of `app/api/*`.** This is the
  API-first invariant — see [ADR-0002](docs/adr/0002-api-first-mock-layer.md).
- **Tailwind tokens** for theming. New colors go in
  [`tailwind.config.ts`](tailwind.config.ts) first.
- **Icons** come from `lucide-react`. Match the existing line weight in the codebase.

## Folder boundaries

- `src/app/` — routes (pages + API handlers). One folder per route segment.
- `src/components/layout/` — frame shell (Sidebar, Topbar, MobileNav, AppLayout).
- `src/components/dashboard/` — dashboard composition.
- `src/components/portals/` — anything that uses `createPortal`.
- `src/components/ui/` — pure presentational primitives (no fetching, no state).
- `src/lib/` — mock data, API client, formatting helpers.
- `src/types/` — shared TS types.

When in doubt, put a component **lower** in this hierarchy rather than higher.
Layout shells should not reach into dashboard internals, and the dashboard should
not reach into portal internals.

## Commit style

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) prefixes:

| Prefix     | When                                                            |
|------------|-----------------------------------------------------------------|
| `feat:`    | New user-visible feature or new API endpoint                    |
| `fix:`     | Bug fix                                                         |
| `docs:`    | Docs only (README, docs/, CHANGELOG, ADRs)                      |
| `refactor:`| Code change without behavior change                             |
| `style:`   | Formatting only                                                 |
| `test:`    | Tests only                                                      |
| `chore:`   | Dependencies, config, tooling                                   |
| `perf:`    | Performance work                                                |

Subject under 70 characters, imperative mood. Body explains *why* if the diff doesn't.

## Adding a new surface

1. Create `src/app/<surface>/page.tsx` — start as a client component with a single
   `useEffect` fetch.
2. If the surface needs a new domain object, add the type to
   `src/types/index.ts` and a slice to `src/lib/mock-data.ts`.
3. Add a route handler under `src/app/api/<surface>/route.ts`.
4. Wire the surface into the sidebar
   ([`Sidebar.tsx`](src/components/layout/Sidebar.tsx)) and mobile nav
   ([`MobileNav.tsx`](src/components/layout/MobileNav.tsx)).
5. Add an entry to the command palette
   ([`CommandPalette.tsx`](src/components/portals/CommandPalette.tsx)).
6. Update [`docs/API.md`](docs/API.md) with the new endpoint.
7. Add a CHANGELOG entry under `[Unreleased]`.

## Adding a real provider integration

This is the moment to read [ADR-0002](docs/adr/0002-api-first-mock-layer.md). The
contract: route handlers are the only place that touches data sources. Replace the
body of `app/api/<surface>/route.ts` — do not change the page or its types.

Secrets go through `process.env`. Add them in the Vercel project settings, not in
`.env.local` (which must never be committed).

## Documentation

When you ship a non-trivial change:

- Update [`CHANGELOG.md`](CHANGELOG.md) under `[Unreleased]`.
- If you make a decision that future readers might second-guess, write a short ADR in
  `docs/adr/` following the existing format.
- If you change the API surface, update [`docs/API.md`](docs/API.md).
