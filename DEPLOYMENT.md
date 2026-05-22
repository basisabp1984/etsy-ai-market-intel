# Deployment Guide

## Recommended Presentation Setup

Use two public links:

- Live demo on Vercel;
- Public GitHub repository.

The live demo lets a founder experience the product.
The GitHub repository lets a technical reviewer inspect the architecture.

## GitHub

Create a public repository, for example:

```text
etsy-ai-market-intel
```

Then push the project:

```bash
git init
git add .
git commit -m "Build Etsy AI market intelligence SaaS prototype"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/etsy-ai-market-intel.git
git push -u origin main
```

## Vercel

1. Open Vercel.
2. Import the GitHub repository.
3. Keep the default Next.js settings.
4. Deploy.

No environment variables are required for this demo.
No API keys are required.

## Custom Domain

After the Vercel deploy works, add a custom domain in Vercel.

Good demo domain examples:

```text
marketintel.yourdomain.com
etsy-ai.yourdomain.com
etsy-demo.yourdomain.com
```

Vercel will show the DNS record to add.

Usually this is either:

```text
CNAME marketintel cname.vercel-dns.com
```

or an `A` record for the root domain, depending on the domain setup.

After DNS propagation, the demo will open on the custom domain.

## Suggested Client Message

```text
I built an API-first MVP skeleton for an AI market intelligence SaaS for Etsy toy sellers.

Live demo:
https://YOUR_DEMO_DOMAIN

GitHub:
https://github.com/YOUR_USERNAME/etsy-ai-market-intel

Notes:
- Mock data only.
- No real scraping.
- No real Etsy API.
- No TikTok API.
- No authentication.

The goal is to show the SaaS product structure, API boundaries, research-agent workflow, React Portal interactions, and where real data systems and LLMs can be connected later.
```

## Pre-Deploy Checks

Run:

```bash
npm.cmd run lint
npm.cmd run build
```

Both should pass before sharing the project.
