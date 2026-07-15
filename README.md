# Totaled Texas — Independent Total-Loss Appraisals

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
| `privacy.html` / `terms.html` / `disclaimer.html` | Privacy, service terms, and appraisal disclaimer |
| `css/styles.css` | Shared stylesheet (no frameworks, fully responsive) |
| `js/main.js` | Mobile nav + form enhancements |
| `BUSINESS-PLAN.md` | Full business plan: market, pricing, unit economics, GTM, risks |

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
6. **Social profiles** — add social links only after real business profiles are live.
