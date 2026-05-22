"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { MobileNav } from "@/components/layout/MobileNav";
import { AiAnalystPanel } from "@/components/portals/AiAnalystPanel";
import { CommandPalette } from "@/components/portals/CommandPalette";
import { ResearchModal } from "@/components/portals/ResearchModal";
import { ToastHost, ToastMessage } from "@/components/portals/ToastHost";

export function AppLayout({ children }: { children: ReactNode }) {
  const [commandOpen, setCommandOpen] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const pushToast = useCallback((message: Omit<ToastMessage, "id">) => {
    const id = crypto.randomUUID();
    setToasts((items) => [...items, { id, ...message }]);
    window.setTimeout(() => setToasts((items) => items.filter((item) => item.id !== id)), 4200);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <Topbar onCommand={() => setCommandOpen(true)} />
        <main className="px-4 py-6 lg:px-8">{children}</main>
      </div>
      <MobileNav />
      <AiAnalystPanel />
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} onRunResearch={() => setResearchOpen(true)} />
      <ResearchModal
        open={researchOpen}
        onClose={() => setResearchOpen(false)}
        onComplete={() => pushToast({ title: "Research completed", body: "Mock agent run found 487 fresh signals across toy niches." })}
      />
      <ToastHost toasts={toasts} />
    </div>
  );
}
