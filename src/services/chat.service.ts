import { api } from '@/lib/api';
import type { ChatResponse, MessageResponse } from '@/types/api';

export const chatService = {
  async getChats(): Promise<ChatResponse[]> {
    const response = await api.get<ChatResponse[]>('/Chat');
    return response.data;
  },

  async getMessages(chatId: string): Promise<MessageResponse[]> {
    const response = await api.get<MessageResponse[]>(`/Chat/${chatId}/messages`);
    return response.data;
  },

  async sendMessage(chatId: string, text: string): Promise<void> {
    await api.post(`/Chat/${chatId}/messages`, { text });
  },
};
