import {
  Globe,
  Mic2,
  Search,
  Users,
} from "lucide-react";
import { artists, slotsRemaining, TOTAL_SLOTS } from "@/data/artists";
import { LAST_UPDATED, PARTNERS } from "@/lib/seo/site";
import { ApplyCta } from "@/components/ApplyCta";
import { ArtistPhoto } from "@/components/ArtistPhoto";
import { BrushBadge } from "@/components/BrushBadge";
import { Reveal } from "@/components/Reveal";
import { TaglineEyebrow } from "@/components/TaglineEyebrow";
import { TrustBar } from "@/components/TrustBar";

const features = [
  { icon: Globe, label: "Own Your Story" },
  { icon: Mic2, label: "Showcase Your Music" },
  { icon: Users, label: "Grow Your Fanbase" },
  { icon: Search, label: "Get Discovered on Google & AI" },
];

export function Hero() {
  const previewArtists = artists.slice(0, 6);

  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-10">
        <Reveal>
          <TaglineEyebrow className="mb-6 justify-start" />
          <h1 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
            Every Artist
            <br />
            Deserves a <span className="text-gold">Home</span>
            <br />
            on the Internet.
          </h1>
          <p className="mt-6 max-w-lg text-base text-white/75 sm:text-lg">
            Build your own professional music website for{" "}
            <span className="font-semibold text-gold">FREE</span>.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
            <strong className="text-white">Umculo</strong> is a free artist
            website programme for South African musicians — custom design, SEO,
            and{" "}
            <span className="text-white/85">yourname.umculo.app</span> hosting
            for two years. Built by{" "}
            <a
              href="https://www.qwabi.co.za"
              className="text-gold underline-offset-2 hover:underline"
              rel="noopener noreferrer"
            >
              Qwabi Engineering
            </a>{" "}
            with{" "}
            <a
              href={PARTNERS.xhosaHipHop.url}
              className="text-gold underline-offset-2 hover:underline"
              rel="noopener noreferrer"
            >
              {PARTNERS.xhosaHipHop.name}
            </a>
            .{" "}
            <span className="text-white/50">
              Updated {LAST_UPDATED}. {slotsRemaining} of {TOTAL_SLOTS} slots
              open.
            </span>
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-2">
            {features.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-start gap-2.5">
                <Icon
                  className="mt-0.5 h-5 w-5 shrink-0 text-gold"
                  aria-hidden="true"
                />
                <span className="text-sm font-medium text-white/85">{label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 space-y-6">
            <ApplyCta />
            <TrustBar className="border-x-0" />
          </div>
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

          <div className="absolute right-2 top-2 sm:right-4 sm:top-4">
            <BrushBadge rotate="right">
              Only {TOTAL_SLOTS} Free Websites Available!
            </BrushBadge>
          </div>

          <div className="absolute inset-x-4 bottom-20 rounded-lg border border-white/10 bg-black/80 p-4 backdrop-blur-sm sm:inset-x-6">
            <p className="mb-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Artists in Progress:
            </p>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-3">
              {previewArtists.map((artist) => (
                <ArtistPhoto key={artist.name} artist={artist} />
              ))}
            </div>
          </div>

          <div className="absolute bottom-4 right-2 sm:right-4">
            <BrushBadge rotate="left">
              {slotsRemaining}/{TOTAL_SLOTS} Artist Slots Remaining
            </BrushBadge>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
