import { cn } from "@/lib/utils";

interface BrushBadgeProps {
  children: React.ReactNode;
  className?: string;
  rotate?: "left" | "right" | "none";
}

const rotations = {
  left: "-rotate-2",
  right: "rotate-2",
  none: "",
};

export function BrushBadge({
  children,
  className,
  rotate = "right",
}: BrushBadgeProps) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center px-5 py-2.5 text-gold",
        rotations[rotate],
        className,
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 200 48"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M4 8 C 18 2, 42 4, 68 6 C 95 8, 118 3, 145 7 C 168 10, 186 6, 196 12 L 198 36 C 188 44, 162 40, 138 42 C 112 44, 88 38, 62 40 C 38 42, 18 46, 6 38 Z"
          fill="currentColor"
        />
      </svg>
      <span className="relative z-10 text-center font-display text-[11px] font-black uppercase leading-tight tracking-[0.12em] text-black sm:text-xs">
        {children}
      </span>
    </div>
  );
}
