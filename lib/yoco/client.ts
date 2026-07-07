import { randomUUID } from "crypto";
import type { PackageId } from "@/data/pricing";

const YOCO_API_BASE = "https://payments.yoco.com/api";

export interface YocoCheckout {
  id: string;
  redirectUrl: string;
  status: string;
  amount: number;
  currency: string;
  paymentId?: string | null;
  metadata?: Record<string, string>;
  processingMode?: string;
}

export interface CreateSignupCheckoutInput {
  amountCents: number;
  signupId: string;
  packageName: string;
  email: string;
  successUrl: string;
  cancelUrl: string;
  failureUrl: string;
}

function getSecretKey(): string {
  const key = process.env.YOCO_SECRET_KEY?.trim();
  if (!key) {
    throw new Error("YOCO_SECRET_KEY is not configured.");
  }
  return key;
}

async function yocoFetch<T>(
  path: string,
  options: RequestInit & { idempotencyKey?: string } = {},
): Promise<T> {
  const { idempotencyKey, ...init } = options;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${getSecretKey()}`,
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string>),
  };

  if (idempotencyKey) {
    headers["Idempotency-Key"] = idempotencyKey;
  }

  const response = await fetch(`${YOCO_API_BASE}${path}`, {
    ...init,
    headers,
  });

  const body = (await response.json().catch(() => ({}))) as T & {
    message?: string;
    error?: string;
  };

  if (!response.ok) {
    const detail =
      (body as { message?: string }).message ??
      (body as { error?: string }).error ??
      response.statusText;
    throw new Error(`Yoco API error (${response.status}): ${detail}`);
  }

  return body;
}

export function isYocoConfigured(): boolean {
  return Boolean(process.env.YOCO_SECRET_KEY?.trim());
}

export async function createSignupYocoCheckout(
  input: CreateSignupCheckoutInput,
): Promise<YocoCheckout> {
  return yocoFetch<YocoCheckout>("/checkouts", {
    method: "POST",
    idempotencyKey: randomUUID(),
    body: JSON.stringify({
      amount: input.amountCents,
      currency: "ZAR",
      externalId: input.signupId,
      successUrl: input.successUrl,
      cancelUrl: input.cancelUrl,
      failureUrl: input.failureUrl,
      metadata: {
        signupId: input.signupId,
        package: input.packageName,
        email: input.email,
        source: "umculo.app",
      },
    }),
  });
}
