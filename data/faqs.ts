export interface FaqItem {
  question: string;
  answer: string;
}

export function getFaqs(): FaqItem[] {
  return [
    {
      question: "How do I pay?",
      answer:
        "Choose a plan, fill in the signup form, and continue to Yoco secure checkout. We save your details before payment. After you pay, Yoco sends you back to your signup page and we confirm from there.",
    },
    {
      question: "What if I don't finish checkout?",
      answer:
        "Your signup is still saved when you submit the form. We can see it in our system and follow up if payment was not completed.",
    },
    {
      question: "How much does it cost?",
      answer:
        "Basic Website is R99/month. Website + Blog is R149/month. Website + Music Sales is R199/month. Website + Merch is R399/month. Special projects start from R699/month. No setup fee.",
    },
    {
      question: "What happens after I pay on Yoco?",
      answer:
        "Once payment is confirmed, we email you to collect your bio, photos, music links, and other content. Your site is usually live within about two weeks.",
    },
    {
      question: "How long does a build take?",
      answer:
        "About two weeks from confirmed payment: 2–3 days for design, about one week to build, 2 days for review and launch.",
    },
    {
      question: "Who runs Umculo?",
      answer:
        "Umculo is run by Qwabi Engineering (Namoota Technology Pty Ltd) in partnership with Xhosa Hip Hop. Sites are hosted on yourname.umculo.app.",
    },
  ];
}
