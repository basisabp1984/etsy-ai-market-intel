import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const styles = {
  blue: "bg-blue-50 text-blue-700 ring-blue-200",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  red: "bg-rose-50 text-rose-700 ring-rose-200",
  slate: "bg-slate-50 text-slate-700 ring-slate-200"
};

export function Badge({
  children,
  tone = "slate"
}: {
  children: ReactNode;
  tone?: keyof typeof styles;
}) {
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1", styles[tone])}>
      {children}
    </span>
  );
}
