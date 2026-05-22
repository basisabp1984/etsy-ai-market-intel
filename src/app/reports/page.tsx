"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Report } from "@/types";

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    void fetch("/api/reports")
      .then((res) => res.json())
      .then((res) => setReports(res.data));
  }, []);

  return (
    <div className="space-y-6 pb-28 lg:pb-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Executive summaries</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">Generated market reports</h1>
        <p className="mt-2 text-slate-500">Mock report cards show where a real LLM summary layer would surface findings.</p>
      </div>
      <section className="grid gap-5 xl:grid-cols-3">
        {reports.map((report) => (
          <article key={report.id} className="rounded-3xl border border-line bg-white p-6 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-ink">{report.title}</h2>
                <p className="mt-1 text-sm text-muted">{report.period}</p>
              </div>
              <Badge tone="blue">{report.opportunityScore}</Badge>
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-600">{report.summary}</p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Created {report.createdAt}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
