import { sendSignupPaidEmail } from "@/lib/signups/email";
import { updateSignup } from "@/lib/signups/storage";
import type { Signup } from "@/lib/signups/types";

interface ReturnQuery {
  cancelled: boolean;
  failed: boolean;
  quote: boolean;
}

export async function applySignupReturnStatus(
  signup: Signup,
  query: ReturnQuery,
): Promise<Signup> {
  if (query.quote || query.cancelled) {
    return signup;
  }

  if (query.failed) {
    if (signup.status === "paid") return signup;
    return (await updateSignup(signup.id, { status: "payment_failed" })) ?? signup;
  }

  if (signup.status === "paid") {
    return signup;
  }

  const updated = await updateSignup(signup.id, { status: "paid" });
  if (!updated) return signup;

  const emailResult = await sendSignupPaidEmail(updated);
  if (!emailResult.ok) {
    console.error("Paid signup email failed:", emailResult.error, {
      signupId: updated.id,
    });
  }

  return updated;
}
