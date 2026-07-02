import type { MetadataRoute } from "next";
import { LAST_UPDATED, SITE_URL } from "./site";

export type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

export interface SitemapRoute {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
  includeInSitemap?: boolean;
}

/** Central registry for indexable site routes. */
export const SITE_ROUTES: SitemapRoute[] = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
    includeInSitemap: true,
  },
  {
    path: "/privacy",
    changeFrequency: "yearly",
    priority: 0.3,
    includeInSitemap: true,
  },
];

/** Machine-readable files for AI agents (not in XML sitemap). */
export const MACHINE_READABLE_ASSETS = [
  "/llms.txt",
  "/offer.md",
  "/manifest.webmanifest",
  "/site.webmanifest",
] as const;

export function buildSitemapEntries(): MetadataRoute.Sitemap {
  return SITE_ROUTES.filter((route) => route.includeInSitemap !== false).map(
    (route) => ({
      url: `${SITE_URL}${route.path === "/" ? "" : route.path}`,
      lastModified: LAST_UPDATED,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }),
  );
}
