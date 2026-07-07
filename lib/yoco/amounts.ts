import type { PackageId } from "@/data/pricing";

/** Monthly amounts in cents (ZAR). Minimum Yoco charge is 200 (R2). */
export const PACKAGE_AMOUNT_CENTS: Record<
  Exclude<PackageId, "special-project">,
  number
> = {
  "basic-website": 9900,
  "website-blog": 14900,
  "website-music-sales": 19900,
  "website-merch": 39900,
};

export function getPackageAmountCents(
  packageId: PackageId,
): number | null {
  if (packageId === "special-project") return null;
  return PACKAGE_AMOUNT_CENTS[packageId];
}
