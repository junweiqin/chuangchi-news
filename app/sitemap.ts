import type { MetadataRoute } from "next";
import { GUIDES } from "./guide-data";
import { NEWS } from "./news-data";
import { SITE_URL } from "./site-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestNewsDate = NEWS.reduce(
    (latest, item) => item.date > latest ? item.date : latest,
    "2026-07-15",
  );
  const staticRoutes = [
    "",
    "/about",
    "/guides",
    "/services",
    "/services/personalized",
    "/quote",
    "/file-checklist",
    "/delivery",
    "/privacy",
    "/evidence",
    "/faq",
    "/contact",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(latestNewsDate),
      changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...NEWS.map((item) => ({
      url: `${SITE_URL}/news/${item.id}`,
      lastModified: new Date(item.date),
      changeFrequency: "monthly" as const,
      priority: item.featured ? 0.8 : 0.6,
    })),
    ...GUIDES.map((guide) => ({
      url: `${SITE_URL}/guides/${guide.slug}`,
      lastModified: new Date("2026-07-19"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
