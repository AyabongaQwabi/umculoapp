import Image from "next/image";
import Link from "next/link";
import { LAST_UPDATED, ORGANIZATION, PARTNERS, SITE_URL } from "@/lib/seo/site";

const footerLinks = [
  { href: "#pricing", label: "Pricing" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#contact", label: "Contact" },
  { href: "#faq", label: "FAQ" },
  { href: "/privacy", label: "Privacy Policy" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Image
              src="/umculo-logo.png"
              alt="Umculo — artist websites for South African musicians"
              width={220}
              height={120}
              className="h-auto w-44 max-w-full"
            />
            <p className="mt-4 text-xs leading-relaxed text-white/50">
              Custom music websites for South African artists. Monthly plans
              from R99. Built by {ORGANIZATION.name} and{" "}
              {PARTNERS.xhosaHipHop.name}.
            </p>
          </div>

          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              Navigate
            </p>
            <ul className="mt-4 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`${SITE_URL}/llms.txt`}
                  className="text-sm text-white/75 transition-colors hover:text-gold"
                >
                  llms.txt
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              Contact
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              <li>
                <a
                  href={`mailto:${ORGANIZATION.email}`}
                  className="transition-colors hover:text-gold"
                >
                  {ORGANIZATION.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${ORGANIZATION.phone}`}
                  className="transition-colors hover:text-gold"
                >
                  +27 60 311 6777
                </a>
              </li>
              <li>
                <a
                  href={ORGANIZATION.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold"
                >
                  business.qwabi.co.za
                </a>
              </li>
              <li>
                <a
                  href={ORGANIZATION.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold"
                >
                  qwabi.co.za
                </a>
              </li>
              <li>
                <a
                  href={PARTNERS.xhosaHipHop.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold"
                >
                  {PARTNERS.xhosaHipHop.name}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 text-center font-display text-xs font-bold uppercase tracking-[0.24em] text-gold">
          Powered by Qwabi Engineering
        </p>

        <p className="mt-6 text-center text-xs text-white/40">
          © {year} {ORGANIZATION.legalName}, trading as {ORGANIZATION.name}
          <br />
          Last updated {LAST_UPDATED}
        </p>
      </div>
    </footer>
  );
}
