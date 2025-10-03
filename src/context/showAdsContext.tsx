import React, { createContext, useContext, useState, ReactNode } from 'react';

type ShowAdsContextType = {
  showAds: boolean;
  setShowAds: (value: boolean) => void;
};

const ShowAdsContext = createContext<ShowAdsContextType | undefined>(undefined);

export const ShowAdsProvider = ({ children }: { children: ReactNode }) => {
  const [showAds, setShowAds] = useState<boolean>(true);

  return (
    <ShowAdsContext.Provider value={{ showAds, setShowAds }}>
      {children}
    </ShowAdsContext.Provider>
  );
};

export const useShowAds = () => {
  const context = useContext(ShowAdsContext);
  if (context === undefined) {
    throw new Error('useShowAds must be used within a ShowAdsProvider');
  }
  return context;
};