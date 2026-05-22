# ADR-0004 — Light premium-SaaS visual language

- **Status:** Accepted
- **Date:** 2026-05-22

## Context

The audience for MarketIntel AI is a small-business Etsy seller browsing on a laptop
or phone between order-pack runs. The visual reference is closer to Linear / Stripe /
Notion than to a trading floor.

A parallel prototype on the same stack
([harboros-logistics-intel](https://github.com/basisabp1984/harboros-logistics-intel))
ships a dark mission-control look — that fits a fleet ops manager watching multiple
data streams at once. It does **not** fit a creative entrepreneur asking "what should
I make next?"

## Decision

- Background: white canvas with a soft brand-tinted gradient on the hero block.
- Typography: dark navy ink (`text-ink` ≈ `slate-900`) on white, generous line height,
  large display headlines on hero panels.
- Color system mapped to meaning rather than to ops severity: `blue` for primary
  product/system signals, `emerald` for positive momentum, `amber` for caution,
  `red` for risk, `slate` for neutrals.
- Soft shadows (`shadow-soft`), rounded-3xl cards, friendly spacing — the SaaS
  vocabulary a seller already recognizes from Etsy seller tools and Shopify.
- Sparklines and a horizontal bar chart for opportunity ranking. No gauges, no
  pulse animations, no map — the seller doesn't operate over space, they operate
  over niches.

## Consequences

- The look is opinionated. Anyone forking the project will probably override most
  of it — fine, the tokens are in one Tailwind config and one `globals.css`.
- Side-by-side with the HarborOS prototype, this is visibly a different product on
  the same stack. That contrast is intentional: it shows how far the same scaffold
  can stretch when the audience changes.
- Accessibility: navy ink on white passes WCAG AAA. Muted text (`text-muted`)
  passes AA. Color is never the only signal — every badge carries text.
