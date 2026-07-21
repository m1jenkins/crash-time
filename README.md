# Spur Auto — Independent Total-Loss Appraisals

A complete website + business plan for a niche independent appraisal service:
certified total-loss vehicle valuation reports that help consumers challenge
low insurance settlements.

## What's here

| Path | Purpose |
|---|---|
| `index.html` | Homepage — fairness-led hero, founder intro, trust bar, stats, CTAs |
| `how-it-works.html` | 3-step customer process + the 3-chapter report structure |
| `pricing.html` | $99 Essential, $299 Guided, $299 Specialty, $449 combined package, priority delivery, and B2B program |
| `results.html` | Before/after case results, stats bar, testimonials |
| `about.html` | Founder story, credentials, values, giving-back program |
| `free-review.html` | Web3Forms-backed lead-capture form for the free tier |
| `thank-you.html` | Owned success page for confirmed free-review submissions |
| `privacy.html` / `terms.html` / `disclaimer.html` | Privacy, service terms, and appraisal disclaimer |
| `css/styles.css` | Shared stylesheet (no frameworks, fully responsive) |
| `js/main.js` | Mobile nav + form enhancements |
| `data/states.json` | Master JSON database of states and cities for SSG |
| `templates/` | HTML templates for state hub and city pages |
| `scripts/build.js` | Static site generator script |
| `AGENTS.md` | Guide for LLMs and developers on managing SSG pages |
| `BUSINESS-PLAN.md` | Full business plan: market, pricing, unit economics, GTM, risks |

## Build system & Static Site Generator (SSG)

To add or update state and city pages, edit `data/states.json` and run:

```bash
npm run validate
npm run test:seo
npm run build
npm run audit:seo
```

Validation runs before any generated output changes. The build renders published routes in a temporary directory, verifies the result, then replaces generated HTML under `states/` and rebuilds `sitemap.xml` from the indexable canonical inventory. Static and draft routes are skipped. See [`AGENTS.md`](AGENTS.md) for the route schema and full instructions.

## Running locally

It's a static site — open `index.html` in a browser, or:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```


## Before launch — replace the placeholders

Sample/placeholder content is marked with HTML comments in the source. At minimum:

1. **Trust bar** (`index.html`) — replace bracketed outlets with *real* media
   features only.
2. **Stats & testimonials** (`index.html`, `results.html`) — replace illustrative
   figures and sample quotes with documented results and client-permissioned quotes.
3. **Credentials** (`about.html`) — replace with the founder's actual, verifiable
   certifications and license numbers.
4. **Legal pages** — keep the effective dates, service terms, and privacy practices
   current as the business and vendors change.
5. **Lead forms** (`index.html`, `free-review.html`) — connected to Web3Forms;
   replace the access key if you create a different Web3Forms project.
6. **OpenAI Ads Pixel** (`js/ads-conversions.js`) — replace
   `REPLACE_WITH_OPENAI_ADS_PIXEL_ID` with the Pixel ID from Ads Manager before
   deployment, then bump the `?v=` value on its three script tags because JS
   assets use immutable caching. The `lead_created` event fires only on
   `thank-you.html` after a successful Web3Forms redirect.
7. **Social profiles** — add social links only after real business profiles are live.
