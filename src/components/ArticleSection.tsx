import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import NewsArticle from "./NewsArticle";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import useApi, { ArticleDTO } from "../hooks/useApi";
import { usePricingTokenPayload, useSpaceClient } from "space-react-client";
import { FiFileText } from "react-icons/fi";

export default function ArticleSection({
  containerClassName,
}: {
  containerClassName?: string;
}) {
  const [article, setArticle] = useState<ArticleDTO | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tokenPayload = usePricingTokenPayload();
  const { fetchArticle } = useApi();
  
  const used =
    tokenPayload?.features?.["news-news"]?.used?.["news-maxNews"] ?? 0;
  const limit =
    tokenPayload?.features?.["news-news"]?.limit?.["news-maxNews"] ?? 0;

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [currentIdx, tokenPayload]);

  useEffect(() => {
    setLoading(true);
    fetchArticle(currentIdx)
      .then((data) => {
        if (data.error) {
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
            {tokenPayload && (
              <motion.div
                key={used}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mr-3 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-3 py-1 text-xs font-medium text-indigo-700 shadow-sm"
                aria-label={`News used ${used} out of ${limit}`}>
                <FiFileText className="h-3.5 w-3.5" />
                <span>
                  <span className="text-sm font-semibold">{used}</span>
                  <span className="opacity-70">/{limit}</span>
                </span>
              </motion.div>
            )}
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
