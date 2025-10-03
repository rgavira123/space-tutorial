// Simple API client for the articles backend
export interface Frontmatter {
  title: string
  date: string
  author: string
  category: string
}

export interface ArticleDTO {
  id: string
  frontmatter: Frontmatter
  content: string
  readingTimeMinutes: number
}

export interface ArticlesResponse {
  items: ArticleDTO[]
  count: number
}

const BASE = typeof window !== 'undefined' ? '' : process.env.API_BASE_URL || 'http://localhost:5174'

export async function fetchArticles(): Promise<ArticleDTO[]> {
  const res = await fetch(`${BASE}/api/articles`)
  if (!res.ok) throw new Error(`API error ${res.status}`)
  const data: ArticlesResponse = await res.json()
console.log('Fetched articles:', data);
  return data.items
}

export async function fetchArticle(id: string): Promise<ArticleDTO> {
  const res = await fetch(`${BASE}/api/articles/${id}`)
  if (!res.ok) throw new Error(`API error ${res.status}`)
  return res.json()
}
