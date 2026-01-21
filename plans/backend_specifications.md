# Backend Specifications (Client-Side Requirements)

This document defines the backend requirements based on the existing React frontend implementation (`src/lib/mockData.ts`, `src/context/AuthContext.tsx`, etc.). It serves as a guide for the backend developer to ensure compatibility with the client application.

## 1. Data Models (Frontend Interfaces)

The frontend expects API responses to match these TypeScript interfaces.

### User
```typescript
interface User {
  id: string;
  name: string;
  role: 'consumer' | 'influencer' | 'admin';
  email: string;
  // Note: Password is never sent to the client
}
```

### Coupon
```typescript
interface Coupon {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: string;
  brand: string;
  influencerId: string; // Foreign Key to User
  expiry: string;       // ISO Date String
  category: string;
  image: string;        // URL
  originalPrice?: number;
  price?: number;
  rating?: number;
  reviews?: number;
  location?: string;
  soldCount?: number;
}
```

### Promotion (Influencer Dashboard)
```typescript
interface Promotion {
  id: string;
  name: string;
  status: 'Active' | 'Ended';
  reach: number;
  conversions: number;
  revenue: number;
  coupons: string[]; // List of Coupon IDs
}
```

### Chat & Messages
```typescript
interface Chat {
  id: string;
  couponId: string;
  consumerId: string;
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
}

interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  sentAt: string;    // ISO Date String
}
```

---

## 2. API Endpoints Requirements

The following REST API endpoints (or Minimal API routes) are required.

### Authentication (`/api/auth`)
*   `POST /api/auth/login`: Authenticate user.
    *   Input: `{ email, password }`
    *   Output: `{ token, user: User }`
*   `POST /api/auth/register`: Create new account.
    *   Input: `{ name, email, password, role }`
    *   Output: `{ token, user: User }`

### Coupons (`/api/coupons`)
*   `GET /api/coupons`: List all active coupons (for Consumer Marketplace).
    *   Params: Optional filters (category, search).
*   `GET /api/coupons/{id}`: Get details of a single coupon.
*   `POST /api/coupons`: Create a new coupon (Influencer only).
*   `GET /api/coupons/influencer/{influencerId}`: Get coupons created by specific influencer.

### Promotions (`/api/promotions`)
*   `GET /api/promotions`: Get promotions for the authenticated influencer.

### Chat (`/api/chat`)
*   `GET /api/chat`: Get list of chats for the authenticated user.
    *   If **Consumer**: Chats where `consumerId == currentUser.id`.
    *   If **Influencer**: Chats linked to coupons owned by `currentUser.id`.
*   `GET /api/chat/{chatId}/messages`: Get message history for a specific chat.

---

## 3. Real-Time Communication (SignalR)

The chat feature requires a real-time connection.

**Hub Endpoint:** `/hubs/chat`

**Client-to-Server Methods:**
*   `JoinChat(string chatId)`: Client joins the group for a specific chat.
*   `SendMessage(string chatId, string text)`: Client sends a message.

**Server-to-Client Events:**
*   `ReceiveMessage(Message message)`: Broadcasted to everyone in the `chatId` group when a new message is sent.

---

## 4. Database Reference

The backend should implement the schema defined in `plans/database_schema.md`.
*   **Users Table**: Maps to `User` interface.
*   **Coupons Table**: Maps to `Coupon` interface.
*   **Promotions Table**: Maps to `Promotion` interface.
*   **Chats & Messages Tables**: Map to `Chat` and `Message` interfaces.

**Note:** The mock data uses `string` for IDs, but the database schema uses `UUID`. The backend should handle UUID generation and serialization to string for the API JSON response.
