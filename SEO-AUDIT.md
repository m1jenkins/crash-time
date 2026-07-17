# Totaled Texas SEO Audit — Texas Total Loss Focus

**Date:** July 14, 2026
**Goal:** Rank for searches by people in major Texas cities who want more money
for their car after a total loss accident.

---

## 1. What people actually search for

Search behavior in this niche follows the emotional arc of a claim. Grouped by
intent, highest-value first:

### A. "The offer is too low" (highest intent — they're ready to act)
- *insurance offered me less than my car is worth*
- *totaled car offer too low* / *lowball total loss offer*
- *how to negotiate a total loss settlement*
- *dispute total loss claim* / *disagree with total loss value*
- *can I negotiate with insurance on totaled car*

### B. Service + city (highest commercial intent — this is where competitors rank)
- *total loss appraisal Houston* / *total loss appraiser Dallas* (etc.)
- *independent auto appraiser near me*
- *car appraisal for insurance claim [city]*
- Competitors (SnapClaim, Appraisal Engine/totallossappraisals.com, AutoLoss,
  Total Loss Disputes, Houston Auto Appraisers) all run **city-level landing
  pages for exactly these terms** — Houston, Dallas, Fort Worth, San Antonio,
  Austin, El Paso.

### C. Texas law & rights (research phase — great for building topical authority)
- *Texas total loss law* / *when is a car totaled in Texas* (100% threshold)
- *Texas right to appraisal* / *appraisal clause Texas* / **SB 458** — new law:
  appraisal clause mandatory in personal auto policies issued or renewed on or
  after Jan 1, 2026. Search volume for this is new and growing; TDI will require
  right-to-appraisal notices at renewal starting late 2026, which will drive
  even more searches.
- *diminished value claim Texas* / *Texas diminished value statute of limitations*
  (2 years from date of loss)
- *actual cash value dispute* / *ACV vs market value*

### D. Situational long-tail (FAQ / content targets)
- *car totaled not my fault, insurance won't pay enough*
- *hail totaled my car* (huge in DFW — "hail alley"), *flooded car total loss*
  (Houston)
- *what happens if I don't accept total loss offer*
- *does insurance pay sales tax on totaled car in Texas*

**Key strategic insight:** Independent-appraisal data cited across the industry
shows invoking appraisal raises total loss settlements by roughly $3,600–$5,800
per claim on average — and Texas just made the appraisal clause universal
(SB 458). "Texas + appraisal clause + total loss" is a rising-tide keyword
cluster Totaled Texas should own early.

---

## 2. Audit findings (before this change)

| # | Finding | Severity |
|---|---------|----------|
| 1 | **No geographic signals anywhere.** No page mentioned Texas or any city; impossible to rank for "…in Houston/Dallas" queries. | Critical |
| 2 | **No city landing pages** — the primary battleground where all competitors rank. | Critical |
| 3 | Titles/descriptions were brand-led ("Totaled Texas — Independent Auto Claims Advocacy") instead of keyword-led; "total loss" appeared in no title. | High |
| 4 | No structured data (Organization/Service/FAQ schema) — no eligibility for rich results. | High |
| 5 | No `sitemap.xml` or `robots.txt`. | High |
| 6 | No canonical URLs, no Open Graph/Twitter metadata. | Medium |
| 7 | No content targeting research-phase queries (Texas law, appraisal clause, diminished value rules). | Medium |
| 8 | Good foundations already in place: clean semantic HTML, one `<h1>` per page, fast static site, mobile responsive, and `noindex` legal utility pages. | ✅ |

---

## 3. What was implemented

### Sitewide
- **Keyword-led titles & meta descriptions** on every indexable page
  (e.g. homepage: "Total Loss & Diminished Value Appraisals in Texas | Totaled Texas").
- **Canonical URLs + Open Graph/Twitter tags** on every indexable page.
- **`ProfessionalService` JSON-LD** on the homepage with `areaServed` for Texas
  and the six target cities.
- **`robots.txt` + `sitemap.xml`.**
- **Internal linking:** "Texas" added to main nav; "Texas Cities" column added to
  the footer of every page; homepage gained a "Serving all of Texas" section
  linking to each city page with keyword anchor text.

### New pages (8)
| Page | Primary keyword targets |
|---|---|
| `texas.html` (hub) | texas total loss law, texas right to appraisal, SB 458, dispute total loss claim texas, diminished value texas |
| `total-loss-appraisal-houston.html` | total loss appraisal houston, dispute totaled car offer houston (+ flood/storm angle) |
| `total-loss-appraisal-dallas.html` | total loss appraisal dallas (+ hail-total angle) |
| `total-loss-appraisal-fort-worth.html` | total loss appraisal fort worth (+ Tarrant County angle) |
| `total-loss-appraisal-san-antonio.html` | total loss appraisal san antonio (+ military/PCS angle) |
| `total-loss-appraisal-austin.html` | total loss appraisal austin (+ EV/hybrid valuation angle) |
| `total-loss-appraisal-el-paso.html` | total loss appraisal el paso (+ isolated-market angle) |

Each city page has **unique local content** (roads, weather risk, market
dynamics, suburb names), a Texas-rights section, a five-question FAQ, and
`Service` + `BreadcrumbList` + `FAQPage` JSON-LD. FAQ markup helps machines
understand the page, but Google limits visible FAQ rich results to authoritative
government and health sites.
The hub↔city↔home linking forms a proper topical cluster.

---

## 4. Before you launch (required)

1. **Production domain complete.** Canonicals, `og:url`, JSON-LD, `robots.txt`,
   social metadata, and `sitemap.xml` now use `https://www.totaledtexas.com`.
2. **Google Business Profile.** For "near me"/map-pack visibility in each metro
   you'll eventually want a verified GBP with a real Texas address; at minimum
   create one for the home base city.
3. **Search Console:** verify the domain, submit `sitemap.xml`.
4. Replace the illustrative stats/testimonials/trust-bar placeholders (already
   flagged in the code) — thin or fabricated-looking E-E-A-T signals hurt
   rankings in YMYL-adjacent niches like insurance.

## 5. Recommended next steps (not yet built)

- **Blog/guide cluster** for the long-tail: "What to do when your car is totaled
  in Texas", "Texas hail total loss guide", "Does insurance pay sales tax on a
  totaled car in Texas?", "Appraisal clause step-by-step (SB 458)". Each links to
  the relevant city page and the free review.
- **Second-ring city pages** once the first six index well: Arlington, Corpus
  Christi, Plano, Lubbock, Laredo, Irving.
- **Reviews:** collect Google/Trustpilot reviews and add `Review`/`AggregateRating`
  markup only once real reviews exist.
- **Backlinks:** the local angles built into each page (Houston flood claims,
  DFW hail, Austin EVs) are pitchable to local TV consumer desks and Texas
  personal-finance blogs — the same outlets in the homepage trust bar.

---

## 6. Best-practices review pass (July 14, 2026)

Changes applied after reviewing the regional SEO & AI-search strategy document
(Texas total-loss market):

### Compliance language scrub (TX Ins. Code Ch. 4102 / *Stonewater*)
The strategy doc's #1 finding: marketing that says we "negotiate/settle/handle
your claim" is the exact conduct that requires a Texas public insurance
adjuster license and sank Stonewater Roofing at the Texas Supreme Court.
- Negotiation services were removed entirely. The Guided package is limited to
  claim-specific document preparation, an evidence index, a report walkthrough,
  and one factual addendum; it excludes negotiation, response analysis, ongoing
  Q&A, representation, and scripts.
- The same boundary is stated on pricing, how-it-works, all six city pages, the
  terms, disclaimer, and educational guides. Service-specific sample content
  was removed.
- Sitewide footer disclaimer now states we are **not a public insurance
  adjuster** and do not negotiate or settle claims on anyone's behalf.
- Package boundaries and contract language were confirmed with counsel before
  the July 2026 legal-page publication pass.

### Schema
- Replaced the address-dependent `LocalBusiness` markup with `Organization`
  (homepage entity + `provider` on the hub and all six city pages); brand `name`
  and `legalName` are both "Totaled Texas".
- Homepage `areaServed` includes the six target cities; added `founder`
  Person, `knowsAbout`, and an offer catalog for Essential, Guided, Specialty,
  and Specialty + Guided services.
- About page: `AboutPage` + `Person` schema for the founder (jobTitle,
  worksFor, and knowsAbout). Add `sameAs` after a verified professional profile is live.

### E-E-A-T / fact density
- Texas hub now cites Transportation Code Ch. 501 (100% threshold) and TDI
  Bulletin B-0027-00 (third-party diminished value), in visible copy and FAQ
  JSON-LD alike.
- USPAP added to the (placeholder-flagged) credential list — verify before
  launch; the doc treats USPAP/ASCAA credentials as the core trust signal.
- Sample testimonials/locales localized to Texas metros (still sample-flagged).

### Internal linking
- Homepage footer now links all six city pages + the Texas hub (Fort Worth,
  El Paso, and the hub link were missing).

### Deliberately NOT done (per the doc)
- `llms.txt` — Google/OpenAI/Anthropic/Perplexity confirm it's unused; skipped.
- URL restructure to `/texas/houston/` — the flat `total-loss-appraisal-{city}.html`
  URLs are keyword-rich and already interlinked hub↔spoke; churning URLs on an
  unlaunched site adds no ranking value and risks broken links.

### Off-site actions the doc calls for (can't be done in code)
1. Google Business Profile (SAB, hidden address, up to 20 service areas) +
   **Bing Webmaster Tools** (feeds ChatGPT) + Search Console + GA4.
2. Content cluster build-out: 1–2 articles/week across the four pillars
   (total loss, ACV, appraisal clause, diminished value), front-loaded answers,
   question-based H2s.
3. Digital PR (Qwoted, Source of Sources, Featured.com, #JournoRequest),
   Texas citations/directories (ASCAA etc.), authentic Reddit presence in
   Texas car/insurance communities.
4. Review-generation flow; add Review/AggregateRating markup only once real
   reviews exist.

---

## 7. Guide cluster build-out (July 14, 2026)

Implemented the "blog/guide cluster" from §5 — five long-tail guides targeting
the research-phase and situational queries in §1C/§1D:

| Page | Primary query targets |
|---|---|
| `what-to-do-car-totaled-texas.html` | car totaled in texas what to do, dispute total loss claim, totaled car offer too low |
| `texas-appraisal-clause-sb458.html` | texas right to appraisal, appraisal clause texas, SB 458 |
| `totaled-car-sales-tax-texas.html` | does insurance pay sales tax on totaled car in texas |
| `hail-totaled-car-texas.html` | hail totaled my car (DFW "hail alley" angle) |
| `diminished-value-claim-texas.html` | diminished value claim texas, TDI B-0027-00, 2-year deadline |

Each guide follows the AI-search (GEO) playbook from the strategy doc:
- **Front-loaded direct answer** in the lede (~60 words), question-based H2s.
- **Article + BreadcrumbList + FAQPage JSON-LD**, named author (`Person` →
  Mark West → about.html), `datePublished`/`dateModified`, visible byline
  with "Last reviewed" date.
- **Fact-dense**: Transportation Code Ch. 501 (100% threshold), Ins. Code
  Ch. 542 prompt-payment deadlines (15 days / 15 business days / 5 business
  days, 18% interest), Ch. 1813 / SB 458, TDI Bulletin B-0027-00, 6.25%
  motor vehicle sales tax, $20,000 justice-court limit, 2-year limitations
  period. SB 458 procedural deadlines deliberately NOT stated (TDI
  rulemaking pending, per the doc's caveat).
- **Compliance-safe language throughout** (consumer sends letters; document-support
  framing; "not legal advice" fine print).

Supporting changes:
- "Free Guides" column added to every page footer (interior grid now
  `1.8fr repeat(5, 1fr)`, homepage nav-group now 4 columns); guides section
  added to the `texas.html` hub; contextual hail-guide links on the Dallas
  and Fort Worth pages; all five added to `sitemap.xml`.
- **Editorial standards section** on about.html (named reviewer, sourced
  statutes, last-reviewed dates, corrections policy) — E-E-A-T requirement
  from the strategy doc.
- `og:image`/`twitter:image` added to the homepage (uses the hero webp;
  consider a dedicated 1200×630 og-image before launch).
- New CSS: guide list styling under `.legal-page`.

Remaining content roadmap (unbuilt): flooded-car guide (Houston angle),
ACV-vs-market-value explainer, "what happens if I don't accept the offer",
second-ring city pages — publish 1–2/week per the strategy doc's cadence.

---

## 8. Guide cluster completion (July 17, 2026)

Built the three remaining guides from the §7 roadmap, closing out the four
content pillars (total loss, ACV, appraisal clause, diminished value) — ACV
previously had no dedicated page:

| Page | Primary query targets |
|---|---|
| `actual-cash-value-texas.html` | actual cash value texas, ACV vs market value, how do insurance companies calculate ACV, actual cash value dispute |
| `dont-accept-total-loss-offer-texas.html` | what happens if I don't accept total loss offer, reject total loss offer, can insurance force me to accept |
| `flooded-car-total-loss-texas.html` | flooded car total loss texas, flood totaled my car, is flood damage covered by car insurance (Houston/Harvey angle) |

Each follows the established guide playbook: front-loaded ~60-word answer in
the lede, question-based H2s, Article + BreadcrumbList + FAQPage JSON-LD,
named author byline with last-reviewed date, fact-dense (Ch. 501, Ch. 542,
SB 458, 6.25% sales tax, $20k justice-court limit, 2-year limitations), and
compliance-safe document-support framing throughout.

Supporting changes:
- **Footer:** Free Guides column on every page (and homepage variant)
  expanded to all 8 guides in claim-lifecycle order.
- **Texas hub:** guides section now lists all 8 guides.
- **Contextual interlinks:** Houston page → flood guide; hail guide → flood
  guide; what-to-do guide → ACV + don't-accept guides; SB 458 and sales-tax
  guides → ACV guide (the ACV page now receives links from every pillar,
  matching its role as the concept every dispute hangs on).
- Fixed a copy typo in the texas.html diminished-value FAQ.
- `sitemap.xml`: 3 new URLs (ACV at 0.8 as a pillar; others 0.7); lastmod
  bumped sitewide (footer change touched every page).
- `dateModified` bumped on the four edited guides.

Still deliberately deferred: second-ring city pages (Arlington, Corpus
Christi, Plano, Lubbock, Laredo, Irving) — per §5, these wait until the
first six city pages are indexing well, which can't be verified before
launch. Next guide candidates: owner-retained/salvage-title explainer,
gap-insurance shortfall guide, "how long does a total loss claim take in
Texas".
