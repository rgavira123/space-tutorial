import { useSpaceClient } from "space-react-client";

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

export default function useApi() {
  const spaceClient = useSpaceClient();

  // Minimal helper to update PricingToken and return JSON
  async function fetchJson<T = any>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
    const res = await fetch(input, init);
    spaceClient.token.update(res.headers.get("PricingToken") || "");
    return res.json();
  }

  async function fetchArticle(id: number): Promise<Record<string, any>> {
    return fetchJson(`/api/articles/${id}`);
  }

  async function getSubscriptionPlan() {
    return fetchJson(`/api/subscription`);
  }

  async function updateSubscription() {
    return fetchJson(`/api/subscription`, { method: "PUT" });
  }

  async function updateContractToLatestPricingVersion(payload) {
    return fetchJson(`/api/pricing`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }

  return {
    fetchArticle,
    getSubscriptionPlan,
    updateSubscription,
    updateContractToLatestPricingVersion
  }
}