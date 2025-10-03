import { SpaceClient, TokenService } from "space-react-client";

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

const BASE =
  typeof window !== "undefined"
    ? ""
    : process.env.API_BASE_URL || "http://localhost:5174";

export async function fetchArticles(
  tokenService: TokenService
): Promise<ArticleDTO[]> {
  const res = await fetch(`${BASE}/api/articles`);

  tokenService.updatePricingToken(res.headers.get("PricingToken") || "");
  
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data: ArticlesResponse = await res.json();


  return data.items;
}

export async function fetchArticle(
  id: number,
  tokenService: TokenService
): Promise<Record<string, any>> {
  const res = await fetch(`${BASE}/api/articles/${id}`);
  
  tokenService.updatePricingToken(res.headers.get("PricingToken") || "");

  return res.json();
}
