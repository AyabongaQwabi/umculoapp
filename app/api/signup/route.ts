import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import {
  getPackagePriceMonthly,
  getTierById,
  packageLabel,
  type PackageId,
} from "@/data/pricing";
import {
  sendSignupPendingEmail,
} from "@/lib/signups/email";
import { saveSignup, updateSignup } from "@/lib/signups/storage";
import type { Signup } from "@/lib/signups/types";
import { validateSignupPayload } from "@/lib/signups/validation";
import { getPackageAmountCents } from "@/lib/yoco/amounts";
import {
  createSignupYocoCheckout,
  isYocoConfigured,
} from "@/lib/yoco/client";
import { SITE_URL } from "@/lib/seo/site";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const validation = validateSignupPayload(body);
  if (!validation.ok) {
    return NextResponse.json({ errors: validation.errors }, { status: 400 });
  }

  const { consent: _consent, packageId, ...fields } = validation.data;
  const tierId = packageId as PackageId;
  const tier = getTierById(tierId);

  if (!tier) {
    return NextResponse.json(
      { errors: { packageId: "Please select a valid plan." } },
      { status: 400 },
    );
  }

  const priceMonthly = getPackagePriceMonthly(tierId);
  const now = new Date().toISOString();
  const signupId = randomUUID();

  const signup: Signup = {
    id: signupId,
    name: fields.name,
    businessName: fields.businessName,
    email: fields.email,
    phone: fields.phone,
    package: tier.name,
    priceMonthly: priceMonthly ?? tier.priceMonthly,
    status: "pending_payment",
    createdAt: now,
    updatedAt: now,
  };

  try {
    await saveSignup(signup);
  } catch (error) {
    console.error("Failed to save signup:", error);
    return NextResponse.json(
      { error: "Could not save your signup. Please try again." },
      { status: 500 },
    );
  }

  const emailResult = await sendSignupPendingEmail(signup);
  if (!emailResult.ok) {
    console.error("Signup email failed:", emailResult.error, {
      signupId: signup.id,
    });
  }

  if (tier.isCustomQuote) {
    return NextResponse.json({
      ok: true,
      signupId,
      quoteOnly: true,
    });
  }

  if (!isYocoConfigured()) {
    return NextResponse.json(
      { error: "Payment is not configured on this server." },
      { status: 503 },
    );
  }

  const amountCents = getPackageAmountCents(tierId);
  if (!amountCents) {
    return NextResponse.json(
      { error: "This plan cannot be purchased online." },
      { status: 400 },
    );
  }

  const successUrl = `${SITE_URL}/signup/${signupId}`;
  const cancelUrl = `${SITE_URL}/signup/${signupId}?cancelled=true`;
  const failureUrl = `${SITE_URL}/signup/${signupId}?failed=true`;

  try {
    const checkout = await createSignupYocoCheckout({
      amountCents,
      signupId,
      packageName: tier.name,
      email: signup.email,
      successUrl,
      cancelUrl,
      failureUrl,
    });

    await updateSignup(signupId, { yocoCheckoutId: checkout.id });

    return NextResponse.json({
      ok: true,
      signupId,
      redirectUrl: checkout.redirectUrl,
      package: packageLabel(tierId),
    });
  } catch (error) {
    console.error("Yoco checkout create failed:", error, { signupId });
    return NextResponse.json(
      {
        error:
          "Your details were saved but checkout could not start. We will contact you shortly.",
        signupId,
      },
      { status: 502 },
    );
  }
}
