export interface User {
  id: string;
  name: string;
  role: 'consumer' | 'influencer' | 'admin';
  email: string;
}

export interface Coupon {
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
  originalPrice?: number;
  price?: number;
  rating?: number;
  reviews?: number;
  location?: string;
  soldCount?: number;
}

export interface Promotion {
  id: string;
  name: string;
  status: 'Active' | 'Ended';
  reach: number;
  conversions: number;
  revenue: number;
  coupons: string[];
}

export interface Chat {
  id: string;
  couponId: string;
  consumerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  sentAt: string;
}

export const USERS: User[] = [
  { id: '1', name: 'Alice Influencer', role: 'influencer', email: 'alice@example.com' },
  { id: '2', name: 'Bob Consumer', role: 'consumer', email: 'bob@example.com' },
  { id: '3', name: 'Charlie Admin', role: 'admin', email: 'admin@ldrs.com' },
];

export const COUPONS: Coupon[] = [
  {
    id: 'c1',
    title: '50% Off Summer Collection',
    description: 'Get half off on all summer items at Zara.',
    code: 'SUMMER50',
    discount: '50%',
    brand: 'Zara',
    influencerId: '1',
    expiry: '2024-08-31',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop',
    originalPrice: 100,
    price: 49.99,
    rating: 4.8,
    reviews: 1240,
    location: 'Online',
    soldCount: 5000
  },
  {
    id: 'c2',
    title: 'Free Coffee with Pastry',
    description: 'Buy any pastry and get a free coffee.',
    code: 'FREECOFFEE',
    discount: '100% Off Coffee',
    brand: 'Starbucks',
    influencerId: '1',
    expiry: '2024-06-30',
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop',
    originalPrice: 15.00,
    price: 8.50,
    rating: 4.5,
    reviews: 3200,
    location: 'Downtown, NY',
    soldCount: 15000
  },
  {
    id: 'c3',
    title: '20% Off Gym Membership',
    description: 'Get fit this year with a discount on annual membership.',
    code: 'GYM20',
    discount: '20%',
    brand: 'Gold\'s Gym',
    influencerId: '1',
    expiry: '2024-12-31',
    category: 'Health',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
    originalPrice: 500,
    price: 399,
    rating: 4.9,
    reviews: 850,
    location: 'Chicago Loop',
    soldCount: 200
  },
  {
    id: 'c4',
    title: 'Luxury Spa Day Package',
    description: 'Full day access to spa facilities including massage.',
    code: 'SPA30',
    discount: '30%',
    brand: 'Bliss Spa',
    influencerId: '1',
    expiry: '2024-10-15',
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2070&auto=format&fit=crop',
    originalPrice: 250,
    price: 175,
    rating: 4.7,
    reviews: 450,
    location: 'Beverly Hills',
    soldCount: 890
  }
];

export const PROMOTIONS: Promotion[] = [
  {
    id: 'p1',
    name: 'Summer Campaign',
    status: 'Active',
    reach: 15000,
    conversions: 350,
    revenue: 4500,
    coupons: ['c1']
  },
  {
    id: 'p2',
    name: 'Morning Coffee Blast',
    status: 'Ended',
    reach: 5000,
    conversions: 120,
    revenue: 600,
    coupons: ['c2']
  }
];

export const CHATS: Chat[] = [
  {
    id: 'chat1',
    couponId: 'c1',
    consumerId: '2',
    createdAt: '2024-05-20T10:00:00Z',
    updatedAt: '2024-05-20T10:06:00Z'
  }
];

export const MESSAGES: Message[] = [
  { id: 'm1', chatId: 'chat1', senderId: '2', text: 'Hi, does this coupon work for online orders too?', sentAt: '2024-05-20T10:00:00Z' },
  { id: 'm2', chatId: 'chat1', senderId: '1', text: 'Yes! Just enter the code at checkout.', sentAt: '2024-05-20T10:05:00Z' },
  { id: 'm3', chatId: 'chat1', senderId: '2', text: 'Awesome, thanks!', sentAt: '2024-05-20T10:06:00Z' }
];
