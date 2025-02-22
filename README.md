This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Overview
*Deploy on vercel

1. API Implementation (Mock Data)
   Use Next.js API routes to simulate backend APIs.
   Implement proper CRUD operations for bookings and drivers.
   Handle API errors gracefully.

1. Login system
   JWT (Jose) (without refresh token)
   Store token in cookies
   Manage page redirection in middleware
   Login time : 24h

2. Error Handling
   Define response format
   Catch all errors in api service, consistently return a data format to handle easily

3. Dashboard UI - list bookings
   Filter by status, created date, id
   Search by customer name, driver name
   View detail
   Edit booking: choose driver by search with name
   Pagination
   support delete all using checkbox
   Create booking

4. Notifications System
   Show toast notifications for important actions:
   Success messages for creating/editing bookings.
   Error alerts for failed API requests.

5. Real-times Updates (WebSocket)
   Implement real-time updates for bookings:
      New bookings appear automatically without refreshing.
      Status changes reflect instantly across the dashboard.

   *I deployed an independent node server to run web socket using Railway

6. Activity log
   Track actions performed by users:
      “Booking created by Admin A”
      “Ride status updated from Pending to Completed by Operator B”
   Display logs in a separate Activity Log section.

   *Do not store in mock database

## Note
- Recoil do not being updated now so there is no support for it hence it will not work for the newer versions of react.
- API Response format { message, data }
- Only pre-fetch profile from client side, need to get cookie token in browser
