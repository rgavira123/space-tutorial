import { motion } from 'framer-motion'

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-md border border-red-200 bg-red-50 text-red-800 px-4 py-3">
      <p className="text-sm font-medium">{message}</p>
    </motion.div>
  )
}
