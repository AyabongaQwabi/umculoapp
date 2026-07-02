import Image from "next/image";
import Link from "next/link";
import type { Artist } from "@/data/artists";
import { cn } from "@/lib/utils";

interface ArtistPhotoProps {
  artist: Artist;
  size?: "sm" | "md";
}

export function ArtistPhoto({ artist, size = "sm" }: ArtistPhotoProps) {
  const isLive = artist.status === "live";
  const dimension = size === "sm" ? 72 : 96;

  const photo = (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "relative overflow-hidden rounded-md border border-gold",
          size === "sm" ? "h-[72px] w-[72px]" : "h-24 w-24",
        )}
      >
        {artist.photo ? (
          <Image
            src={artist.photo}
            alt={artist.name}
            width={dimension}
            height={dimension}
            className={cn(
              "h-full w-full object-cover",
              !isLive && "grayscale contrast-125",
            )}
            style={
              !isLive
                ? {
                    filter: "grayscale(1) sepia(1) saturate(4) hue-rotate(-15deg)",
                  }
                : undefined
            }
          />
        ) : (
          <div
            className={cn(
              "flex h-full w-full items-center justify-center bg-white/5 font-display text-lg font-black uppercase",
              !isLive && "text-red/90",
              isLive && "text-gold",
            )}
            aria-hidden="true"
          >
            {artist.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)}
          </div>
        )}
      </div>
      <p className="max-w-[5.5rem] text-center font-display text-[10px] font-bold uppercase leading-tight tracking-wide">
        {artist.name}
      </p>
    </div>
  );

  if (isLive && artist.url) {
    return (
      <Link
        href={artist.url}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-opacity hover:opacity-80"
      >
        {photo}
      </Link>
    );
  }

  return photo;
}
