import Link from "next/link";
import { Check, CreditCard } from "lucide-react";
import {
  PRICING_EXPLAINER,
  YOCO_NOTE,
  pricingTiers,
} from "@/data/pricing";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

export function PricingSection() {
  return (
    <section id="pricing" className="border-t border-white/10 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold">
            Subscribe
          </p>
          <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-tight sm:text-4xl">
            Choose a Plan
          </h2>
          <p className="mt-4 max-w-2xl text-white/70">{PRICING_EXPLAINER}</p>
          <p className="mt-3 flex max-w-2xl items-start gap-2 text-sm text-white/55">
            <CreditCard
              className="mt-0.5 h-4 w-4 shrink-0 text-gold"
              aria-hidden="true"
            />
            {YOCO_NOTE}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {pricingTiers.map((tier, index) => (
            <Reveal key={tier.id} delay={index * 0.04} className="h-full">
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-lg border p-5 sm:p-6",
                  tier.recommended
                    ? "border-gold/60 bg-gold/5"
                    : "border-white/10 bg-white/[0.02]",
                )}
              >
                {tier.recommended ? (
                  <span className="absolute -top-3 left-4 rounded bg-gold px-2 py-0.5 font-display text-[10px] font-black uppercase tracking-wider text-black">
                    Popular
                  </span>
                ) : null}

                <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Tier {index + 1}
                </span>
                <h3 className="mt-2 font-display text-sm font-black uppercase leading-tight tracking-wide sm:text-base">
                  {tier.name}
                </h3>
                <div className="mt-4">
                  <p className="font-display text-2xl font-black text-gold sm:text-3xl">
                    {tier.priceMonthly}
                  </p>
                  {!tier.isCustomQuote ? (
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/50">
                      per month
                    </p>
                  ) : (
                    <p className="mt-1 text-xs text-white/50">
                      price on request
                    </p>
                  )}
                </div>

                {tier.features.length > 0 ? (
                  <ul className="mt-5 flex-1 space-y-2.5 border-t border-white/10 pt-5">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-xs leading-snug text-white/75 sm:text-sm"
                      >
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-5 flex-1 border-t border-white/10 pt-5" />
                )}

                <div className="mt-6">
                  <Link
                    href={`?package=${tier.id}#contact`}
                    className={cn(
                      "block w-full border px-4 py-3 text-center font-display text-xs font-black uppercase tracking-wide transition-colors sm:text-sm",
                      tier.isCustomQuote
                        ? "border-gold/40 text-gold hover:bg-gold/10"
                        : "border-gold bg-gold text-black hover:bg-gold/90",
                    )}
                  >
                    {tier.isCustomQuote ? "Request a quote" : "Subscribe"}
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
