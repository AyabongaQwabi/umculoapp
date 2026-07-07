import { getFaqs } from "@/data/faqs";
import { getLiveArtists } from "@/data/artists";
import { pricingTiers } from "@/data/pricing";
import {
  LAST_UPDATED,
  ORGANIZATION,
  PARTNERS,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo/site";

export function buildHomeJsonLd() {
  const liveArtists = getLiveArtists();
  const faqs = getFaqs();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: ORGANIZATION.name,
        legalName: ORGANIZATION.legalName,
        url: ORGANIZATION.url,
        logo: {
          "@type": "ImageObject",
          url: ORGANIZATION.logo,
        },
        email: ORGANIZATION.email,
        telephone: ORGANIZATION.phone,
        areaServed: {
          "@type": "Country",
          name: "South Africa",
        },
        sameAs: [
          ORGANIZATION.website,
          PARTNERS.xhosaHipHop.url,
          "https://www.qwabi.co.za",
        ],
        founder: {
          "@type": "Person",
          name: "Ayabonga Qwabi",
          jobTitle: "AI Specialist and Cloud Architect",
          url: ORGANIZATION.website,
        },
        partner: {
          "@type": "Organization",
          name: PARTNERS.xhosaHipHop.name,
          url: PARTNERS.xhosaHipHop.url,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description:
          "Professional music websites for South African artists.",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-ZA",
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "Artist Website South Africa | Umculo",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#service` },
        dateModified: LAST_UPDATED,
        inLanguage: "en-ZA",
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#service`,
        name: "Umculo Artist Website",
        description:
          "Custom-designed music websites for South African artists with SEO, blog, press pages, and hosting on umculo.app.",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: {
          "@type": "Country",
          name: "South Africa",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Umculo website packages",
          itemListElement: pricingTiers.map((tier, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Offer",
              name: tier.name,
              price: tier.priceMonthly.replace(/[^\d]/g, "") || undefined,
              priceCurrency: "ZAR",
              description: tier.features.join(", ") || "Custom quote",
            },
          })),
        },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#portfolio`,
        name: "Live Umculo artist websites",
        itemListElement: liveArtists.map((artist, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "WebSite",
            name: artist.name,
            url: artist.url,
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}
