import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import NewsArticle from "./NewsArticle";
import { useShowAds } from "../context/showAdsContext";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import { fetchArticles, ArticleDTO } from "../services/api";

export default function ArticleSection() {
  const [articles, setArticles] = useState<ArticleDTO[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const current = useMemo(() => (articles.length ? articles[currentIdx % articles.length] : null), [articles, currentIdx]);

  const { showAds } = useShowAds();

  // Scroll to top whenever the current article changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentIdx]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const data = await fetchArticles();
        if (!cancelled) {
          setArticles(data);
          setError(null);
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load articles");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <motion.div
      layout
      transition={{ duration: 0.3 }}
      className={`mb-12 ${showAds ? "lg:col-span-8" : "lg:col-span-12"}`}>
      {loading && <Loading label="Loading articles…" />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && articles.length > 0 && current && (
        <>
          <NewsArticle
            frontmatter={{
              title: current.frontmatter.title,
              date: current.frontmatter.date,
              author: current.frontmatter.author,
              category: current.frontmatter.category,
            }}
            content={current.content}
            readingTimeMinutes={current.readingTimeMinutes}
          />

          <div className="flex justify-end mt-6">
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setCurrentIdx((i) => (i + 1) % articles.length)}
              className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium shadow-sm">
              Load another article
            </motion.button>
          </div>
        </>
      )}
    </motion.div>
  );
}
