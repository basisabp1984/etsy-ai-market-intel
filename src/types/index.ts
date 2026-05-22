export type Trend = {
  id: string;
  niche: string;
  category: string;
  trendScore: number;
  weeklyGrowth: number;
  tiktokMentions: number;
  opportunityScore: number;
  competition: "Low" | "Medium" | "High";
  avgPrice: number;
  sparkline: number[];
};

export type Product = {
  id: string;
  title: string;
  niche: string;
  seller: string;
  price: number;
  priceChange: number;
  salesRank: number;
  reviews: number;
  conversionSignal: number;
  status: "Rising" | "Stable" | "Watching" | "Cooling";
};

export type Competitor = {
  id: string;
  seller: string;
  focus: string;
  listings: number;
  avgPrice: number;
  priceMove: number;
  reviewVelocity: number;
  activity: "Aggressive" | "Steady" | "Quiet";
  risk: "High" | "Medium" | "Low";
};

export type ResearchRun = {
  id: string;
  title: string;
  scope: string;
  status: "Completed" | "Running" | "Queued";
  startedAt: string;
  signals: number;
  findings: string;
};

export type Report = {
  id: string;
  title: string;
  period: string;
  summary: string;
  opportunityScore: number;
  createdAt: string;
};
