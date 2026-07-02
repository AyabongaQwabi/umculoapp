import { slotsRemaining } from "@/data/artists";

export interface FaqItem {
  question: string;
  answer: string;
}

export function getFaqs(): FaqItem[] {
  return [
    {
      question: "Is it actually free?",
      answer:
        "Yes — for the first ten artists in this batch. You get a custom-designed site, hosting, and your own umculo.app subdomain for two years at no cost. No hidden fees for this launch cohort.",
    },
    {
      question: "What do I need to send you?",
      answer:
        "Bio text, photos, music links (Spotify, YouTube, etc.), social handles, and any press or booking details you want on the site. We'll guide you through the rest during discovery.",
    },
    {
      question: "How long does it take?",
      answer:
        "Roughly two weeks end-to-end: 2–3 days for discovery and design, about a week to build, and 2 days for testing and launch.",
    },
    {
      question: "What if all ten slots are gone?",
      answer: `Right now ${slotsRemaining} slots remain. Once the batch is full, we'll open a waitlist and announce the next phase. Apply now to secure your spot.`,
    },
    {
      question: "Who's behind Umculo?",
      answer:
        "Umculo is built by Qwabi Engineering in partnership with Xhosa Hip Hop — a platform to give South African music artists a real home on the internet, starting with ten free professional websites.",
    },
    {
      question: "What is Umculo?",
      answer:
        "Umculo is a South African programme that builds free, professional music websites for artists — including custom design, SEO optimisation, bio and music pages, a blog, and two years of hosting on your own yourname.umculo.app address.",
    },
  ];
}
