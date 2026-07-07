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
    title: "Custom design",
    description:
      "Built for your brand. Not a one-size-fits-all template.",
  },
  {
    icon: Smartphone,
    title: "Responsive layout",
    description: "Readable and usable on phones, tablets, and desktops.",
  },
  {
    icon: Music2,
    title: "Artist pages",
    description:
      "Bio, music, photo gallery, press kit, and booking contact.",
  },
  {
    icon: FileText,
    title: "Blog",
    description: "Post updates, releases, and news on your own site.",
  },
  {
    icon: Bot,
    title: "Search setup",
    description:
      "Basic SEO so your site can be found on Google and similar tools.",
  },
  {
    icon: Globe,
    title: "Domain and hosting",
    description:
      "Your site runs on yourname.umculo.app. Included in your monthly plan.",
  },
];

export function WhatsIncludedSection() {
  return (
    <section className="border-t border-white/10 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold">
            Included
          </p>
          <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-tight sm:text-4xl">
            What You Get
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-white/65">
            Every plan includes design, hosting, and your umculo.app address.
            Higher tiers add blog, music sales, or merch — see pricing for the
            full list per plan.
          </p>
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
