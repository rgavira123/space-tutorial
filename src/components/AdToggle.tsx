import { motion } from 'framer-motion'

interface AdToggleProps {
  showAds: boolean
  onToggle: (show: boolean) => void
  text?: string
}

const AdToggle = ({ showAds, onToggle, text }: AdToggleProps) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600 font-medium">
        {showAds ? `Hide ${text ?? 'Ads'}` : `Show ${text ?? 'Ads'}`}
      </span>
      
      <button
        onClick={() => onToggle(!showAds)}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          transition-colors duration-200 ease-in-out focus:outline-none
          focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${showAds ? 'bg-blue-600' : 'bg-gray-300'}
        `}
      >
        <motion.span
          layout
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white shadow-md
            transition-transform duration-200 ease-in-out
            ${showAds ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
      
      <motion.div
        initial={false}
        animate={showAds ? { rotate: 0 } : { rotate: 180 }}
        transition={{ duration: 0.3 }}
        className="text-gray-500"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {showAds ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
            />
          )}
        </svg>
      </motion.div>
    </div>
  )
}

export default AdToggle