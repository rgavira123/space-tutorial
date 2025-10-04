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

export async function fetchArticle(
  id: number,
  spaceClient: SpaceClient
): Promise<Record<string, any>> {
  const res = await fetch(`/api/articles/${id}`);

  spaceClient.token.update(res.headers.get("PricingToken") || "");

  return res.json();
}

export async function getSubscriptionPlan(spaceClient: SpaceClient) {
  const res = await fetch(`/api/subscription`);

  spaceClient.token.update(res.headers.get("PricingToken") || "");

  return res.json();
}

export async function updateSubscription(spaceClient: SpaceClient) {
  const res = await fetch(`/api/subscription`, { method: "PUT" });

  spaceClient.token.update(res.headers.get("PricingToken") || "");

  return res.json();
}

export async function updateContractToLatestPricingVersion(
  spaceClient: SpaceClient,
  payload
) {
  const res = await fetch(`/api/pricing`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  spaceClient.token.update(res.headers.get("PricingToken") || "");

  return res.json();
}
