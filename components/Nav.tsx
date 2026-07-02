"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ApplyCta } from "@/components/ApplyCta";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#artists", label: "Artists" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#apply", label: "Apply" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-black/75 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="#" className="flex items-center gap-3" aria-label="Umculo home">
          <Image
            src="/umculo-logo.png"
            alt=""
            width={40}
            height={40}
            className="h-9 w-9 object-contain sm:h-10 sm:w-10"
            style={{ width: "auto", height: "auto" }}
            priority
          />
          <span className="font-display text-lg font-black uppercase tracking-[0.18em]">
            <span className="text-white">UM</span>
            <span className="text-gold">CULO</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-xs font-bold uppercase tracking-[0.16em] text-white/80 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <ApplyCta compact href="#apply" className="max-w-[11rem]" />
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded border border-white/20 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={cn(
                "block h-0.5 w-5 bg-white transition-transform",
                menuOpen && "translate-y-2 rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 bg-white transition-opacity",
                menuOpen && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 bg-white transition-transform",
                menuOpen && "-translate-y-2 -rotate-45",
              )}
            />
          </div>
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-white/10 bg-black/95 px-4 py-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block font-display text-sm font-bold uppercase tracking-wider"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <ApplyCta compact href="#apply" />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
