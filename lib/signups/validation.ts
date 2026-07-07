import { PACKAGE_OPTIONS, type PackageId } from "@/data/pricing";
import type { SignupFormInput } from "@/lib/signups/types";

const VALID_PACKAGES = new Set(
  PACKAGE_OPTIONS.map((option) => option.value),
);

export type SignupValidationResult =
  | { ok: true; data: SignupFormInput }
  | { ok: false; errors: Record<string, string> };

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateSignupPayload(body: unknown): SignupValidationResult {
  const errors: Record<string, string> = {};

  if (!body || typeof body !== "object") {
    return { ok: false, errors: { form: "Invalid request body." } };
  }

  const input = body as Record<string, unknown>;

  const name = asString(input.name);
  const businessName = asString(input.businessName);
  const email = asString(input.email);
  const phone = asString(input.phone);
  const packageId = asString(input.packageId ?? input.packageInterest);
  const consent = input.consent === true;

  if (!name) errors.name = "Name is required.";
  if (!businessName) errors.businessName = "Artist or business name is required.";
  if (!email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!phone) errors.phone = "Phone or WhatsApp number is required.";
  if (!packageId) {
    errors.packageId = "Please select a plan.";
  } else if (!VALID_PACKAGES.has(packageId as PackageId)) {
    errors.packageId = "Please select a valid plan.";
  }
  if (!consent) {
    errors.consent =
      "You must agree before we can store your details and contact you.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      name,
      businessName,
      email,
      phone,
      packageId,
      consent,
    },
  };
}
