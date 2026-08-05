# Looks by Manish Kachru

[![Live project](https://img.shields.io/badge/Live-Open_project-111111?style=flat-square)](https://project-xvqw5.vercel.app)

A luxury editorial portfolio, service-booking and operations platform built with Next.js and TypeScript.

## Product highlights

- Editorial landing experience with motion-led visual storytelling
- Dedicated service pages for bridal, party, consultation and film-direction work
- Booking and payment flows backed by Razorpay
- Supabase-powered data, authentication and media workflows
- Admin views for bookings, students, masterclasses, revenue and settings
- Responsive layouts, policy pages, sitemap and production deployment

## Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS and Framer Motion
- Supabase
- Razorpay
- Vercel

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Configure the Supabase and Razorpay values documented in `.env.example`. Never commit live credentials.

## Engineering focus

The project combines a premium content experience with operational booking tools. Server-side routes protect payment operations, while the admin area keeps customer and revenue workflows separate from the public portfolio.

