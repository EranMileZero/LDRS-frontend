# Future Frontend Architecture: Campaigns & Coupons

This document outlines the frontend implementation plan to support the hierarchical `Campaign (Promotion) -> Coupons` architecture, pending backend support.

## 1. User Interface Flow

### A. Campaigns Dashboard (Main View)
**Route:** `/influencer/campaigns`
*   **Purpose:** Manage high-level marketing campaigns.
*   **Display:** Table of *Promotions*.
*   **Columns:**
    *   Campaign Name
    *   Status (Draft, Active, Ended)
    *   Budget
    *   Duration (Start - End Date)
    *   Performance (Total Reach, Revenue from all coupons)
    *   Actions: Edit, Manage Coupons, Delete.
*   **Primary Action:** "Create Campaign" button.

### B. Create/Edit Campaign Dialog
*   **Trigger:** "Create Campaign" button.
*   **Fields:**
    *   Name (e.g., "Summer Sale 2024")
    *   Description (Internal notes)
    *   Budget (e.g., $1000)
    *   Date Range (Start & End)
*   **Backend Action:** `POST /api/Promotions`

### C. Campaign Details & Coupon Management (Drill-down View)
**Route:** `/influencer/campaigns/:campaignId`
*   **Purpose:** Manage the specific offers (coupons) within a campaign.
*   **Header:** Campaign Summary (Name, Budget Utilization).
*   **Content:** List of *Coupons* linked to this campaign.
*   **Primary Action:** "Add Coupon" button.

### D. Add Coupon Dialog (Context-Aware)
*   **Trigger:** "Add Coupon" inside Campaign Details.
*   **Fields:**
    *   Code (e.g., "SUMMER20")
    *   Discount (e.g., "20%")
    *   Expiry (Default to Campaign End Date)
    *   Image, Price, etc.
*   **Backend Action:** 
    1.  `POST /api/Coupons` (Create the coupon)
    2.  `POST /api/Promotions/:id/coupons` (Link it - *New Endpoint Required*)

## 2. Technical Requirements

### New API Endpoints Required
*   `POST /api/Promotions` - Create a campaign container.
*   `PUT /api/Promotions/{id}` - Update campaign metadata.
*   `GET /api/Promotions/{id}/coupons` - Get coupons for a specific campaign.
*   `POST /api/Promotions/{id}/coupons` - Link an existing or new coupon to a campaign.

### Frontend Components
1.  **`CampaignList.tsx`**:
    *   Fetches `promotionService.getAll()`.
    *   Renders the Campaigns table.
2.  **`CampaignForm.tsx`**:
    *   Form for creating/editing the Promotion metadata.
3.  **`CampaignDetails.tsx`**:
    *   Fetches `promotionService.getById(id)` and `promotionService.getCoupons(id)`.
    *   Displays Campaign stats and Coupon list.
4.  **`CouponForm.tsx`**:
    *   Reuse existing form but pre-fill context from the parent Campaign (e.g., dates).

## 3. Data Model Updates (Frontend)

```typescript
interface Promotion {
  id: string;
  name: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: 'Draft' | 'Active' | 'Ended';
  coupons: Coupon[]; // Nested or separate fetch
}
```

## 4. Implementation Steps (Once Backend is Ready)
1.  [ ] Revert `Campaigns.tsx` to list Promotions instead of Coupons.
2.  [ ] Create `CampaignDetails` page component.
3.  [ ] Add routing for `/influencer/campaigns/:id`.
4.  [ ] Implement `linkCouponToPromotion` service method.
5.  [ ] Update Dashboard analytics to aggregate data by Promotion ID.
