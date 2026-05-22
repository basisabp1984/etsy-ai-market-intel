"use client";

import { Keyboard, Search } from "lucide-react";

export function Topbar({ onCommand }: { onCommand: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/75 px-4 py-3 backdrop-blur-xl lg:px-8">
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onCommand}
          className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-line bg-white px-4 py-2.5 text-left text-sm text-muted shadow-sm transition hover:border-blue-200 hover:shadow"
        >
          <Search size={18} />
          <span className="truncate">Search trends, sellers, reports...</span>
          <span className="ml-auto hidden items-center gap-1 rounded-lg bg-slate-100 px-2 py-1 text-xs text-slate-500 sm:flex">
            <Keyboard size={13} />
            Ctrl K
          </span>
        </button>
        <div className="flex items-center gap-3 rounded-2xl border border-line bg-white px-3 py-2 shadow-sm">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-ink">Demo Founder</p>
            <p className="text-xs text-muted">Growth operator</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 text-sm font-bold text-white">
            DF
          </div>
        </div>
      </div>
    </header>
  );
}
