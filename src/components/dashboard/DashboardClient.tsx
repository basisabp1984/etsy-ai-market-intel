"use client";

import { useEffect, useState } from "react";
import { BarChart } from "@/components/ui/BarChart";
import { Badge } from "@/components/ui/Badge";
import { MetricCard } from "@/components/ui/MetricCard";
import { Sparkline } from "@/components/ui/Sparkline";
import { formatCurrency } from "@/lib/utils";
import { Competitor, Product, Trend } from "@/types";

type DashboardData = {
  trends: Trend[];
  competitors: Competitor[];
  products: Product[];
  kpis: Record<string, number>;
};

export function DashboardClient() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function load() {
      const [trendsRes, competitorsRes, productsRes] = await Promise.all([
        fetch("/api/trends").then((res) => res.json()),
        fetch("/api/competitors").then((res) => res.json()),
        fetch("/api/products").then((res) => res.json())
      ]);

      setData({
        trends: trendsRes.data,
        competitors: competitorsRes.data,
        products: productsRes.data,
        kpis: trendsRes.kpis
      });
    }

    void load();
  }, []);

  if (!data) {
    return <div className="rounded-3xl border border-line bg-white p-8 text-sm text-muted shadow-soft">Loading mock market intelligence...</div>;
  }

  const aggressive = data.competitors.filter((item) => item.activity === "Aggressive");

  return (
    <div className="space-y-6 pb-28 lg:pb-6">
      <section className="overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-brand-50 to-white p-6 shadow-soft lg:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">AI market intelligence</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-5xl">
              Etsy toy signals, competitor moves, and niche opportunities in one operator cockpit.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              A working MVP skeleton for a future API-backed intelligence platform. Every card is powered by mock API routes.
            </p>
          </div>
          <div className="rounded-2xl border border-white bg-white/75 p-5 shadow-sm">
            <p className="text-sm font-semibold text-ink">This week&apos;s strongest read</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Tactile learning toys are pulling away. Busy boards have lower competition; magnetic puzzles have stronger growth velocity.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard label="Trending niches" value={`${data.kpis.trendingNiches}`} detail="Tracked across Etsy-style toy categories" />
        <MetricCard label="Avg. price movement" value={`+${data.kpis.averagePriceMovement}%`} detail="Seven-day blended price delta" accent="emerald" />
        <MetricCard label="Competitor activity" value={`${data.kpis.competitorActivity}`} detail="Aggressive sellers this week" accent="amber" />
        <MetricCard label="TikTok signal score" value={`${data.kpis.tiktokSignalScore}`} detail="Mention velocity and quality" accent="violet" />
        <MetricCard label="Opportunity score" value={`${data.kpis.opportunityScore}`} detail="Demand vs. competition index" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="rounded-3xl border border-line bg-white p-5 shadow-soft">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-ink">Trending Niches</h2>
              <p className="text-sm text-muted">Mock trend scores from Etsy listings and TikTok signals.</p>
            </div>
            <Badge tone="blue">Live mock API</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="py-3">Niche</th>
                  <th>Growth</th>
                  <th>Competition</th>
                  <th>Avg price</th>
                  <th>Momentum</th>
                  <th>Opportunity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {data.trends.map((trend) => (
                  <tr key={trend.id}>
                    <td className="py-4">
                      <p className="font-semibold text-ink">{trend.niche}</p>
                      <p className="text-xs text-muted">{trend.category}</p>
                    </td>
                    <td className="font-semibold text-emerald-600">+{trend.weeklyGrowth}%</td>
                    <td>
                      <Badge tone={trend.competition === "Low" ? "green" : trend.competition === "High" ? "red" : "amber"}>{trend.competition}</Badge>
                    </td>
                    <td>{formatCurrency(trend.avgPrice)}</td>
                    <td><Sparkline data={trend.sparkline} className="h-10 w-32" /></td>
                    <td className="font-bold text-ink">{trend.opportunityScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl border border-line bg-white p-5 shadow-soft">
          <h2 className="text-lg font-bold text-ink">Opportunity Ranking</h2>
          <p className="mb-5 mt-1 text-sm text-muted">Demand adjusted by competition and price room.</p>
          <BarChart items={data.trends.map((item) => ({ label: item.niche.split(" ").slice(0, 3).join(" "), value: item.opportunityScore }))} />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-line bg-white p-5 shadow-soft">
          <h2 className="text-lg font-bold text-ink">Competitor Watch</h2>
          <div className="mt-4 space-y-3">
            {aggressive.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <div>
                  <p className="font-semibold text-ink">{item.seller}</p>
                  <p className="text-sm text-muted">{item.focus}</p>
                </div>
                <Badge tone="red">{item.priceMove}% price move</Badge>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-line bg-white p-5 shadow-soft">
          <h2 className="text-lg font-bold text-ink">Products to Watch</h2>
          <div className="mt-4 space-y-3">
            {data.products.slice(0, 4).map((item) => (
              <div key={item.id} className="grid grid-cols-[1fr_auto] gap-3 rounded-2xl border border-line p-4">
                <div>
                  <p className="font-semibold text-ink">{item.title}</p>
                  <p className="text-sm text-muted">{item.seller} · {formatCurrency(item.price)}</p>
                </div>
                <Badge tone={item.status === "Rising" ? "green" : item.status === "Watching" ? "amber" : "slate"}>{item.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
