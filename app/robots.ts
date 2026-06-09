import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.looksbymanishkachru.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/admin/*", "/api", "/api/", "/api/*"]
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  };
}
