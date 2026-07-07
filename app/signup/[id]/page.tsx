import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { applySignupReturnStatus } from "@/lib/signups/return";
import { getSignup } from "@/lib/signups/storage";

export const metadata = {
  title: "Signup status",
  robots: { index: false, follow: false },
};

interface SignupPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    cancelled?: string;
    failed?: string;
    quote?: string;
  }>;
}

export default async function SignupPage({
  params,
  searchParams,
}: SignupPageProps) {
  const { id } = await params;
  const query = await searchParams;
  const cancelled = query.cancelled === "true";
  const failedQuery = query.failed === "true";
  const quoteOnly = query.quote === "true";

  let signup = null;
  try {
    signup = await getSignup(id);
  } catch {
    signup = null;
  }

  if (!signup) {
    return (
      <>
        <Nav />
        <main className="mx-auto max-w-lg px-4 pb-20 pt-28 text-center sm:px-6">
          <h1 className="font-display text-3xl font-black uppercase tracking-tight">
            Signup Not Found
          </h1>
          <p className="mt-4 text-base text-white/75">
            We could not find this signup reference. If you completed a form,
            check your email or contact us.
          </p>
          <Link
            href="/#contact"
            className="mt-8 inline-flex border border-gold/60 px-6 py-3 font-display text-sm font-black uppercase tracking-wide text-gold hover:bg-gold/10"
          >
            Start again
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  signup = await applySignupReturnStatus(signup, {
    cancelled,
    failed: failedQuery,
    quote: quoteOnly,
  });

  const showPaid = signup.status === "paid";
  const showQuote = quoteOnly && !showPaid;
  const showFailed =
    signup.status === "payment_failed" || (failedQuery && !showPaid);
  const showCancelled = cancelled && signup.status === "pending_payment";

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-lg px-4 pb-20 pt-28 text-center sm:px-6">
        {showPaid ? (
          <>
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Payment received
            </p>
            <h1 className="mt-3 font-display text-3xl font-black uppercase tracking-tight">
              Thank You
            </h1>
            <p className="mt-4 text-base text-white/75">
              Your payment for <strong>{signup.package}</strong> (
              {signup.priceMonthly}/month) is confirmed. Please await further
              details from us — we will email you within one to two business
              days to collect your bio, photos, music links, and other content.
            </p>
            <p className="mt-4 text-xs text-white/45">
              Reference: {signup.id}
            </p>
          </>
        ) : showQuote ? (
          <>
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Quote request received
            </p>
            <h1 className="mt-3 font-display text-3xl font-black uppercase tracking-tight">
              We&apos;ll Be In Touch
            </h1>
            <p className="mt-4 text-base text-white/75">
              Thanks for your interest in <strong>{signup.package}</strong>. We
              will reply with scope and pricing within one to two business days.
            </p>
          </>
        ) : showCancelled ? (
          <>
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold">
              No problem
            </p>
            <h1 className="mt-3 font-display text-3xl font-black uppercase tracking-tight">
              Checkout Cancelled
            </h1>
            <p className="mt-4 text-base text-white/75">
              Your details are saved. Come back whenever you&apos;re ready to
              subscribe to <strong>{signup.package}</strong>.
            </p>
            <Link
              href="/#pricing"
              className="mt-8 inline-flex border border-gold/60 px-6 py-3 font-display text-sm font-black uppercase tracking-wide text-gold hover:bg-gold/10"
            >
              View plans
            </Link>
          </>
        ) : showFailed ? (
          <>
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-red">
              Payment not completed
            </p>
            <h1 className="mt-3 font-display text-3xl font-black uppercase tracking-tight">
              Try Again
            </h1>
            <p className="mt-4 text-base text-white/75">
              Your payment for <strong>{signup.package}</strong> did not go
              through. Your details are saved — pick your plan again when
              you&apos;re ready.
            </p>
            <Link
              href="/#pricing"
              className="mt-8 inline-flex border border-gold/60 px-6 py-3 font-display text-sm font-black uppercase tracking-wide text-gold hover:bg-gold/10"
            >
              Back to pricing
            </Link>
          </>
        ) : (
          <>
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Status
            </p>
            <h1 className="mt-3 font-display text-3xl font-black uppercase tracking-tight">
              {signup.package}
            </h1>
            <p className="mt-4 text-base text-white/75">
              Current status: {signup.status.replaceAll("_", " ")}.
            </p>
          </>
        )}

        <p className="mt-8 text-sm text-white/55">
          Questions?{" "}
          <a href="mailto:aya@qwabi.co.za" className="text-gold hover:underline">
            aya@qwabi.co.za
          </a>
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-sm text-white/50 hover:text-gold"
        >
          Back to home
        </Link>
      </main>
      <Footer />
    </>
  );
}
