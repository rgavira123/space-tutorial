import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import NewsArticle from "./NewsArticle";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import { ArticleDTO, fetchArticle } from "../services/api";
import { usePricingToken } from "space-react-client";

export default function ArticleSection({containerClassName}: {containerClassName?: string}) {
  const [article, setArticle] = useState<ArticleDTO | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tokenService = usePricingToken();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [currentIdx]);

  useEffect(() => {
    setLoading(true);
    fetchArticle(currentIdx, tokenService)
      .then((data) => {
        if (data.error){
          throw new Error(data.error);
        }

        setArticle(data as ArticleDTO);
        setError(null);
      })
      .catch((e) => {
        setError(e?.message || "Failed to load articles");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentIdx]);

  return (
    <motion.div
      layout
      transition={{ duration: 0.3 }}
      className={`mb-12 ${containerClassName}`}>
      {loading && <Loading label="Loading articles…" />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && article && (
        <>
          <NewsArticle
            frontmatter={{
              title: article.frontmatter.title,
              date: article.frontmatter.date,
              author: article.frontmatter.author,
              category: article.frontmatter.category,
            }}
            content={article.content}
            readingTimeMinutes={article.readingTimeMinutes}
          />

          <div className="flex justify-end mt-6">
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setCurrentIdx((i) => (i + 1) % 5)}
              className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium shadow-sm">
              Load another article
            </motion.button>
          </div>
        </>
      )}
    </motion.div>
  );
}
