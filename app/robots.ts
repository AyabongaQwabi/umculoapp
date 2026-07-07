import type { MetadataRoute } from "next";
import { MACHINE_READABLE_ASSETS } from "@/lib/seo/routes";
import { SITE_URL } from "@/lib/seo/site";

const AI_SEARCH_BOTS = [
  "Googlebot",
  "Bingbot",
  "PerplexityBot",
  "ChatGPT-User",
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", ...MACHINE_READABLE_ASSETS],
        disallow: ["/api/", "/_next/", "/admin"],
      },
      ...AI_SEARCH_BOTS.map((userAgent) => ({
        userAgent,
        allow: ["/", ...MACHINE_READABLE_ASSETS] as string[],
        disallow: ["/api/", "/_next/", "/admin"] as string[],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
