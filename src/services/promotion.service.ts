import { api } from '@/lib/api';
import type { PromotionResponse, CreatePromotionCommand, UpdatePromotionCommand, CouponResponse } from '@/types/api';

export const promotionService = {
  async getAll(): Promise<PromotionResponse[]> {
    const response = await api.get<PromotionResponse[]>('/Promotions');
    return response.data;
  },

  async getById(id: string): Promise<PromotionResponse> {
    const response = await api.get<PromotionResponse>(`/Promotions/${id}`);
    return response.data;
  },

  async create(data: CreatePromotionCommand): Promise<void> {
    await api.post('/Promotions', data);
  },

  async update(id: string, data: UpdatePromotionCommand): Promise<void> {
    await api.put(`/Promotions/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/Promotions/${id}`);
  },

  async getCoupons(id: string): Promise<CouponResponse[]> {
      const response = await api.get<CouponResponse[]>(`/Promotions/${id}/coupons`);
      return response.data;
  },

  async addCoupon(promotionId: string, couponId: string): Promise<void> {
      await api.post(`/Promotions/${promotionId}/coupons`, { couponId });
  },

  async removeCoupon(promotionId: string, couponId: string): Promise<void> {
      await api.delete(`/Promotions/${promotionId}/coupons/${couponId}`);
  }
};
