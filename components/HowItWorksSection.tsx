import { Reveal } from "@/components/Reveal";

const steps = [
  {
    number: "01",
    title: "Apply",
    description:
      "Tell us about your music, your lane, and where you're based. Takes a few minutes.",
  },
  {
    number: "02",
    title: "Discovery & Design",
    description:
      "We learn your story and craft a custom look — usually 2–3 days.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Your site comes together with bio, music, press, and blog — about a week.",
  },
  {
    number: "04",
    title: "Test & Launch",
    description:
      "We review together, polish the details, and go live — typically 2 days.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-t border-white/10 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold">
            The Process
          </p>
          <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-tight sm:text-4xl">
            How It Works
          </h2>
        </Reveal>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.number}>
              <Reveal delay={index * 0.06} className="h-full">
                <div className="h-full rounded-lg border border-white/10 p-6">
                  <span className="font-display text-3xl font-black text-gold/80">
                    {step.number}
                  </span>
                  <h3 className="mt-4 font-display text-base font-black uppercase tracking-wide">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
