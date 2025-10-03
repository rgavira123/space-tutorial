import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export interface ParsedFrontmatter {
  title: string
  date: string
  author: string
  category: string
}

export interface MarkdownArticleProps {
  frontmatter: ParsedFrontmatter
  content: string
  readingTimeMinutes: number
}

const MarkdownArticle = ({ frontmatter, content, readingTimeMinutes }: MarkdownArticleProps) => {
  const { title, date, author, category } = frontmatter

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="relative h-56 sm:h-72 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              {title}
            </h1>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-4 mb-6 text-sm text-gray-600 flex-wrap">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
            {category}
          </span>
          <time>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
          <span>By {author}</span>
          <span className="ml-auto text-gray-600">Reading time: {readingTimeMinutes} min</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </motion.div>
      </div>
    </motion.article>
  )
}

export default MarkdownArticle