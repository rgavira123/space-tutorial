import fs from 'node:fs'
import path from 'node:path'
import { Article, Frontmatter } from './types.js'
import { SpaceClient } from 'space-node-client';

// Parse simple YAML-like frontmatter
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
        const cleaned = value.replace(/^['"]|['"]$/g, '')
        ;(frontmatter as any)[key] = cleaned
      }
    })
  }

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

export function loadAllArticlesFromDisk(contentDir: string): Article[] {
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'))
  const entries: Article[] = files.map((file) => {
    const full = path.join(contentDir, file)
    const raw = fs.readFileSync(full, 'utf8')
    const { frontmatter, content } = parseFrontmatter(raw)
    const id = path.basename(file, '.md')
    const readingTimeMinutes = estimateReadingTimeMinutes(content)
    return { id, frontmatter, content, readingTimeMinutes }
  })

  entries.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
  return entries
}

export function resetContractUsageLevels(userId: string, spaceClient: SpaceClient){
  return fetch(`${spaceClient.httpUrl}/contracts/${userId}/usageLevels?reset=true`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': spaceClient.apiKey,
    },
  })
}