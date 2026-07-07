import {
  Bot,
  CircleDollarSign,
  Gauge,
  LayoutTemplate,
  Search,
  Shield,
  Smartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { icon: LayoutTemplate, label: "Custom Design" },
  { icon: Search, label: "Search Setup" },
  { icon: Gauge, label: "Fast Loading" },
  { icon: Smartphone, label: "Mobile Friendly" },
  { icon: CircleDollarSign, label: "No Setup Fee" },
] as const;

interface TrustBarProps {
  className?: string;
}

export function TrustBar({ className }: TrustBarProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-y-3 border-y border-white/10 py-4",
        className,
      )}
      role="list"
      aria-label="Site features"
    >
      {items.map(({ icon: Icon, label }, index) => (
        <div key={label} className="flex items-center" role="listitem">
          {index > 0 && (
            <div
              className="mx-3 hidden h-6 w-px bg-white/15 sm:block"
              aria-hidden="true"
            />
          )}
          <div className="flex items-center gap-2 px-2 sm:px-0">
            <Icon className="h-4 w-4 text-gold" aria-hidden="true" />
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white/80 sm:text-xs">
              {label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export { Bot, Shield };
