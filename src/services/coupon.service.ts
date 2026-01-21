import { api } from '@/lib/api';
import type { CouponResponse, CreateCouponCommand } from '@/types/api';

export const couponService = {
  async getAll(params?: { category?: string; search?: string }): Promise<CouponResponse[]> {
    const response = await api.get<CouponResponse[]>('/Coupons', { params });
    return response.data;
  },

  async create(data: CreateCouponCommand): Promise<CouponResponse> {
    const response = await api.post<CouponResponse>('/Coupons', data);
    return response.data;
  },

  async getByInfluencer(influencerId: string): Promise<CouponResponse[]> {
    const response = await api.get<CouponResponse[]>(`/Coupons/influencer/${influencerId}`);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/Coupons/${id}`);
  },

  async update(id: string, data: Partial<CreateCouponCommand>): Promise<void> {
      await api.put(`/Coupons/${id}`, data);
  },
};
