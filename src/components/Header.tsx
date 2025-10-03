import { usePricingToken } from "space-react-client";
import { getSubscriptionPlan, updateSubscription } from "../services/api";
import { useEffect, useState } from "react";

export default function Header() {
  const [currentPlan, setCurrentPlan] = useState("Loading...");

  const tokenService = usePricingToken();

  async function handlePlanChange(){
    await updateSubscription(tokenService);
    setCurrentPlan(currentPlan === "BASIC" ? "PREMIUM" : "BASIC");
  }

  useEffect(() => {
    getSubscriptionPlan(tokenService).then(async (res) => {
      setCurrentPlan(res.subscriptionPlan);
    })
  }, [tokenService]);
  
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-3xl font-bold text-gray-900">Space News<span className="ml-2 text-sm font-normal text-gray-500">({currentPlan})</span></h1>
          <button onClick={handlePlanChange} className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium shadow-sm">
            Change Plan
          </button>
        </div>
      </div>
    </header>
  );
}
