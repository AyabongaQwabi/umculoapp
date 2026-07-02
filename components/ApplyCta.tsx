import Link from "next/link";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface ApplyCtaProps {
  className?: string;
  compact?: boolean;
  href?: string;
}

export function ApplyCta({
  className,
  compact = false,
  href = "#apply",
}: ApplyCtaProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-stretch overflow-hidden border-[1.5px] border-gold bg-black transition-colors hover:bg-gold/5",
        compact ? "max-w-xs" : "w-full max-w-xl",
        className,
      )}
      aria-label="Apply now for a free Umculo artist website"
    >
      <div className="flex flex-1 items-center gap-3 px-4 py-3 sm:px-5 sm:py-4">
        <Globe
          className="h-5 w-5 shrink-0 text-gold"
          aria-hidden="true"
        />
        <div className="min-w-0">
          <p className="font-display text-sm font-black uppercase tracking-wide text-white sm:text-base">
            Apply Now →
          </p>
          {!compact && (
            <p className="mt-0.5 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 sm:text-xs">
              UMCULO.APP/<span className="text-gold">APPLY</span>
            </p>
          )}
        </div>
      </div>
      {!compact && (
        <>
          <div className="w-px self-stretch bg-gold/60" aria-hidden="true" />
          <div className="hidden items-center px-4 py-3 sm:flex sm:px-5">
            <p className="max-w-[9rem] font-display text-[10px] font-bold uppercase leading-snug tracking-[0.14em] text-white/90">
              Limited Slots.
              <br />
              Big Opportunity.
            </p>
          </div>
        </>
      )}
    </Link>
  );
}
