import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.looksbymanishkachru.com";
  const lastModified = new Date();

  const routes = [
    "",
    "/bridals",
    "/party-hd-makeups",
    "/editorial-and-film-direction",
    "/beauty-consultation",
    "/weekly-masterclasses",
    "/privacy-policy",
    "/terms-and-conditions",
    "/refund-policy",
    "/cancellation-policy",
    "/service-delivery-policy"
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7
  }));
}
