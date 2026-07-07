import { getFaqs } from "@/data/faqs";
import { Reveal } from "@/components/Reveal";

export function FaqSection() {
  const faqs = getFaqs();

  return (
    <section
      id="faq"
      className="border-t border-white/10 py-20 sm:py-24"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gold">
            Questions
          </p>
          <h2
            id="faq-heading"
            className="mt-3 font-display text-3xl font-black uppercase tracking-tight sm:text-4xl"
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-sm text-white/65">
            Answers about pricing, timelines, and how Umculo works.
          </p>
        </Reveal>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 0.04}>
              <details className="group rounded-lg border border-white/10 bg-white/[0.02] open:bg-white/[0.03]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-sm font-bold uppercase tracking-wide sm:text-base">
                    {faq.question}
                  </span>
                  <span
                    className="text-gold transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </summary>
                <div className="border-t border-white/10 px-5 py-4">
                  <p className="text-sm leading-relaxed text-white/70">
                    {faq.answer}
                  </p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
