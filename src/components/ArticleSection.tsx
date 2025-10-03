import { motion } from "framer-motion";
import { loadAllArticles } from "../utils/articles";
import { useEffect, useMemo, useState } from "react";
import NewsArticle from "./NewsArticle";
import { useShowAds } from "../context/showAdsContext";

export default function ArticleSection() {
  const articles = useMemo(() => loadAllArticles(), []);
  const [currentIdx, setCurrentIdx] = useState(0);

  const current = articles[currentIdx % articles.length];

  const { showAds } = useShowAds();

  // Scroll to top whenever the current article changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentIdx]);

  return (
    <motion.div
      layout
      transition={{ duration: 0.3 }}
      className={`mb-12 ${showAds ? "lg:col-span-8" : "lg:col-span-12"}`}>
      {articles.length > 0 && (
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
