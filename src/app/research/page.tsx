"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { researchRuns } from "@/lib/mock-data";

export default function ResearchPage() {
  const [runs] = useState(researchRuns);

  return (
    <div className="space-y-6 pb-28 lg:pb-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Agent workflow</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">Research runs</h1>
        <p className="mt-2 text-slate-500">This page models how scheduled collectors, scrapers, and LLM summarizers can be exposed in SaaS UI.</p>
      </div>
      <section className="grid gap-4">
        {runs.map((run) => (
          <article key={run.id} className="rounded-3xl border border-line bg-white p-5 shadow-soft">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-lg font-bold text-ink">{run.title}</h2>
                <p className="mt-1 text-sm text-muted">{run.scope}</p>
              </div>
              <Badge tone={run.status === "Completed" ? "green" : run.status === "Running" ? "blue" : "amber"}>{run.status}</Badge>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-sm text-muted">Started</p><p className="mt-1 font-semibold">{run.startedAt}</p></div>
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-sm text-muted">Signals</p><p className="mt-1 font-semibold">{run.signals}</p></div>
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-sm text-muted">Finding</p><p className="mt-1 text-sm leading-6">{run.findings}</p></div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
