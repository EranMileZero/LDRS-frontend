import { api } from '@/lib/api';
import type { LoginCommand, RegisterCommand, AuthResponse } from '@/types/api';

export const authService = {
  async login(data: LoginCommand): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/Auth/login', data);
    return response.data;
  },

  async register(data: RegisterCommand): Promise<void> {
    await api.post('/Auth/register', data);
  },
};
