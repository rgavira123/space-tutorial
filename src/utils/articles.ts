// Utilities to load and parse markdown articles at build/runtime using Vite's import.meta.glob
// - Parses simple YAML-like frontmatter
// - Estimates reading time
// - Provides typed Article objects

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

// Naive frontmatter parser for simple key: value pairs surrounded by --- delimiters
export function parseFrontmatter(raw: string): { frontmatter: Frontmatter; content: string } {
  const fmRegex = /^---\n([\s\S]*?)\n---\n?/ // matches leading frontmatter block
  const match = raw.match(fmRegex)
  let frontmatter: Partial<Frontmatter> = {}
  let body = raw

  if (match) {
    const fmBlock = match[1]
    body = raw.slice(match[0].length)

    fmBlock.split(/\r?\n/).forEach((line) => {
      const idx = line.indexOf(':')
      if (idx !== -1) {
        const key = line.slice(0, idx).trim() as keyof Frontmatter
        const value = line.slice(idx + 1).trim()
        // Remove optional surrounding quotes
        const cleaned = value.replace(/^['"]|['"]$/g, '')
        ;(frontmatter as any)[key] = cleaned
      }
    })
  }

  // Sensible fallbacks to avoid runtime errors
  const safeFrontmatter: Frontmatter = {
    title: frontmatter.title || 'Untitled',
    date: frontmatter.date || new Date().toISOString(),
    author: frontmatter.author || 'Unknown',
    category: frontmatter.category || 'General',
  }

  return { frontmatter: safeFrontmatter, content: body.trim() }
}

export function estimateReadingTimeMinutes(text: string, wordsPerMinute = 200): number {
  const words = text.trim().split(/\s+/).filter(Boolean)
  const minutes = Math.max(1, Math.ceil(words.length / wordsPerMinute))
  return minutes
}

export function loadAllArticles(): Article[] {
  // Eagerly import raw markdown files. Keys are absolute paths during dev/build.
  const modules = import.meta.glob('/src/content/articles/*.md', { as: 'raw', eager: true }) as Record<string, string>
  const entries: Article[] = Object.entries(modules).map(([path, raw]) => {
    const { frontmatter, content } = parseFrontmatter(raw)
    const id = path.split('/').pop()?.replace('.md', '') || Math.random().toString(36).slice(2)
    const readingTimeMinutes = estimateReadingTimeMinutes(content)
    return { id, frontmatter, content, readingTimeMinutes }
  })

  // Sort by date descending if possible
  entries.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
  return entries
}
