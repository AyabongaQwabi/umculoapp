import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { LAST_UPDATED, ORGANIZATION } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Umculo.app — how Qwabi Engineering handles artist application data and website usage.",
  alternates: {
    canonical: "/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-28 sm:px-6">
        <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold">
          Legal
        </p>
        <h1 className="mt-3 font-display text-3xl font-black uppercase tracking-tight sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-white/60">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="prose-invert mt-10 space-y-6 text-sm leading-relaxed text-white/75 sm:text-base">
          <p>
            Umculo.app is operated by {ORGANIZATION.legalName}, trading as{" "}
            {ORGANIZATION.name} (&quot;we&quot;, &quot;us&quot;). This policy
            explains how we handle information when you apply for a free artist
            website or contact us.
          </p>

          <section>
            <h2 className="font-display text-lg font-black uppercase tracking-wide text-white">
              Information we collect
            </h2>
            <p className="mt-3">
              When you contact us via WhatsApp, email, or phone, we may receive
              your artist or stage name, contact details, links to your music,
              and any message you choose to share. We use this only to evaluate
              your application and build your website if you are selected.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-black uppercase tracking-wide text-white">
              How we use your information
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>To review and respond to artist applications</li>
              <li>To design, build, and host your Umculo artist website</li>
              <li>To communicate about your project status and launch</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-black uppercase tracking-wide text-white">
              Sharing
            </h2>
            <p className="mt-3">
              We do not sell your personal information. We may use trusted
              hosting and infrastructure providers to operate Umculo artist
              sites. Public artist websites may display information you provide
              for promotional purposes (bio, music, photos, press details).
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-black uppercase tracking-wide text-white">
              Your rights
            </h2>
            <p className="mt-3">
              You may request access to, correction of, or deletion of personal
              information we hold about you by emailing{" "}
              <a href={`mailto:${ORGANIZATION.email}`} className="text-gold">
                {ORGANIZATION.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-black uppercase tracking-wide text-white">
              Contact
            </h2>
            <p className="mt-3">
              {ORGANIZATION.legalName}, trading as {ORGANIZATION.name}
              <br />
              Email:{" "}
              <a href={`mailto:${ORGANIZATION.email}`} className="text-gold">
                {ORGANIZATION.email}
              </a>
              <br />
              Phone:{" "}
              <a href={`tel:${ORGANIZATION.phone}`} className="text-gold">
                {ORGANIZATION.phone}
              </a>
            </p>
          </section>
        </div>

        <Link
          href="/"
          className="mt-12 inline-flex font-display text-sm font-bold uppercase tracking-wider text-gold hover:underline"
        >
          ← Back to home
        </Link>
      </main>
      <Footer />
    </>
  );
}
