import { motion } from 'framer-motion'

export default function Loading({ label = 'Loading…' }: { label?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center py-16 text-gray-600">
      <motion.div
        className="h-3 w-3 rounded-full bg-indigo-600 mr-2"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 0.9 }}
      />
      <span className="text-sm font-medium">{label}</span>
    </motion.div>
  )
}
