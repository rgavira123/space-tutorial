import { motion } from 'framer-motion'

const NewsArticle = () => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="relative h-96 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 mx-auto mb-4 border-4 border-white border-t-transparent rounded-full"
            ></motion.div>
            <p className="text-lg font-semibold">Space Image Placeholder</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
              Space Exploration
            </span>
            <time>March 15, 2024</time>
            <span>By Space Reporter</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Revolutionary Discovery: Scientists Find Evidence of Water Ice Beneath Mars Surface
          </h1>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
              irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>

            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
              eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam 
              voluptatem quia voluptas sit aspernatur aut odit aut fugit.
            </p>

            <blockquote className="border-l-4 border-blue-500 pl-6 py-2 bg-blue-50 rounded-r-lg">
              <p className="text-lg italic text-blue-900">
                "This discovery represents a significant step forward in our understanding of Mars and its potential to support life."
              </p>
              <footer className="text-blue-700 font-medium mt-2">- Dr. Sarah Mitchell, Lead Researcher</footer>
            </blockquote>

            <p>
              But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you 
              a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder 
              of human happiness.
            </p>

            <p>
              No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue 
              pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or 
              desires to obtain pain of itself, because it is pain.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Findings</h2>

            <ul className="list-disc list-inside space-y-2">
              <li>Large deposits of water ice discovered 10 meters below the Martian surface</li>
              <li>Ice formations span across multiple geographical regions</li>
              <li>Estimated volume sufficient to fill Earth's Great Lakes</li>
              <li>Potential implications for future Mars colonization efforts</li>
            </ul>

            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti 
              quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia 
              deserunt mollitia animi.
            </p>

            <p>
              Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint 
              et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores 
              alias consequatur aut perferendis doloribus asperiores repellat.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Share this article:</span>
                <div className="flex gap-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    Twitter
                  </button>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    Facebook
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    WhatsApp
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Reading time: 5 min
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.article>
  )
}

export default NewsArticle