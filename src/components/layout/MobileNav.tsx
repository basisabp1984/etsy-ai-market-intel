"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText, LayoutDashboard, Radar, Swords } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", icon: LayoutDashboard },
  { href: "/trends", label: "Trends", icon: BarChart3 },
  { href: "/competitors", label: "Sellers", icon: Swords },
  { href: "/research", label: "Runs", icon: Radar },
  { href: "/reports", label: "Reports", icon: FileText }
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-5 rounded-3xl border border-line bg-white/90 p-2 shadow-soft backdrop-blur lg:hidden">
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} className={cn("flex flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-semibold", active ? "bg-brand-50 text-blue-600" : "text-slate-500")}>
            <Icon size={17} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
