import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(process.cwd()),
  poweredByHeader: false,
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "msukvnceueoxgklxennx.supabase.co",
        pathname: "/storage/v1/object/public/media/**"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ]
  },
  async headers() {
    const contentSecurityPolicy = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com https://checkout-static-next.razorpay.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://msukvnceueoxgklxennx.supabase.co",
      "media-src 'self' blob: https://msukvnceueoxgklxennx.supabase.co",
      "font-src 'self' data:",
      "connect-src 'self' https://msukvnceueoxgklxennx.supabase.co https://*.supabase.co https://api.razorpay.com https://checkout.razorpay.com https://checkout-static-next.razorpay.com",
      "frame-src https://api.razorpay.com https://checkout.razorpay.com",
      "upgrade-insecure-requests"
    ].join("; ");

    const securityHeaders = [
      { key: "Content-Security-Policy", value: contentSecurityPolicy },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: 'camera=(), microphone=(), geolocation=(), payment=(self "https://checkout.razorpay.com")'
      },
      { key: "X-Permitted-Cross-Domain-Policies", value: "none" }
    ];

    return [
      {
        source: "/(.*)",
        headers: securityHeaders
      },
      {
        source: "/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }]
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Cache-Control", value: "no-store" }
        ]
      }
    ];
  }
};

export default nextConfig;
