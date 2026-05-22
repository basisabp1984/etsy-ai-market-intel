"use client";

import { useEffect, useState } from "react";
import { BarChart } from "@/components/ui/BarChart";
import { Badge } from "@/components/ui/Badge";
import { Sparkline } from "@/components/ui/Sparkline";
import { Trend } from "@/types";

export default function TrendsPage() {
  const [trends, setTrends] = useState<Trend[]>([]);

  useEffect(() => {
    void fetch("/api/trends")
      .then((res) => res.json())
      .then((res) => setTrends(res.data));
  }, []);

  return (
    <div className="space-y-6 pb-28 lg:pb-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Trend radar</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">Fast-growing toy niches</h1>
        <p className="mt-2 text-slate-500">Scores are mocked, but the screen is wired like a real API-backed market feed.</p>
      </div>
      <section className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="rounded-3xl border border-line bg-white p-5 shadow-soft">
          <div className="grid gap-4 md:grid-cols-2">
            {trends.map((trend) => (
              <article key={trend.id} className="rounded-2xl border border-line p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-bold text-ink">{trend.niche}</h2>
                    <p className="mt-1 text-sm text-muted">{trend.category}</p>
                  </div>
                  <Badge tone={trend.competition === "Low" ? "green" : trend.competition === "High" ? "red" : "amber"}>
                    {trend.competition}
                  </Badge>
                </div>
                <Sparkline data={trend.sparkline} className="mt-5 h-14 w-full" />
                <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
                  <div><p className="text-muted">Growth</p><p className="font-bold text-emerald-600">+{trend.weeklyGrowth}%</p></div>
                  <div><p className="text-muted">TikTok</p><p className="font-bold text-ink">{trend.tiktokMentions.toLocaleString()}</p></div>
                  <div><p className="text-muted">Score</p><p className="font-bold text-ink">{trend.trendScore}</p></div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <aside className="rounded-3xl border border-line bg-white p-5 shadow-soft">
          <h2 className="text-lg font-bold text-ink">TikTok Signal Score</h2>
          <p className="mb-5 mt-1 text-sm text-muted">Mock creator mention velocity by niche.</p>
          <BarChart items={trends.map((trend) => ({ label: trend.niche.split(" ").slice(0, 2).join(" "), value: trend.tiktokMentions }))} />
        </aside>
      </section>
    </div>
  );
}
