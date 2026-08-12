/**
 * Canonical base URL for the site. Sourced from NEXT_PUBLIC_SITE_URL so the
 * same code works across local dev, preview deployments, and production
 * without hardcoding the domain. Set NEXT_PUBLIC_SITE_URL in `.env.local`
 * (see `.env.example`).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const SITE_NAME = "Umculo";

export const ORGANIZATION = {
  name: "Qwabi Engineering",
  legalName: "Namoota Technology (Pty) Ltd",
  url: "https://business.qwabi.co.za",
  website: "https://www.qwabi.co.za",
  email: "aya@qwabi.co.za",
  phone: "+27603116777",
  logo: `${SITE_URL}/umculo-logo.png`,
} as const;

export const PARTNERS = {
  xhosaHipHop: {
    name: "Xhosa Hip Hop",
    url: "https://xhosahiphop.co.za",
  },
} as const;

export const LAST_UPDATED = "2026-07-06";

export const PRIMARY_KEYWORD = "artist website South Africa";

export const SEO_TITLE = "Artist Website South Africa | Umculo";

export const SEO_DESCRIPTION =
  "Subscribe to an Umculo artist website from R99/month. Sign up, pay via Yoco secure checkout, and we build your site.";
