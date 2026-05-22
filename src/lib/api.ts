import { Competitor, Product, Report, ResearchRun, Trend } from "@/types";

type ApiResponse<T> = {
  data: T;
};

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const url = path.startsWith("http") ? path : `${baseUrl}${path}`;
  const response = await fetch(url, {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {})
    }
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${path}`);
  }

  return response.json() as Promise<T>;
}

export async function getTrends() {
  return apiFetch<ApiResponse<Trend[]> & { kpis: Record<string, number> }>("/api/trends");
}

export async function getCompetitors() {
  return apiFetch<ApiResponse<Competitor[]>>("/api/competitors");
}

export async function getProducts() {
  return apiFetch<ApiResponse<Product[]>>("/api/products");
}

export async function getReports() {
  return apiFetch<ApiResponse<Report[]>>("/api/reports");
}

export async function getResearchRuns() {
  return apiFetch<ApiResponse<ResearchRun[]>>("/api/research");
}

export async function runResearch(payload: { title: string; scope: string }) {
  return apiFetch("/api/research/run", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function analyze(question: string) {
  return apiFetch<ApiResponse<{ answer: string; citations: string[] }>>("/api/ai/analyze", {
    method: "POST",
    body: JSON.stringify({ question })
  });
}
