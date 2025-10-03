import { motion } from "framer-motion";
import Advertisement from "./Advertisement";

export default function LeftAd() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="lg:col-span-2">
      <Advertisement
        title="Premium Space Tours"
        description="Experience the ultimate space adventure. Book your trip to the stars today!"
        buttonText="Book Now"
        bgColor="bg-blue-600"
      />
    </motion.div>
  );
}
