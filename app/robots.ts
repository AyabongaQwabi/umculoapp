import type { MetadataRoute } from "next";
import { MACHINE_READABLE_ASSETS } from "@/lib/seo/routes";
import { SITE_URL } from "@/lib/seo/site";

// Search-adjacent crawlers with real-time browsing/citation behavior
// (Googlebot/Bingbot covered by the wildcard rule; listed for clarity of intent).
const SEARCH_BOTS = ["Googlebot", "Bingbot"] as const;

// AI answer-engine and model-training crawlers. Umculo is the entity hub for
// the umculo.app artist network, so visibility in AI answers (ChatGPT,
// Perplexity, Claude, Gemini/Google-Extended) is deliberately encouraged
// rather than blocked — see AEO_GEO.md.
const AI_CRAWL_BOTS = [
  "PerplexityBot",
  "Perplexity-User",
  "ChatGPT-User",
  "GPTBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "Google-Extended",
  "OAI-SearchBot",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "Bytespider",
  "CCBot",
] as const;

const ALLOW_PATHS = ["/", ...MACHINE_READABLE_ASSETS];
const DISALLOW_PATHS = ["/api/", "/_next/", "/admin", "/signup/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ALLOW_PATHS,
        disallow: DISALLOW_PATHS,
      },
      ...[...SEARCH_BOTS, ...AI_CRAWL_BOTS].map((userAgent) => ({
        userAgent,
        allow: ALLOW_PATHS as string[],
        disallow: DISALLOW_PATHS as string[],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
