# LDRS Database Schema (PostgreSQL)

This document defines the SQL schema for the LDRS application based on the current data models.

## Database Initialization

```sql
-- Enable UUID extension for generating unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

## Tables

### 1. Users
Stores all user types (Consumer, Influencer, Admin).

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255), -- For actual authentication
    role VARCHAR(50) CHECK (role IN ('consumer', 'influencer', 'admin')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Coupons
Represents the deals/coupons available in the marketplace.

```sql
CREATE TABLE coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    code VARCHAR(50) NOT NULL,
    discount VARCHAR(50), -- e.g., "50%", "10% Off"
    brand VARCHAR(255) NOT NULL,
    influencer_id UUID REFERENCES users(id), -- The influencer who created/promotes this
    expiry DATE,
    category VARCHAR(100),
    image TEXT, -- URL to the image
    original_price DECIMAL(10, 2),
    price DECIMAL(10, 2),
    rating DECIMAL(3, 2) DEFAULT 0,
    reviews INTEGER DEFAULT 0,
    location VARCHAR(255),
    sold_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Promotions
Tracks marketing campaigns created by influencers.

```sql
CREATE TABLE promotions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) CHECK (status IN ('Active', 'Ended', 'Draft')) DEFAULT 'Active',
    reach INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    revenue DECIMAL(10, 2) DEFAULT 0,
    influencer_id UUID REFERENCES users(id), -- Owner of the campaign
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Promotion Coupons (Join Table)
Links promotions to specific coupons (Many-to-Many).

```sql
CREATE TABLE promotion_coupons (
    promotion_id UUID REFERENCES promotions(id) ON DELETE CASCADE,
    coupon_id UUID REFERENCES coupons(id) ON DELETE CASCADE,
    PRIMARY KEY (promotion_id, coupon_id)
);
```

### 5. Chats
Represents a conversation between a consumer and an influencer regarding a specific coupon.

```sql
CREATE TABLE chats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coupon_id UUID REFERENCES coupons(id),
    consumer_id UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 6. Messages
Individual messages within a chat.

```sql
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES users(id),
    text TEXT NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Indexes

To improve performance, consider adding indexes on frequently queried columns:

```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_coupons_influencer ON coupons(influencer_id);
CREATE INDEX idx_coupons_category ON coupons(category);
CREATE INDEX idx_promotions_influencer ON promotions(influencer_id);
CREATE INDEX idx_chats_consumer ON chats(consumer_id);
CREATE INDEX idx_messages_chat ON messages(chat_id);
```
