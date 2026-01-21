import { createContext, useContext, useState, type ReactNode } from 'react';
import { type Coupon, type Promotion, COUPONS, PROMOTIONS } from '@/lib/mockData';

interface MarketplaceContextType {
  coupons: Coupon[];
  promotions: Promotion[];
  addCoupon: (coupon: Coupon) => void;
  addPromotion: (promotion: Promotion) => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const [coupons, setCoupons] = useState<Coupon[]>(COUPONS);
  const [promotions, setPromotions] = useState<Promotion[]>(PROMOTIONS);

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons((prev) => [newCoupon, ...prev]);
  };

  const addPromotion = (newPromotion: Promotion) => {
    setPromotions((prev) => [newPromotion, ...prev]);
  };

  return (
    <MarketplaceContext.Provider value={{ coupons, promotions, addCoupon, addPromotion }}>
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (context === undefined) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}
