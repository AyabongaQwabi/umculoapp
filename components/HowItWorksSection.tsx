import { CreditCard } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const steps = [
  "Choose a plan and fill in the signup form",
  "We save your details immediately, then send you to Yoco",
  "After payment is confirmed, we email you to collect content",
  "Your site goes live in about two weeks",
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="border-t border-white/10 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold">
            Simple process
          </p>
          <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-tight sm:text-4xl">
            How It Works
          </h2>
        </Reveal>

        <Reveal delay={0.04}>
          <div className="mt-12 rounded-lg border border-gold/50 bg-gold/5 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <CreditCard className="h-6 w-6 text-gold" aria-hidden="true" />
              <h3 className="font-display text-lg font-black uppercase tracking-wide">
                Sign up and subscribe
              </h3>
            </div>
            <p className="mt-3 text-sm text-white/70">
              Fill in the signup form, pay on Yoco, and return here. We confirm
              your payment and email you to collect content for your build.
            </p>
            <ol className="mt-6 space-y-4">
              {steps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm text-white/80">
                  <span className="font-display text-sm font-black text-gold">
                    {index + 1}.
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
