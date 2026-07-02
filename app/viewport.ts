import type { Viewport } from "next";
import { BRAND_COLORS } from "@/lib/seo/manifest-config";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: BRAND_COLORS.theme },
    { media: "(prefers-color-scheme: light)", color: BRAND_COLORS.theme },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};
