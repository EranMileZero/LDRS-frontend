import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Coupon, type Promotion } from '@/lib/mockData';
import { couponService } from '@/services/coupon.service';
import { promotionService } from '@/services/promotion.service';

interface MarketplaceContextType {
  coupons: Coupon[];
  promotions: Promotion[];
  addCoupon: (coupon: Coupon) => void;
  addPromotion: (promotion: Promotion) => void;
  isLoading: boolean;
  refresh: () => Promise<void>;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch coupons
      try {
        console.log("Fetching coupons...");
        const couponsData = await couponService.getAll();
        console.log("Coupons fetched:", couponsData);
        setCoupons(couponsData as unknown as Coupon[]);
      } catch (error) {
        console.error("Failed to fetch coupons", error);
      }

      // Fetch promotions
      try {
        console.log("Fetching promotions...");
        const promotionsData = await promotionService.getAll();
        console.log("Promotions fetched:", promotionsData);
        setPromotions(promotionsData as unknown as Promotion[]);
      } catch (error) {
        console.error("Failed to fetch promotions", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const refresh = async () => {
      setIsLoading(true);
      try {
        const [couponsData, promotionsData] = await Promise.all([
            couponService.getAll().catch(e => { console.error(e); return [] }),
            promotionService.getAll().catch(e => { console.error(e); return [] })
        ]);
        // @ts-ignore
        setCoupons(couponsData);
        // @ts-ignore
        setPromotions(promotionsData);
      } catch (error) {
          console.error("Refresh failed", error);
      } finally {
          setIsLoading(false);
      }
  };

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons((prev) => [newCoupon, ...prev]);
  };

  const addPromotion = (newPromotion: Promotion) => {
    setPromotions((prev) => [newPromotion, ...prev]);
  };

  return (
    <MarketplaceContext.Provider value={{ coupons, promotions, addCoupon, addPromotion, isLoading, refresh }}>
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
