import { buildHomeJsonLd } from "@/lib/seo/schema";

interface JsonLdProps {
  data?: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  const payload = data ?? buildHomeJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
