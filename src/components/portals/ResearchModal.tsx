"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Portal } from "@/components/portals/Portal";
import { runResearch } from "@/lib/api";

export function ResearchModal({
  open,
  onClose,
  onComplete
}: {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [scope, setScope] = useState("Top Etsy toy niches, competitor pricing, TikTok mentions");

  if (!open) {
    return null;
  }

  async function submit() {
    setLoading(true);
    await runResearch({ title: "Founder demo research run", scope });
    setLoading(false);
    onComplete();
    onClose();
  }

  return (
    <Portal>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/35 p-4 backdrop-blur-sm">
        <section className="w-full max-w-xl rounded-3xl border border-line bg-white p-6 shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Research agent</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">Run New Research</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                This simulates an API-first research workflow. Later this action can trigger scraping jobs, enrichment queues,
                database writes, and LLM summaries.
              </p>
            </div>
            <button onClick={onClose} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-ink" aria-label="Close modal">
              <X size={20} />
            </button>
          </div>
          <label className="mt-6 block text-sm font-semibold text-slate-700">Research scope</label>
          <textarea
            value={scope}
            onChange={(event) => setScope(event.target.value)}
            className="mt-2 min-h-28 w-full resize-none rounded-2xl border border-line p-4 text-sm outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
          />
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button onClick={onClose} className="rounded-xl border border-line px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
              Cancel
            </button>
            <button
              onClick={submit}
              disabled={loading}
              className="rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-900 disabled:opacity-60"
            >
              {loading ? "Running..." : "Start mock run"}
            </button>
          </div>
        </section>
      </div>
    </Portal>
  );
}
