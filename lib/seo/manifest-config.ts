import type { MetadataRoute } from "next";
import { SEO_DESCRIPTION, SITE_NAME, SITE_URL } from "./site";

export const BRAND_COLORS = {
  background: "#000000",
  theme: "#000000",
  gold: "#fec804",
} as const;

export const manifestConfig: MetadataRoute.Manifest = {
  id: SITE_URL,
  name: `${SITE_NAME} — Free Artist Websites`,
  short_name: SITE_NAME,
  description: SEO_DESCRIPTION,
  start_url: "/",
  scope: "/",
  display: "standalone",
  orientation: "portrait-primary",
  background_color: BRAND_COLORS.background,
  theme_color: BRAND_COLORS.theme,
  lang: "en-ZA",
  dir: "ltr",
  categories: ["music", "business", "productivity"],
  icons: [
    {
      src: "/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
    {
      src: "/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      src: "/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "maskable",
    },
    {
      src: "/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable",
    },
    {
      src: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
  ],
};
