# AEO / GEO — Answer Engine & Generative Engine Optimization

This document tracks what `umculoapp` (the flagship platform at `umculo.app`) does
to be discoverable, correctly understood, and citable by AI answer engines
(ChatGPT, Perplexity, Claude, Gemini, Copilot) — not just traditional search.

**Why this app matters most for AEO/GEO across the network:** umculo.app is the
parent brand and entity hub for the whole Umculo ecosystem — the artist
subdomains (`ndlulamthi.umculo.app`, `mzukhona.umculo.app`, `savage.umculo.app`,
and future sites like flashikumkani, djntsira, gxarha, pdotO) all point back
here for pricing, operator identity, and legal/contact info. Getting the
Organization entity right here is what lets AI systems correctly associate the
entire roster with a single, well-described brand instead of treating each
artist site as an unrelated one-off.

## 1. AI crawler access (`app/robots.ts`)

All major AI crawlers are explicitly allowed (not just left to the wildcard
rule), so the intent is unambiguous to anyone reading robots.txt by hand or
with a bot:

- **Training crawlers:** `GPTBot` (OpenAI), `ClaudeBot` / `anthropic-ai`
  (Anthropic), `Google-Extended` (Gemini), `Bytespider` (ByteDance), `CCBot`
  (Common Crawl / open dataset used by many LLM labs), `Meta-ExternalAgent`,
  `Applebot-Extended`.
- **Real-time browsing / citation crawlers:** `ChatGPT-User`, `OAI-SearchBot`,
  `PerplexityBot`, `Perplexity-User`, `Claude-User`, `Claude-SearchBot`.
- **Traditional search:** `Googlebot`, `Bingbot` (also covered by the
  wildcard `*` rule).

Decision: allow all of them. As the entity hub for the network, visibility in
AI answers is a growth channel, not a risk — there is no proprietary or paywalled
content here to protect from training crawlers.

Disallowed for every user agent: `/api/`, `/_next/`, `/admin` (Basic Auth
protected internal tool), and `/signup/` (per-user checkout status pages,
already `noindex` in their own metadata — excluded from robots too so crawlers
don't waste budget on non-indexable, user-specific URLs).

## 2. Machine-readable content

- **`public/llms.txt`** — a concise, structured summary of what Umculo is,
  pricing tiers, the operator, contact channels, and links to live artist
  sites. This is the single best "citation-ready" artifact on the site: short,
  factual, numbers-first, exactly the shape LLMs quote well.
- **`public/offer.md`** — pricing table in Markdown, referenced from
  `MACHINE_READABLE_ASSETS` in `lib/seo/routes.ts` and explicitly allowed in
  `robots.ts` for every crawler.
- Both files are linked from the site (Footer) and reachable without
  JavaScript, so any crawler — including ones that don't render JS — can read
  them on the first request.

## 3. Entity clarity via structured data (`lib/seo/schema.ts`)

The homepage emits a single JSON-LD `@graph` (not scattered fragments) so an
AI system parsing the page gets one coherent entity picture:

- **Organization** (`#organization`) — legal name, trading name, founder,
  contact point, `areaServed: South Africa`, and `sameAs` linking to the
  operator's business site, the Xhosa Hip Hop partner, and **every live
  artist subdomain** (`ndlulamthi.umculo.app`, `mzukhona.umculo.app`,
  `savage.umculo.app`). This is the key GEO move for a parent-brand hub: it
  tells crawlers these subdomains are the same network, not unrelated sites.
- **WebSite** (`#website`) — ties the page to the Organization as publisher.
- **Service** (`#service`) — the actual offering (subscription artist
  websites) with an `OfferCatalog` mirroring the real pricing tiers in
  `data/pricing.ts` (kept as the single source of truth — no duplicated
  numbers to drift out of sync).
- **ItemList** (`#portfolio`) — the live artist roster as a list of `WebSite`
  entities, giving AI systems a structured way to enumerate "what sites does
  Umculo run" rather than inferring it from prose.
- **FAQPage** (`#faq`) — answer-first Q&A pulled from `data/faqs.ts`, covering
  the exact questions a prospective artist or an AI assistant answering "how
  do I pay Umculo" / "how much does Umculo cost" would need. (Google no longer
  grants FAQ rich results outside gov/health sites, but FAQPage markup is
  still valuable as clean, extractable Q&A structure for AI answer engines,
  which is the primary reason to keep it here.)
- **BreadcrumbList** — added to `/privacy` via `buildBreadcrumbJsonLd()` in
  `lib/seo/schema.ts`, establishing explicit site hierarchy for the one
  secondary indexable page.

All `@id`/`url` fields resolve through `SITE_URL`
(`process.env.NEXT_PUBLIC_SITE_URL`, see below) rather than a hardcoded
domain, so staging/preview deployments emit correct, non-colliding entity IDs.

## 4. Canonical base URL

`SITE_URL` in `lib/seo/site.ts` reads `NEXT_PUBLIC_SITE_URL` (falls back to
`http://localhost:3000` for local dev). Set in `.env.local` for this machine
and documented with the real production value as the example default in
`.env.example`. Every canonical URL, sitemap entry, robots directive, and
JSON-LD `@id`/`url` field is derived from this single constant — changing
environments (or eventually moving domains) requires touching one line, not
grepping the codebase.

## 5. Content shape for citation-worthiness

Per the Princeton GEO research (cited in the `seo-geo` skill): statistics,
authoritative tone, and fluency give the largest visibility boosts, while
keyword stuffing hurts. The existing copy already leans this way —
`data/faqs.ts` gives specific prices ("R99/month", "about two weeks"), and the
Hero states a concrete artist count (`{TOTAL_ARTISTS} South African artist
websites built`) rather than vague claims. The H1 was adjusted to
`"Your Artist Website, South Africa."` to carry the primary keyword
(`artist website South Africa`, already the site's `PRIMARY_KEYWORD` constant
and `<title>`) into the page's single most-weighted on-page signal, while
keeping the existing brand line as a supporting subhead.

## 6. What was deliberately not done

- **No fake programmatic pages.** This app is a single-page signup/marketing
  site plus two utility pages (`/privacy`, per-signup `/signup/[id]` status
  pages that are intentionally `noindex`). There is no artist/release/event
  content model living in *this* app — that content lives in the individual
  artist sites (flashikumkani, djntsira, gxarha, pdotO, yung-savage-qtn).
  Scaffolding `/artists/[slug]` routes here with only six roster entries (three
  of them not yet live) would produce thin, low-value pages and fails the
  programmatic-SEO quality gate ("would this page be worth publishing on its
  own"). If the roster grows materially and each artist gets a real profile's
  worth of unique content (bio, press, release history) *on umculo.app itself*
  rather than just linking out to their subdomains, that would be the trigger
  to revisit this.
- **No WebSite `SearchAction`.** There is no on-site search functionality, so
  adding `SearchAction` schema would be inaccurate structured data.
- **No fabricated social `sameAs` links.** Sub-artist sites in this
  monorepo mostly have placeholder (`#` or generic root) social links rather
  than verified handles for the Umculo brand itself, so none were invented
  here. Only real, verifiable URLs are in the Organization's `sameAs`.
