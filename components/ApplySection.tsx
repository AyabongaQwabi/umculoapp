import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import {
  APPLY_EMAIL,
  buildWhatsAppLink,
  MAILTO_LINK,
  PHONE_NUMBER,
  TEL_LINK,
} from "@/lib/apply";
import { slotsRemaining } from "@/data/artists";
import { Reveal } from "@/components/Reveal";

export function ApplySection() {
  return (
    <section id="apply" className="border-t border-white/10 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold">
            Limited Slots
          </p>
          <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-tight sm:text-4xl">
            Apply for Your Free Site
          </h2>
          <p className="mt-4 text-base text-white/75 sm:text-lg">
            {slotsRemaining} slots left in the first batch. Reach out and tell
            us who you are and what you&apos;re building — we&apos;ll take it
            from there.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <Link
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 rounded-lg border-2 border-gold bg-gold/10 p-6 transition-colors hover:bg-gold/15 sm:p-8"
          >
            <MessageCircle
              className="mt-0.5 h-7 w-7 shrink-0 text-gold"
              aria-hidden="true"
            />
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold">
                Primary contact
              </p>
              <p className="mt-2 font-display text-xl font-black uppercase tracking-wide sm:text-2xl">
                Chat on WhatsApp
              </p>
              <p className="mt-2 text-sm text-white/70">
                Fastest way to apply — message us with your artist name, links,
                and what you need.
              </p>
              <p className="mt-4 font-display text-sm font-bold uppercase tracking-wider text-gold group-hover:underline">
                Open WhatsApp →
              </p>
            </div>
          </Link>
        </Reveal>

        <Reveal delay={0.12} className="mt-6 grid gap-4 sm:grid-cols-2">
          <a
            href={MAILTO_LINK}
            className="group flex items-start gap-4 rounded-lg border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-gold/40 hover:bg-gold/5"
          >
            <Mail
              className="mt-0.5 h-5 w-5 shrink-0 text-gold"
              aria-hidden="true"
            />
            <div>
              <p className="font-display text-sm font-black uppercase tracking-wide">
                Email
              </p>
              <p className="mt-2 text-sm text-white/70">{APPLY_EMAIL}</p>
              <p className="mt-3 font-display text-xs font-bold uppercase tracking-wider text-gold group-hover:underline">
                Send email →
              </p>
            </div>
          </a>

          <a
            href={TEL_LINK}
            className="group flex items-start gap-4 rounded-lg border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-gold/40 hover:bg-gold/5"
          >
            <Phone
              className="mt-0.5 h-5 w-5 shrink-0 text-gold"
              aria-hidden="true"
            />
            <div>
              <p className="font-display text-sm font-black uppercase tracking-wide">
                Call
              </p>
              <p className="mt-2 text-sm text-white/70">{PHONE_NUMBER}</p>
              <p className="mt-3 font-display text-xs font-bold uppercase tracking-wider text-gold group-hover:underline">
                Call now →
              </p>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
