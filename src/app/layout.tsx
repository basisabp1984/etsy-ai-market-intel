import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { AppLayout } from "@/components/layout/AppLayout";

export const metadata: Metadata = {
  title: "MarketIntel AI for Etsy Toy Sellers",
  description: "AI market intelligence SaaS prototype for Etsy toy sellers."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppLayout>{children}</AppLayout>
        <Analytics />
      </body>
    </html>
  );
}
