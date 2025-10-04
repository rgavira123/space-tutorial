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

export default function useApi() {
  async function fetchArticle(id: number): Promise<Record<string, any>> {
    const res = await fetch(`/api/articles/${id}`);
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return res.json();
  }

  return { fetchArticle };
}