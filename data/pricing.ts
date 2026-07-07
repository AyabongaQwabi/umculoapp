export type PackageId =
  | "basic-website"
  | "website-blog"
  | "website-music-sales"
  | "website-merch"
  | "special-project";

export interface PricingTier {
  id: PackageId;
  name: string;
  priceMonthly: string;
  features: string[];
  isCustomQuote?: boolean;
  /** Shown on pricing cards as the recommended default */
  recommended?: boolean;
}

export const PRICING_EXPLAINER =
  "Monthly subscription. No setup fee. Fill in the signup form, then pay your first month via Yoco secure checkout.";

export const YOCO_NOTE =
  "Get started saves your details first, then opens Yoco checkout. Payment is confirmed on our server after you pay.";

export const pricingTiers: PricingTier[] = [
  {
    id: "basic-website",
    name: "Basic Website",
    priceMonthly: "R99",
    features: ["Artist profile", "Bio", "Photo gallery", "Press page"],
  },
  {
    id: "website-blog",
    name: "Website + Blog",
    priceMonthly: "R149",
    features: [
      "Artist profile",
      "Bio",
      "Photo gallery",
      "Press page",
      "Blog for news and updates",
    ],
    recommended: true,
  },
  {
    id: "website-music-sales",
    name: "Website + Music Sales",
    priceMonthly: "R199",
    features: [
      "Artist profile",
      "Bio",
      "Photo gallery",
      "Press page",
      "Blog for news and updates",
      "Sell your music directly on your site",
    ],
  },
  {
    id: "website-merch",
    name: "Website + Merch",
    priceMonthly: "R399",
    features: [
      "Artist profile",
      "Bio",
      "Photo gallery",
      "Press page",
      "Blog for news and updates",
      "Sell your music directly on your site",
      "Sell merch",
    ],
  },
  {
    id: "special-project",
    name: "Special Project",
    priceMonthly: "From R699",
    features: [],
    isCustomQuote: true,
  },
];

export const PACKAGE_OPTIONS = pricingTiers.map((tier) => ({
  value: tier.id,
  label: tier.name,
}));

export function packageLabel(id: string): string {
  return pricingTiers.find((tier) => tier.id === id)?.name ?? id;
}

export function getTierById(id: PackageId): PricingTier | undefined {
  return pricingTiers.find((tier) => tier.id === id);
}

export function getPackagePriceMonthly(id: PackageId): string | null {
  const tier = getTierById(id);
  if (!tier || tier.isCustomQuote) return null;
  return tier.priceMonthly;
}

/** Platform extras included on every paid tier, beyond the basic tier page list */
export const STANDARD_SITE_PLATFORM_INCLUDES = [
  "Custom design (not a generic template)",
  "Responsive layout for mobile and desktop",
  "Basic SEO setup for search engines",
  "Hosting on yourname.umculo.app",
] as const;

export const HIGHER_TIER_INCLUDES_NOTE =
  "Blog, music sales, and merch are available on higher plans — see pricing below.";

/** Page-level features shared by every paid tier (from Basic Website) */
export function getBaselineTierFeatures(): string[] {
  return getTierById("basic-website")?.features ?? [];
}

/** Full checklist for the “Standard Site Includes” box */
export function getStandardSiteIncludes(): string[] {
  return [...STANDARD_SITE_PLATFORM_INCLUDES, ...getBaselineTierFeatures()];
}
