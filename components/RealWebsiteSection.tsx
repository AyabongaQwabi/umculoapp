import Image from "next/image";
import { BookOpen, Check, Megaphone, Newspaper } from "lucide-react";
import { getLiveArtists } from "@/data/artists";
import {
  getStandardSiteIncludes,
  HIGHER_TIER_INCLUDES_NOTE,
} from "@/data/pricing";
import { PARTNERS } from "@/lib/seo/site";
import { Reveal } from "@/components/Reveal";
import { ScrollCta } from "@/components/ScrollCta";

const features = [
  {
    icon: Newspaper,
    title: "Press page",
    description:
      "One link for journalists — bio, photos, and contact details in one place.",
  },
  {
    icon: BookOpen,
    title: "Blog",
    description:
      "Post news, releases, and show dates on your own site, not only on social media.",
  },
  {
    icon: Megaphone,
    title: "Fan updates",
    description:
      "Share announcements on a page you control. No algorithm deciding who sees it.",
  },
  {
    icon: Newspaper,
    title: "Search visibility",
    description:
      "Your site can show up on Google when people search your name or music.",
  },
];

const checklist = getStandardSiteIncludes();

function formatLiveSiteUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function RealWebsiteSection() {
  const liveArtists = getLiveArtists();
  return (
    <section className="border-t border-white/10 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="max-w-3xl font-display text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl">
            Your Own Website, Not Just Social Media
          </h2>
          <p className="mt-4 max-w-2xl text-base text-white/75 sm:text-lg">
            Social accounts are useful, but you do not own them. A website is
            yours — a fixed address for press, fans, and search engines to find
            your music, bio, and contact details.
          </p>
          <p className="mt-4 text-sm text-white/60">
            Live sites:{" "}
            {liveArtists.map((artist, index) => (
              <span key={artist.url}>
                {index > 0 ? ", " : null}
                <a
                  href={artist.url}
                  className="text-gold underline-offset-2 hover:underline"
                  rel="noopener noreferrer"
                >
                  {formatLiveSiteUrl(artist.url)}
                </a>
              </span>
            ))}
            . Built by{" "}
            <a
              href="https://www.qwabi.co.za"
              className="text-gold underline-offset-2 hover:underline"
              rel="noopener noreferrer"
            >
              Qwabi Engineering
            </a>{" "}
            and{" "}
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
            savage.umculo.app — desktop and mobile
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-14">
          <div className="mx-auto max-w-2xl rounded-lg border border-gold/50 bg-black p-6 sm:p-8">
            <h3 className="text-center font-display text-lg font-black uppercase tracking-wide sm:text-xl">
              Standard Site Includes
            </h3>
            <ul className="mt-6 space-y-3">
              {checklist.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm sm:text-base"
                >
                  <Check
                    className="mt-0.5 h-5 w-5 shrink-0 text-green"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
              <li className="flex items-start gap-3 text-sm text-white/70 sm:text-base">
                <span className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <span>{HIGHER_TIER_INCLUDES_NOTE}</span>
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal
          delay={0.2}
          className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <ScrollCta href="#pricing">Choose a Plan</ScrollCta>
          <ScrollCta href="#contact" variant="secondary" className="sm:min-w-[12rem]">
            Sign Up
          </ScrollCta>
        </Reveal>
      </div>
    </section>
  );
}
