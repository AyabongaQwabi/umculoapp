export type SignupStatus = "pending_payment" | "paid" | "payment_failed";

export interface Signup {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  package: string;
  priceMonthly: string;
  status: SignupStatus;
  createdAt: string;
  updatedAt: string;
  yocoCheckoutId?: string;
}

export interface SignupFormInput {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  packageId: string;
  consent: boolean;
}

export const SIGNUP_KEY_PREFIX = "signup:";
export const SIGNUPS_ALL_KEY = "signups:all";

export function signupKey(id: string): string {
  return `${SIGNUP_KEY_PREFIX}${id}`;
}
