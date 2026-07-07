"use client";

import Link from "next/link";
import type { PackageId } from "@/data/pricing";
import { cn } from "@/lib/utils";

interface ScrollCtaProps {
  packageId?: PackageId;
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  intent?: "pay-later" | "quote";
}

export function ScrollCta({
  packageId,
  href,
  children,
  className,
  variant = "primary",
  intent,
}: ScrollCtaProps) {
  const resolvedHref =
    href ??
    (() => {
      const params = new URLSearchParams();
      if (packageId) params.set("package", packageId);
      if (intent) params.set("intent", intent);
      const query = params.toString();
      return query ? `?${query}#contact` : "#contact";
    })();

  return (
    <Link
      href={resolvedHref}
      className={cn(
        "inline-flex items-center justify-center px-6 py-3 font-display text-sm font-black uppercase tracking-wide transition-colors",
        variant === "primary" &&
          "border-[1.5px] border-gold bg-gold text-black hover:bg-gold/90",
        variant === "secondary" &&
          "border border-white/20 bg-white/5 text-white hover:border-gold/40 hover:bg-gold/5",
        variant === "outline" &&
          "border border-gold/60 text-gold hover:bg-gold/10",
        className,
      )}
    >
      {children}
    </Link>
  );
}
