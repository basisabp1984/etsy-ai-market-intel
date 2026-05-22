"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText, LayoutDashboard, Radar, Settings, Swords } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/trends", label: "Trends", icon: BarChart3 },
  { href: "/competitors", label: "Competitors", icon: Swords },
  { href: "/research", label: "Research Runs", icon: Radar },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-line bg-white/80 p-5 backdrop-blur lg:block">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-sm font-black text-white">MI</div>
        <div>
          <p className="text-sm font-semibold text-ink">MarketIntel AI</p>
          <p className="text-xs text-muted">Etsy toy intelligence</p>
        </div>
      </div>
      <nav className="space-y-1">
        {nav.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                active ? "bg-brand-50 text-brand-600" : "text-slate-600 hover:bg-slate-50 hover:text-ink"
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-brand-50 to-white p-4">
        <p className="text-sm font-semibold text-ink">API-first prototype</p>
        <p className="mt-2 text-xs leading-5 text-slate-500">
          Mock routes stand in for Etsy data, TikTok trend signals, research agents, and LLM analysis.
        </p>
      </div>
    </aside>
  );
}
