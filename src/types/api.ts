export interface LoginCommand {
  email?: string;
  password?: string;
}

export interface RegisterCommand {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

export interface CreateCouponCommand {
  title?: string;
  description?: string;
  code?: string;
  discount?: string;
  brand?: string;
  influencerId?: string;
  expiry?: string;
  category?: string;
  image?: string;
  originalPrice?: number;
  price?: number;
  location?: string;
}

// Response types - Assuming structure based on standard conventions as Swagger "200 OK" doesn't specify body schema clearly.
// We will adapt these as we discover the real API responses.

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface CouponResponse {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: string;
  brand: string;
  influencerId: string;
  expiry: string;
  category: string;
  image: string;
  originalPrice: number;
  price: number;
  location: string;
  rating?: number; // Not in swagger schema but in mock
  reviews?: number; // Not in swagger schema but in mock
  soldCount?: number; // Not in swagger schema but in mock
}

export interface ChatResponse {
  id: string;
  couponId?: string; // Inferred from mock
  consumerId?: string; // Inferred from mock
  createdAt?: string;
  updatedAt?: string;
}

export interface MessageResponse {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  sentAt: string;
}

export interface PromotionResponse {
  id: string;
  name: string;
  status: string;
  reach: number;
  conversions: number;
  revenue: number;
  coupons: string[];
}

export interface CreatePromotionCommand {
  name: string;
  status?: string;
  reach?: number;
  coupons?: string[];
  budget?: number; // Added from UI
}

export interface UpdatePromotionCommand {
  name?: string;
  status?: string;
  reach?: number;
  coupons?: string[];
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface CreateUserCommand {
  name: string;
  email: string;
  password?: string;
  role: string;
}

export interface UpdateUserCommand {
  name?: string;
  email?: string;
  role?: string;
}

export interface SendMessageCommand {
  text: string;
}
