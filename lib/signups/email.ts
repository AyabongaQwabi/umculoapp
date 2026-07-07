import { Resend } from "resend";
import type { Signup } from "@/lib/signups/types";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function signupDetailsHtml(signup: Signup): string {
  return `
    <p><strong>Name:</strong> ${escapeHtml(signup.name)}</p>
    <p><strong>Artist / business:</strong> ${escapeHtml(signup.businessName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(signup.email)}</p>
    <p><strong>Phone / WhatsApp:</strong> ${escapeHtml(signup.phone)}</p>
    <p><strong>Package:</strong> ${escapeHtml(signup.package)}</p>
    <p><strong>Price:</strong> ${escapeHtml(signup.priceMonthly)}/month</p>
    <p><strong>Signup ID:</strong> ${escapeHtml(signup.id)}</p>
  `.trim();
}

async function sendEmail(
  subject: string,
  html: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY is not configured." };
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: "Umculo Signups <umculoleads@qwabi.co.za>",
      to: "aya@qwabi.co.za",
      subject,
      html,
    });

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown email send error.";
    return { ok: false, error: message };
  }
}

export async function sendSignupPendingEmail(
  signup: Signup,
): Promise<{ ok: true } | { ok: false; error: string }> {
  return sendEmail(
    `New signup: ${signup.name} — ${signup.package} — pending payment`,
    `<h2>New Umculo signup</h2><p><strong>Status:</strong> pending payment</p>${signupDetailsHtml(signup)}`,
  );
}

export async function sendSignupPaidEmail(
  signup: Signup,
): Promise<{ ok: true } | { ok: false; error: string }> {
  return sendEmail(
    `Payment received: ${signup.name} — ${signup.package} — ${signup.priceMonthly}/month`,
    `<h2>Payment received</h2><p><strong>Status:</strong> paid</p>${signupDetailsHtml(signup)}`,
  );
}
