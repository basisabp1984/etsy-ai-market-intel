"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";
import { Competitor, Product } from "@/types";

export default function CompetitorsPage() {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    void Promise.all([fetch("/api/competitors").then((res) => res.json()), fetch("/api/products").then((res) => res.json())]).then(
      ([competitorsRes, productsRes]) => {
        setCompetitors(competitorsRes.data);
        setProducts(productsRes.data);
      }
    );
  }, []);

  return (
    <div className="space-y-6 pb-28 lg:pb-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Competitive intelligence</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">Seller activity and price moves</h1>
        <p className="mt-2 text-slate-500">A future backend can replace this with Etsy listing monitors and alerting rules.</p>
      </div>
      <section className="rounded-3xl border border-line bg-white p-5 shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="py-3">Seller</th>
                <th>Focus</th>
                <th>Listings</th>
                <th>Avg price</th>
                <th>Price move</th>
                <th>Review velocity</th>
                <th>Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {competitors.map((item) => (
                <tr key={item.id}>
                  <td className="py-4 font-semibold text-ink">{item.seller}</td>
                  <td>{item.focus}</td>
                  <td>{item.listings}</td>
                  <td>{formatCurrency(item.avgPrice)}</td>
                  <td className={item.priceMove < 0 ? "font-semibold text-rose-600" : "font-semibold text-emerald-600"}>
                    {item.priceMove > 0 ? "+" : ""}{item.priceMove}%
                  </td>
                  <td>{item.reviewVelocity}/week</td>
                  <td><Badge tone={item.risk === "High" ? "red" : item.risk === "Medium" ? "amber" : "green"}>{item.risk}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="rounded-3xl border border-line bg-white p-5 shadow-soft">
        <h2 className="text-lg font-bold text-ink">Products by tracked sellers</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article key={product.id} className="rounded-2xl border border-line p-4">
              <p className="font-semibold text-ink">{product.title}</p>
              <p className="mt-1 text-sm text-muted">{product.seller}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold">{formatCurrency(product.price)}</span>
                <Badge tone={product.status === "Rising" ? "green" : product.status === "Watching" ? "amber" : "slate"}>{product.status}</Badge>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
