"use client";

import Link from "next/link";
import { BarChart3, FileText, LayoutDashboard, Radar, Search, Settings, Swords, X } from "lucide-react";
import { Portal } from "@/components/portals/Portal";

const actions = [
  { href: "/", label: "Open Dashboard", icon: LayoutDashboard },
  { href: "/trends", label: "Review trend signals", icon: BarChart3 },
  { href: "/competitors", label: "Inspect competitors", icon: Swords },
  { href: "/research", label: "View research runs", icon: Radar },
  { href: "/reports", label: "Read market reports", icon: FileText },
  { href: "/settings", label: "Open settings", icon: Settings }
];

export function CommandPalette({
  open,
  onClose,
  onRunResearch
}: {
  open: boolean;
  onClose: () => void;
  onRunResearch: () => void;
}) {
  if (!open) {
    return null;
  }

  return (
    <Portal>
      <div className="fixed inset-0 z-50 bg-ink/35 p-4 pt-[12vh] backdrop-blur-sm">
        <section className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
          <div className="flex items-center gap-3 border-b border-line px-5 py-4">
            <Search size={19} className="text-slate-400" />
            <input autoFocus placeholder="Type a command..." className="min-w-0 flex-1 border-0 text-sm outline-none" />
            <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-ink" aria-label="Close command palette">
              <X size={18} />
            </button>
          </div>
          <div className="p-3">
            <button
              onClick={() => {
                onRunResearch();
                onClose();
              }}
              className="mb-2 flex w-full items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-left text-sm font-semibold text-white"
            >
              <Radar size={18} />
              Run New Research
            </button>
            {actions.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-ink"
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </Portal>
  );
}
