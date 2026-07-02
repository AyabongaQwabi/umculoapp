import {
  Bot,
  FileText,
  Globe,
  LayoutTemplate,
  Music2,
  Smartphone,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

const included = [
  {
    icon: LayoutTemplate,
    title: "Custom-designed",
    description: "Not templated — built around your brand and story.",
  },
  {
    icon: Smartphone,
    title: "Fully responsive",
    description: "Looks sharp on phones, tablets, and desktops.",
  },
  {
    icon: Music2,
    title: "Bio, music, gallery, press & booking",
    description: "Everything a working artist needs in one place.",
  },
  {
    icon: FileText,
    title: "Built-in blog",
    description: "Share news, drops, and updates on your own terms.",
  },
  {
    icon: Bot,
    title: "SEO + AI-discovery optimisation",
    description: "Built to be found on Google and AI search tools.",
  },
  {
    icon: Globe,
    title: "Free hosting & your own address",
    description: "Yourname.umculo.app — hosted free for 2 years.",
  },
];

export function WhatsIncludedSection() {
  return (
    <section className="border-t border-white/10 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold">
            The Package
          </p>
          <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-tight sm:text-4xl">
            What&apos;s Included
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {included.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={index * 0.05} className="h-full">
                <div className="h-full rounded-lg border border-white/10 p-6">
                  <item.icon className="h-6 w-6 text-gold" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-sm font-black uppercase tracking-wide">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/65">{item.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
