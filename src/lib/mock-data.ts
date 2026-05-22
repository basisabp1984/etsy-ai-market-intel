import { Competitor, Product, Report, ResearchRun, Trend } from "@/types";

export const trends: Trend[] = [
  {
    id: "tr-001",
    niche: "Montessori magnetic puzzles",
    category: "STEM toys",
    trendScore: 94,
    weeklyGrowth: 28,
    tiktokMentions: 18400,
    opportunityScore: 91,
    competition: "Medium",
    avgPrice: 34.8,
    sparkline: [54, 57, 62, 68, 71, 83, 94]
  },
  {
    id: "tr-002",
    niche: "Miniature plush keychains",
    category: "Collectibles",
    trendScore: 89,
    weeklyGrowth: 22,
    tiktokMentions: 31200,
    opportunityScore: 78,
    competition: "High",
    avgPrice: 16.4,
    sparkline: [61, 59, 66, 72, 79, 84, 89]
  },
  {
    id: "tr-003",
    niche: "Wooden sensory busy boards",
    category: "Toddler toys",
    trendScore: 86,
    weeklyGrowth: 19,
    tiktokMentions: 9600,
    opportunityScore: 88,
    competition: "Low",
    avgPrice: 48.2,
    sparkline: [48, 55, 57, 61, 70, 78, 86]
  },
  {
    id: "tr-004",
    niche: "DIY felt story kits",
    category: "Creative play",
    trendScore: 80,
    weeklyGrowth: 14,
    tiktokMentions: 7300,
    opportunityScore: 84,
    competition: "Low",
    avgPrice: 27.9,
    sparkline: [50, 52, 58, 63, 69, 74, 80]
  }
];

export const products: Product[] = [
  { id: "p-001", title: "Magnetic Safari Puzzle Set", niche: "Montessori magnetic puzzles", seller: "BrightCub Studio", price: 36.0, priceChange: 7.4, salesRank: 3, reviews: 842, conversionSignal: 91, status: "Rising" },
  { id: "p-002", title: "Personalized Busy Board", niche: "Wooden sensory busy boards", seller: "LittleOrbit Toys", price: 52.5, priceChange: 4.1, salesRank: 7, reviews: 531, conversionSignal: 88, status: "Rising" },
  { id: "p-003", title: "Kawaii Pocket Plush Charm", niche: "Miniature plush keychains", seller: "TinyMochiCrafts", price: 14.2, priceChange: -11.8, salesRank: 1, reviews: 2190, conversionSignal: 82, status: "Watching" },
  { id: "p-004", title: "Felt Farm Story Kit", niche: "DIY felt story kits", seller: "StoryNest Handmade", price: 29.0, priceChange: 3.2, salesRank: 12, reviews: 318, conversionSignal: 79, status: "Stable" },
  { id: "p-005", title: "Space STEM Peg Dolls", niche: "STEM pretend play", seller: "MoonSprout", price: 31.5, priceChange: 8.9, salesRank: 18, reviews: 206, conversionSignal: 74, status: "Rising" }
];

export const competitors: Competitor[] = [
  { id: "c-001", seller: "TinyMochiCrafts", focus: "Plush charms", listings: 148, avgPrice: 14.8, priceMove: -13.4, reviewVelocity: 342, activity: "Aggressive", risk: "High" },
  { id: "c-002", seller: "BrightCub Studio", focus: "Magnetic puzzles", listings: 42, avgPrice: 35.6, priceMove: 5.2, reviewVelocity: 118, activity: "Steady", risk: "Medium" },
  { id: "c-003", seller: "LittleOrbit Toys", focus: "Busy boards", listings: 29, avgPrice: 51.2, priceMove: 3.8, reviewVelocity: 76, activity: "Steady", risk: "Medium" },
  { id: "c-004", seller: "CraftyPebbleKids", focus: "Felt kits", listings: 61, avgPrice: 25.4, priceMove: -7.9, reviewVelocity: 54, activity: "Aggressive", risk: "Medium" },
  { id: "c-005", seller: "MoonSprout", focus: "STEM pretend play", listings: 18, avgPrice: 32.1, priceMove: 1.2, reviewVelocity: 31, activity: "Quiet", risk: "Low" }
];

export const researchRuns: ResearchRun[] = [
  { id: "rr-001", title: "Weekly toy niche scan", scope: "Etsy search + TikTok signals + price deltas", status: "Completed", startedAt: "2026-05-21 08:30", signals: 1248, findings: "Montessori magnetic puzzles and busy boards show the best demand-to-competition ratio." },
  { id: "rr-002", title: "Competitor price movement", scope: "Top 50 Etsy sellers in selected toy niches", status: "Completed", startedAt: "2026-05-20 15:10", signals: 690, findings: "Two plush charm sellers cut prices by more than 10%, likely testing bundle volume." },
  { id: "rr-003", title: "TikTok phrase discovery", scope: "Creator captions and toy unboxing hashtags", status: "Running", startedAt: "2026-05-22 12:40", signals: 312, findings: "Collecting creator velocity and mention quality." }
];

export const reports: Report[] = [
  { id: "rep-001", title: "Toy Market Pulse", period: "May 15-21, 2026", summary: "Demand is moving toward educational toys with tactile play. Low-competition busy boards remain the strongest near-term opportunity.", opportunityScore: 89, createdAt: "2026-05-21" },
  { id: "rep-002", title: "Competitor Pricing Watch", period: "May 8-14, 2026", summary: "Plush accessories are crowded and discount-heavy. Premium puzzle sets can hold price if listings show strong personalization.", opportunityScore: 76, createdAt: "2026-05-14" },
  { id: "rep-003", title: "TikTok Signal Brief", period: "May 1-7, 2026", summary: "Unboxing videos are driving discovery. Creator-led phrases around calm play and travel toys are rising.", opportunityScore: 81, createdAt: "2026-05-07" }
];

export const kpis = {
  trendingNiches: trends.length,
  averagePriceMovement: 2.1,
  competitorActivity: competitors.filter((item) => item.activity === "Aggressive").length,
  tiktokSignalScore: 87,
  opportunityScore: Math.round(trends.reduce((sum, item) => sum + item.opportunityScore, 0) / trends.length)
};
