export interface Frontmatter {
  title: string
  date: string
  author: string
  category: string
}

export interface Article {
  id: string
  frontmatter: Frontmatter
  content: string
  readingTimeMinutes: number
}
