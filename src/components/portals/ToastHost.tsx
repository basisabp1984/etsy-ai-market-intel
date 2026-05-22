"use client";

import { CheckCircle2 } from "lucide-react";
import { Portal } from "@/components/portals/Portal";

export type ToastMessage = {
  id: string;
  title: string;
  body: string;
};

export function ToastHost({ toasts }: { toasts: ToastMessage[] }) {
  return (
    <Portal>
      <div className="fixed bottom-5 right-5 z-50 flex w-[min(92vw,380px)] flex-col gap-3">
        {toasts.map((toast) => (
          <div key={toast.id} className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-soft">
            <div className="flex gap-3">
              <CheckCircle2 className="mt-0.5 text-emerald-500" size={20} />
              <div>
                <p className="font-semibold text-ink">{toast.title}</p>
                <p className="mt-1 text-sm text-slate-500">{toast.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Portal>
  );
}
