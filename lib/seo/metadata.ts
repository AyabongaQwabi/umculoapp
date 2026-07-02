import type { Metadata } from "next";
import {
  LAST_UPDATED,
  SEO_DESCRIPTION,
  SEO_TITLE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo/site";
import { BRAND_COLORS } from "@/lib/seo/manifest-config";

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SEO_DESCRIPTION,
  applicationName: SITE_NAME,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/umculo-logo.png",
        color: BRAND_COLORS.gold,
      },
    ],
  },
  keywords: [
    "free artist website South Africa",
    "musician website South Africa",
    "music artist website",
    "Umculo",
    "Qwabi Engineering",
    "Xhosa Hip Hop",
    "artist website free",
    "SEO for musicians",
  ],
  authors: [{ name: "Qwabi Engineering", url: "https://www.qwabi.co.za" }],
  creator: "Qwabi Engineering",
  publisher: "Namoota Technology (Pty) Ltd",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Umculo — Free professional artist websites for South Africa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "black-translucent",
  },
  other: {
    "last-modified": LAST_UPDATED,
    "msapplication-config": "/browserconfig.xml",
    "msapplication-TileColor": BRAND_COLORS.theme,
  },
};
