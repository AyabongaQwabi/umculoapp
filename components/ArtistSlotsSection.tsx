import Link from "next/link";
import { artists, slotsRemaining, TOTAL_SLOTS } from "@/data/artists";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

function buildSlots() {
  const filled = artists.map((artist) => ({
    type: "artist" as const,
    artist,
  }));
  const openCount = TOTAL_SLOTS - artists.length;
  const openSlots = Array.from({ length: openCount }, (_, i) => ({
    type: "open" as const,
    index: i + 1,
  }));
  return [...filled, ...openSlots];
}

export function ArtistSlotsSection() {
  const slots = buildSlots();

  return (
    <section id="artists" className="border-t border-white/10 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold">
            Artist Roster
          </p>
          <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-tight sm:text-4xl">
            {slotsRemaining} of {TOTAL_SLOTS} Slots Open
          </h2>
          <p className="mt-4 max-w-2xl text-white/70">
            The first batch is capped at ten free builds. Some are already in
            production — a couple are already live.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {slots.map((slot, index) => {
              if (slot.type === "open") {
                return (
                  <li
                    key={`open-${slot.index}`}
                    className="flex min-h-[8.5rem] flex-col justify-between rounded-lg border border-dashed border-gold/40 bg-gold/5 p-5"
                  >
                    <div>
                      <span className="font-display text-xs font-bold uppercase tracking-widest text-gold">
                        Slot {artists.length + slot.index}
                      </span>
                      <p className="mt-2 font-display text-lg font-black uppercase">
                        Open
                      </p>
                    </div>
                    <Link
                      href="#apply"
                      className="text-sm font-semibold text-gold underline-offset-4 hover:underline"
                    >
                      Apply now →
                    </Link>
                  </li>
                );
              }

              const { artist } = slot;
              const isLive = artist.status === "live";

              return (
                <li
                  key={artist.name}
                  className="flex min-h-[8.5rem] flex-col justify-between rounded-lg border border-white/10 bg-white/[0.03] p-5"
                >
                  <div>
                    <span className="font-display text-xs font-bold uppercase tracking-widest text-white/40">
                      Slot {index + 1}
                    </span>
                    <p className="mt-2 font-display text-base font-black uppercase leading-tight">
                      {artist.name}
                    </p>
                    <span
                      className={cn(
                        "mt-3 inline-block rounded-full px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-wider",
                        isLive
                          ? "bg-green/15 text-green"
                          : "bg-red/15 text-red",
                      )}
                    >
                      {isLive ? "Live" : "In Production"}
                    </span>
                  </div>
                  {isLive && artist.url ? (
                    <Link
                      href={artist.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-gold underline-offset-4 hover:underline"
                    >
                      Visit site →
                    </Link>
                  ) : (
                    <span className="text-xs text-white/40">Building…</span>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
