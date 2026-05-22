import { Badge } from "@/components/ui/Badge";

const integrations = [
  ["Etsy API", "Mocked", "Future OAuth + listing analytics"],
  ["TikTok Signals", "Mocked", "Future creator and hashtag collectors"],
  ["Research Agents", "Mocked", "Future queues, schedulers, and run logs"],
  ["LLM Analyst", "Mocked", "Future provider abstraction and prompt registry"]
];

export default function SettingsPage() {
  return (
    <div className="space-y-6 pb-28 lg:pb-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Platform setup</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">Settings</h1>
        <p className="mt-2 text-slate-500">No real keys are used. These controls document how the MVP can connect real systems later.</p>
      </div>
      <section className="rounded-3xl border border-line bg-white p-5 shadow-soft">
        <h2 className="text-lg font-bold text-ink">Integration readiness</h2>
        <div className="mt-4 grid gap-4">
          {integrations.map(([name, status, note]) => (
            <div key={name} className="flex flex-col gap-3 rounded-2xl border border-line p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-ink">{name}</p>
                <p className="mt-1 text-sm text-muted">{note}</p>
              </div>
              <Badge tone="amber">{status}</Badge>
            </div>
          ))}
        </div>
      </section>
      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-line bg-white p-5 shadow-soft">
          <h2 className="text-lg font-bold text-ink">Alert preferences</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <label className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">Price drop alerts <input type="checkbox" defaultChecked /></label>
            <label className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">TikTok velocity spikes <input type="checkbox" defaultChecked /></label>
            <label className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">Weekly opportunity report <input type="checkbox" defaultChecked /></label>
          </div>
        </div>
        <div className="rounded-3xl border border-line bg-white p-5 shadow-soft">
          <h2 className="text-lg font-bold text-ink">API posture</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            The demo keeps API contracts separate from the UI. Replace mock route handlers with database reads, external API calls,
            background job state, and LLM providers without rewriting the screens.
          </p>
        </div>
      </section>
    </div>
  );
}
