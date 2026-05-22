import { ArrowUpRight } from "lucide-react";

export function MetricCard({
  label,
  value,
  detail,
  accent = "blue"
}: {
  label: string;
  value: string;
  detail: string;
  accent?: "blue" | "emerald" | "amber" | "violet";
}) {
  const color = {
    blue: "from-blue-500 to-sky-400",
    emerald: "from-emerald-500 to-teal-400",
    amber: "from-amber-500 to-orange-400",
    violet: "from-indigo-500 to-violet-500"
  }[accent];

  return (
    <article className="rounded-2xl border border-line bg-white/85 p-5 shadow-soft backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted">{label}</p>
          <strong className="mt-2 block text-3xl tracking-tight text-ink">{value}</strong>
        </div>
        <span className={`rounded-2xl bg-gradient-to-br ${color} p-2.5 text-white shadow-glow`}>
          <ArrowUpRight size={18} />
        </span>
      </div>
      <p className="mt-4 text-sm text-slate-500">{detail}</p>
    </article>
  );
}
