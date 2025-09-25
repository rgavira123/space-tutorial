import { motion } from 'framer-motion'

interface AdvertisementProps {
  title: string
  description: string
  buttonText: string
  bgColor: string
  layout?: 'vertical' | 'horizontal'
}

const Advertisement = ({
  title,
  description,
  buttonText,
  bgColor,
  layout = 'vertical'
}: AdvertisementProps) => {
  const isHorizontal = layout === 'horizontal'

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`${bgColor} text-white rounded-lg shadow-lg overflow-hidden cursor-pointer ${
        isHorizontal ? 'p-8' : 'p-6'
      }`}
    >
      <div className={`${isHorizontal ? 'flex items-center justify-between' : 'space-y-4'}`}>
        <div className={isHorizontal ? 'flex-1' : ''}>
          <h3 className={`font-bold ${isHorizontal ? 'text-2xl mb-2' : 'text-lg mb-3'}`}>
            {title}
          </h3>
          <p className={`${isHorizontal ? 'text-lg' : 'text-sm'} opacity-90 leading-relaxed`}>
            {description}
          </p>
        </div>
        
        <div className={isHorizontal ? 'ml-8' : ''}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              bg-white text-gray-900 font-semibold rounded-lg shadow-md
              hover:shadow-lg transition-shadow duration-200
              ${isHorizontal ? 'px-8 py-3 text-lg' : 'w-full px-4 py-2 text-sm'}
            `}
          >
            {buttonText}
          </motion.button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-white bg-opacity-10 rounded-full -translate-y-8 translate-x-8"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 bg-white bg-opacity-10 rounded-full translate-y-4 -translate-x-4"></div>
    </motion.div>
  )
}

export default Advertisement