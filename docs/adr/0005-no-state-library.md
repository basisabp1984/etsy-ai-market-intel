# ADR-0005 — No client-state library yet

- **Status:** Accepted
- **Date:** 2026-05-22

## Context

Modern React apps reach for a state library (Redux, Zustand, Jotai, TanStack Query)
almost reflexively. The shape of this prototype:

- Each surface fetches its own slice in a single `useEffect` and renders.
- Cross-surface state is limited to: command-palette open, research-modal open,
  toast queue.
- All cross-surface state is held by one component — `<AppLayout />` — via local
  `useState`.

We do not yet have:

- Cache invalidation requirements across surfaces.
- Optimistic mutations that need rollback.
- Background polling.
- Mutations whose result must be reflected in another surface.

## Decision

**No client-state library is added now.** When the first real cross-surface
mutation arrives (e.g. "running a research run on the modal should also push a new
row to the Research-runs page without a reload"), we add **TanStack Query**. Not
Redux. Not Zustand.

Rationale for TanStack Query specifically (when the time comes): the API is a
server-state cache, not a client-state machine. TanStack Query is the right tool
for that shape. Redux/Zustand solve a different problem (cross-component shared
*client* state), which this app barely has.

## Consequences

- Today, each surface is independent. A fetch on Dashboard and a fetch on Trends
  hit `/api/trends` twice if the user navigates between them. In the prototype
  this is irrelevant (in-process, sub-millisecond).
- The day cross-surface mutations land, expect a focused PR introducing TanStack
  Query and converting `useEffect` calls to `useQuery`. The route-handler shape
  doesn't change.
- We avoid the common anti-pattern of "we installed a state library because that's
  what React apps do" — and the bloat that follows.
