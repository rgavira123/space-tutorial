import MarkdownArticle, { ParsedFrontmatter } from './MarkdownArticle'

export interface NewsArticleProps {
  frontmatter: ParsedFrontmatter
  content: string
  readingTimeMinutes: number
}

const NewsArticle = ({ frontmatter, content, readingTimeMinutes }: NewsArticleProps) => {
  return (
    <MarkdownArticle
      frontmatter={frontmatter}
      content={content}
      readingTimeMinutes={readingTimeMinutes}
    />
  )
}

export default NewsArticle