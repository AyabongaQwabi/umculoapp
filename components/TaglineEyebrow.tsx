import { cn } from "@/lib/utils";

interface TaglineEyebrowProps {
  className?: string;
}

export function TaglineEyebrow({ className }: TaglineEyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center justify-center gap-3 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-white/80 sm:text-xs",
        className,
      )}
    >
      <span className="h-px w-6 bg-gold/70" aria-hidden="true" />
      <span>
        Every Artist Deserves a{" "}
        <span className="text-gold">Home</span> on the Internet.
      </span>
      <span className="h-px w-6 bg-gold/70" aria-hidden="true" />
    </p>
  );
}
