import { CreditCard, Globe, Mic2, Search, Smartphone } from "lucide-react";
import { artists, TOTAL_ARTISTS } from "@/data/artists";
import { PARTNERS } from "@/lib/seo/site";
import { ArtistPhoto } from "@/components/ArtistPhoto";
import { Reveal } from "@/components/Reveal";
import { ScrollCta } from "@/components/ScrollCta";
import { TrustBar } from "@/components/TrustBar";

const features = [
  { icon: Globe, label: "Your own yourname.umculo.app address" },
  { icon: Mic2, label: "Bio, music, gallery, and press pages" },
  { icon: Smartphone, label: "Works on phone, tablet, and desktop" },
  { icon: Search, label: "Set up for Google and search engines" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-10">
        <Reveal>
          <p className="mb-6 font-display text-xs font-bold uppercase tracking-[0.22em] text-gold">
            {TOTAL_ARTISTS} South African artist websites built
          </p>
          <h1 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
            Subscribe Today.
            <br />
            <span className="text-gold">Get Your Home On The Internet.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-white/75 sm:text-lg">
            Pick a monthly plan, fill in your details, and pay securely via
            Yoco. We save your signup before payment so we can follow up even
            if checkout is interrupted.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
            By{" "}
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
            . From R99/month. No setup fee.
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-2">
            {features.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-start gap-2.5">
                <Icon
                  className="mt-0.5 h-5 w-5 shrink-0 text-gold"
                  aria-hidden="true"
                />
                <span className="text-sm font-medium text-white/85">
                  {label}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <ScrollCta href="#pricing" className="sm:min-w-[12rem]">
              <span className="inline-flex items-center gap-2">
                <CreditCard className="h-4 w-4" aria-hidden="true" />
                Choose a Plan
              </span>
            </ScrollCta>
            <ScrollCta
              href="#contact"
              variant="secondary"
              className="sm:min-w-[12rem]"
            >
              Sign Up
            </ScrollCta>
          </div>
          <TrustBar className="mt-8 border-x-0" />
        </Reveal>

        <Reveal delay={0.1} className="relative min-h-[22rem] lg:min-h-[28rem]">
          <div
            className="absolute inset-0 rounded-lg bg-cover bg-center grayscale"
            style={{
              backgroundImage:
                "linear-gradient(to right, #000 0%, transparent 30%), url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80')",
            }}
            role="img"
            aria-label="Concert crowd"
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black via-black/40 to-transparent" />

          <div className="absolute inset-x-4 bottom-8 rounded-lg border border-white/10 bg-black/80 p-4 backdrop-blur-sm sm:inset-x-6">
            <p className="mb-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Recent builds
            </p>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-3">
              {artists.map((artist) => (
                <ArtistPhoto key={artist.name} artist={artist} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
