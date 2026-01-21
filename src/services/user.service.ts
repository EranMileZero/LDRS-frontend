import { api } from '@/lib/api';
import type { UserResponse, CreateUserCommand, UpdateUserCommand } from '@/types/api';

export const userService = {
  async getAll(): Promise<UserResponse[]> {
    const response = await api.get<UserResponse[]>('/Users');
    return response.data;
  },

  async create(data: CreateUserCommand): Promise<void> {
    await api.post('/Users', data);
  },

  async update(id: string, data: UpdateUserCommand): Promise<void> {
    await api.put(`/Users/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/Users/${id}`);
  },
};
