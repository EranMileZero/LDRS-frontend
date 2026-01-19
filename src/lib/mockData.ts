export const USERS = [
  { id: '1', name: 'Alice Influencer', role: 'influencer', email: 'alice@example.com' },
  { id: '2', name: 'Bob Consumer', role: 'consumer', email: 'bob@example.com' },
  { id: '3', name: 'Charlie Admin', role: 'admin', email: 'admin@ldrs.com' },
];

export const COUPONS = [
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
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop'
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
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop'
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
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop'
  }
];

export const PROMOTIONS = [
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

export const CHATS = [
  {
    id: 'chat1',
    participants: ['1', '2'], // Influencer, Consumer
    couponId: 'c1',
    messages: [
      { id: 'm1', senderId: '2', text: 'Hi, does this coupon work for online orders too?', timestamp: '2024-05-20T10:00:00Z' },
      { id: 'm2', senderId: '1', text: 'Yes! Just enter the code at checkout.', timestamp: '2024-05-20T10:05:00Z' },
      { id: 'm3', senderId: '2', text: 'Awesome, thanks!', timestamp: '2024-05-20T10:06:00Z' }
    ]
  }
];
