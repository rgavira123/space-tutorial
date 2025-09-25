import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NewsArticle from './components/NewsArticle'
import Advertisement from './components/Advertisement'
import AdToggle from './components/AdToggle'

function App() {
  const [showAds, setShowAds] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-3xl font-bold text-gray-900">Space News</h1>
            <AdToggle showAds={showAds} onToggle={setShowAds} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar Ad */}
          <AnimatePresence>
            {showAds && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="lg:col-span-2"
              >
                <Advertisement
                  title="Premium Space Tours"
                  description="Experience the ultimate space adventure. Book your trip to the stars today!"
                  buttonText="Book Now"
                  bgColor="bg-blue-600"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <motion.div
            layout
            transition={{ duration: 0.3 }}
            className={showAds ? "lg:col-span-8" : "lg:col-span-12"}
          >
            <NewsArticle />
          </motion.div>

          {/* Right Sidebar Ad */}
          <AnimatePresence>
            {showAds && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="lg:col-span-2"
              >
                <Advertisement
                  title="Space Equipment Sale"
                  description="Get the latest space gear with up to 50% off. Limited time offer!"
                  buttonText="Shop Now"
                  bgColor="bg-purple-600"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Banner Ad */}
        <AnimatePresence>
          {showAds && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-12"
            >
              <Advertisement
                title="Join the Space Community"
                description="Connect with fellow space enthusiasts, share discoveries, and stay updated with the latest space news and missions."
                buttonText="Join Community"
                bgColor="bg-green-600"
                layout="horizontal"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App