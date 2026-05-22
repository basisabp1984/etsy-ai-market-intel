# API Reference

All endpoints live under `/api/*`. The base URL in production is
`https://marketintel.radai-1984.dev`. In local development it is
`http://localhost:3000`.

The API is intentionally shaped so that every route handler can be swapped for a real
service later. Today every response is computed from `src/lib/mock-data.ts`.

Conventions:

- Every response is `application/json`.
- Every response is wrapped: `{ "data": ... }` (some include an extra `kpis` block).
- Every request body is JSON.
- No authentication is required. **Do not put secrets in this surface in production
  without adding an auth layer first.**

---

## `GET /api/trends`

Returns the trending-niches list and pre-computed dashboard KPIs.

**Response** — `200 OK`

```json
{
  "data": [
    {
      "id": "tr-001",
      "niche": "Montessori magnetic puzzles",
      "category": "STEM toys",
      "trendScore": 94,
      "weeklyGrowth": 28,
      "tiktokMentions": 18400,
      "opportunityScore": 91,
      "competition": "Medium",
      "avgPrice": 34.8,
      "sparkline": [54, 57, 62, 68, 71, 83, 94]
    }
  ],
  "kpis": {
    "trendingNiches": 4,
    "averagePriceMovement": 2.1,
    "competitorActivity": 2,
    "tiktokSignalScore": 87,
    "opportunityScore": 85
  }
}
```

Field types are defined in [`src/types/index.ts`](../src/types/index.ts).

---

## `GET /api/competitors`

Returns the watched-competitor snapshot — listings, average price, weekly price move,
review velocity, and risk tier per seller.

**Response** — `200 OK`

```json
{
  "data": [
    {
      "id": "c-001",
      "seller": "TinyMochiCrafts",
      "focus": "Plush charms",
      "listings": 148,
      "avgPrice": 14.8,
      "priceMove": -13.4,
      "reviewVelocity": 342,
      "activity": "Aggressive",
      "risk": "High"
    }
  ]
}
```

---

## `GET /api/products`

Returns tracked products with price, sales rank, conversion signal, and status.

**Response** — `200 OK`

```json
{
  "data": [
    {
      "id": "p-001",
      "title": "Magnetic Safari Puzzle Set",
      "niche": "Montessori magnetic puzzles",
      "seller": "BrightCub Studio",
      "price": 36.0,
      "priceChange": 7.4,
      "salesRank": 3,
      "reviews": 842,
      "conversionSignal": 91,
      "status": "Rising"
    }
  ]
}
```

---

## `GET /api/research`

Returns the research-runs ledger — scope, status, started-at, signals collected,
findings summary.

**Response** — `200 OK`

```json
{
  "data": [
    {
      "id": "rr-001",
      "title": "Weekly toy niche scan",
      "scope": "Etsy search + TikTok signals + price deltas",
      "status": "Completed",
      "startedAt": "2026-05-21 08:30",
      "signals": 1248,
      "findings": "Montessori magnetic puzzles and busy boards show the best demand-to-competition ratio."
    }
  ]
}
```

---

## `GET /api/reports`

Returns generated market reports — title, period, summary, opportunity score, date.

**Response** — `200 OK`

```json
{
  "data": [
    {
      "id": "rep-001",
      "title": "Toy Market Pulse",
      "period": "May 15-21, 2026",
      "summary": "Demand is moving toward educational toys with tactile play. Low-competition busy boards remain the strongest near-term opportunity.",
      "opportunityScore": 89,
      "createdAt": "2026-05-21"
    }
  ]
}
```

---

## `POST /api/research/run`

Mock research-run trigger. The handler fabricates a completed `ResearchRun` and
returns it together with the existing history.

**Request body**

```json
{
  "title": "Founder demo research run",
  "scope": "Top Etsy toy niches, competitor pricing, TikTok mentions"
}
```

Both fields are optional; sensible defaults are filled in.

**Response** — `200 OK`

```json
{
  "data": {
    "id": "rr-1779451355650",
    "title": "Founder demo research run",
    "scope": "Top Etsy toy niches, competitor pricing, TikTok mentions",
    "status": "Completed",
    "startedAt": "2026-05-22T12:02:35.650Z",
    "signals": 487,
    "findings": "Mock research complete. Magnetic puzzles and sensory busy boards have the strongest opportunity scores this week."
  },
  "history": [ /* existing researchRuns array */ ]
}
```

**curl**

```bash
curl -X POST https://marketintel.radai-1984.dev/api/research/run \
  -H "Content-Type: application/json" \
  -d '{"title":"Custom run","scope":"Selected niches"}'
```

---

## `POST /api/ai/analyze`

Mock AI analyst. The handler inspects the `question` for trigger keywords and
returns a templated answer over the mock dataset. The intended replacement is an LLM
with retrieval over the seller's own trends, products, and reports.

Trigger keywords currently recognized:

| Keywords in `question`                              | Answer template                                       |
|-----------------------------------------------------|-------------------------------------------------------|
| `fastest`, `growing`                                | Top-growth niche + TikTok mentions + opportunity      |
| `price drop`, `aggressive`                          | Aggressive competitors with their price moves         |
| `low competition`, `rising demand`                  | Best low-competition niche with opportunity score     |
| `report`                                            | Weekly market summary from the most recent report     |
| *(none of the above)*                               | Fallback narrative about educational tactile play     |

**Request body**

```json
{
  "question": "Which toy niche is growing fastest this week?"
}
```

**Response** — `200 OK`

```json
{
  "data": {
    "answer": "Montessori magnetic puzzles is growing fastest this week at +28%. TikTok mentions are up to 18,400 and the opportunity score is 91/100.",
    "citations": [
      "Mock Etsy product signals",
      "Mock TikTok mention velocity",
      "Mock competitor price deltas"
    ]
  }
}
```

**curl**

```bash
curl -X POST https://marketintel.radai-1984.dev/api/ai/analyze \
  -H "Content-Type: application/json" \
  -d '{"question":"Show competitors with aggressive price drops"}'
```

---

## Error handling

The current prototype trusts the inputs and never fails — there is no validation
layer because no real consequence depends on the result. In production, every
endpoint should:

- Validate the body with `zod` (or equivalent) and return `400` on malformed input.
- Authenticate the request and return `401` / `403` on missing/insufficient credentials.
- Apply per-tenant rate limits and return `429` on overrun.
- Capture exceptions to an observability tool and return `500` with a stable error code.

---

## Versioning

There is no versioned API surface yet (`/api/v1/...`). When a real backend lands, move
the existing routes under `/api/v1/` and reserve unversioned paths for redirects.
