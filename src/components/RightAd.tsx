import { motion } from "framer-motion";
import Advertisement from "./Advertisement";
import { useShowAds } from "../context/showAdsContext";

export default function RightAd() {
  const { showAds } = useShowAds();

  return (
    <>
      {showAds && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-2">
          <Advertisement
            title="Space Equipment Sale"
            description="Get the latest space gear with up to 50% off. Limited time offer!"
            buttonText="Shop Now"
            bgColor="bg-purple-600"
          />
        </motion.div>
      )}
    </>
  );
}
