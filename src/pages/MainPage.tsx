import Header from "../components/Header";
import LeftAd from "../components/LeftAd";
import ArticleSection from "../components/ArticleSection";
import RightAd from "../components/RightAd";
import BottomAd from "../components/BottomAd";
import { AnimatePresence } from "framer-motion";
import { useShowAds } from "../context/showAdsContext";

export default function MainPage() {

  const { showAds } = useShowAds();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar Ad */}
          <AnimatePresence>
            {showAds && <LeftAd />}
          </AnimatePresence>

          {/* Main Content */}
          {showAds ? <ArticleSection containerClassName="lg:col-span-8" /> : <ArticleSection containerClassName="lg:col-span-12" />}

          {/* Right Sidebar Ad */}
          <AnimatePresence>
            {showAds && <RightAd />}
          </AnimatePresence>
        </div>

        {/* Bottom Banner Ad */}
        <AnimatePresence>
          {showAds && <BottomAd />}
        </AnimatePresence>
      </main>
    </div>
  );
}
