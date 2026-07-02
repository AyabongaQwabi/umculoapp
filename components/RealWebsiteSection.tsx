import Image from "next/image";
import {
  BookOpen,
  Check,
  Megaphone,
  Newspaper,
  Sparkles,
} from "lucide-react";
import { slotsRemaining, TOTAL_SLOTS } from "@/data/artists";
import { PARTNERS } from "@/lib/seo/site";
import { ApplyCta } from "@/components/ApplyCta";
import { BrushBadge } from "@/components/BrushBadge";
import { Reveal } from "@/components/Reveal";

const features = [
  {
    icon: Newspaper,
    title: "Press Ready",
    description: "Give journalists what they need.",
  },
  {
    icon: BookOpen,
    title: "Blog & Updates",
    description: "Share your story. Your way.",
  },
  {
    icon: Megaphone,
    title: "Fan Comms",
    description: "Keep fans informed. Build loyalty.",
  },
  {
    icon: Sparkles,
    title: "Build Your Brand",
    description: "Look professional. Be unforgettable.",
  },
];

const checklist = [
  "Professional artist website",
  "Optimized for Google & AI",
  "Press kit & media ready",
  "Blog, news & announcements",
  "Fan engagement tools",
  "Yours. Forever.",
];

export function RealWebsiteSection() {
  return (
    <section className="border-t border-white/10 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="max-w-3xl font-display text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl">
            A Real Artist Needs A Real Website
          </h2>
          <p className="mt-4 max-w-2xl text-base text-white/75 sm:text-lg">
            Social media is noisy and temporary. A professional musician website
            is your official home for press, blog updates, and fan
            communication — and it helps you get discovered on Google and AI
            search.
          </p>
          <p className="mt-4 text-sm text-white/60">
            See live Umculo builds:{" "}
            <a
              href="https://savage.umculo.app"
              className="text-gold underline-offset-2 hover:underline"
              rel="noopener noreferrer"
            >
              savage.umculo.app
            </a>
            ,{" "}
            <a
              href="https://mzukhona.umculo.app"
              className="text-gold underline-offset-2 hover:underline"
              rel="noopener noreferrer"
            >
              mzukhona.umculo.app
            </a>
            . Programme partners:{" "}
            <a
              href="https://www.qwabi.co.za"
              className="text-gold underline-offset-2 hover:underline"
              rel="noopener noreferrer"
            >
              Qwabi Engineering
            </a>{" "}
            ×{" "}
            <a
              href={PARTNERS.xhosaHipHop.url}
              className="text-gold underline-offset-2 hover:underline"
              rel="noopener noreferrer"
            >
              {PARTNERS.xhosaHipHop.name}
            </a>
            .
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-10">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description }) => (
              <li key={title} className="rounded-lg border border-white/10 p-5">
                <Icon className="h-6 w-6 text-gold" aria-hidden="true" />
                <h3 className="mt-3 font-display text-sm font-black uppercase tracking-wide">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-white/65">{description}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <div className="relative mx-auto max-w-4xl">
            <div className="relative mx-auto w-full max-w-3xl rounded-xl border border-white/15 bg-white/5 p-3 shadow-2xl">
              <div className="overflow-hidden rounded-lg border border-white/10 bg-black">
                <Image
                  src="/screenshots/savage-desktop.png"
                  alt="Screenshot of Yung Savage QTN live site at savage.umculo.app"
                  width={1200}
                  height={750}
                  className="h-auto w-full"
                />
              </div>
            </div>
            <div className="absolute -bottom-8 right-0 w-36 rounded-2xl border-4 border-white/20 bg-black p-1 shadow-xl sm:-right-4 sm:w-44">
              <Image
                src="/screenshots/savage-mobile.png"
                alt="Mobile view of Yung Savage QTN site"
                width={390}
                height={844}
                className="h-auto w-full rounded-xl"
              />
            </div>
          </div>
          <p className="mt-14 text-center text-xs uppercase tracking-widest text-white/40">
            Live site — savage.umculo.app
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-14">
          <div className="mx-auto max-w-2xl rounded-lg border border-gold/50 bg-black p-6 sm:p-8">
            <h3 className="text-center font-display text-lg font-black uppercase tracking-wide sm:text-xl">
              Don&apos;t Just Make Music. Build a Legacy.
            </h3>
            <ul className="mt-6 space-y-3">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm sm:text-base">
                  <Check
                    className="mt-0.5 h-5 w-5 shrink-0 text-green"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-12 flex flex-col items-center gap-6">
          <BrushBadge>
            {slotsRemaining}/{TOTAL_SLOTS} Artist Slots Remaining
          </BrushBadge>
          <ApplyCta />
        </Reveal>
      </div>
    </section>
  );
}
