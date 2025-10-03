import { TokenService } from "space-react-client";

// Simple API client for the articles backend
export interface Frontmatter {
  title: string;
  date: string;
  author: string;
  category: string;
}

export interface ArticleDTO {
  id: string;
  frontmatter: Frontmatter;
  content: string;
  readingTimeMinutes: number;
}

export interface ArticlesResponse {
  items: ArticleDTO[];
  count: number;
}

export async function fetchArticle(
  id: number,
  tokenService: TokenService
): Promise<Record<string, any>> {
  const res = await fetch(`/api/articles/${id}`);
  
  tokenService.updatePricingToken(res.headers.get("PricingToken") || "");

  return res.json();
}

export async function getSubscriptionPlan(tokenService: TokenService){
  const res = await fetch(`/api/subscription`);

  tokenService.updatePricingToken(res.headers.get("PricingToken") || "");

  return res.json();
}

export async function updateSubscription(tokenService: TokenService){
  const res = await fetch(`/api/subscription`, { method: "PUT" });

  tokenService.updatePricingToken(res.headers.get("PricingToken") || "");

  return res.json();
}