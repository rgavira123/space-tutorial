import express, { Request, Response } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadAllArticlesFromDisk } from './utils.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 3000

app.use(helmet())
app.use(express.json())
app.use(cors())

// Resolve the frontend content articles directory from the monorepo roo
const articlesDir = path.join(__dirname, 'static', 'content', 'articles')

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ ok: true, service: 'articles-api', time: new Date().toISOString() })
})

app.get('/api/articles/:id', (req: Request, res: Response) => {
  try {
    const articles = loadAllArticlesFromDisk(articlesDir)
    const found = articles[Number(req.params.id)]
    if (!found) return res.status(404).json({ error: 'Not found' })
    res.json(found)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to load article' })
  }
})

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})
