import { motion } from "framer-motion";
import Advertisement from "./Advertisement";

export default function BottomAd(){
  return(
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="mt-12">
      <Advertisement
        title="Join the Space Community"
        description="Connect with fellow space enthusiasts, share discoveries, and stay updated with the latest space news and missions."
        buttonText="Join Community"
        bgColor="bg-green-600"
        layout="horizontal"
      />
    </motion.div>
  );
}