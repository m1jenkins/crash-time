# CrashTime SEO Audit — Texas Total Loss Focus

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
cluster CrashTime should own early.

---

## 2. Audit findings (before this change)

| # | Finding | Severity |
|---|---------|----------|
| 1 | **No geographic signals anywhere.** No page mentioned Texas or any city; impossible to rank for "…in Houston/Dallas" queries. | Critical |
| 2 | **No city landing pages** — the primary battleground where all competitors rank. | Critical |
| 3 | Titles/descriptions were brand-led ("CrashTime — Independent Auto Claims Advocacy") instead of keyword-led; "total loss" appeared in no title. | High |
| 4 | No structured data (Organization/Service/FAQ schema) — no eligibility for rich results. | High |
| 5 | No `sitemap.xml` or `robots.txt`. | High |
| 6 | No canonical URLs, no Open Graph/Twitter metadata. | Medium |
| 7 | No content targeting research-phase queries (Texas law, appraisal clause, diminished value rules). | Medium |
| 8 | Good foundations already in place: clean semantic HTML, one `<h1>` per page, fast static site, mobile responsive, `noindex` on placeholder legal pages. | ✅ |

---

## 3. What was implemented

### Sitewide
- **Keyword-led titles & meta descriptions** on every indexable page
  (e.g. homepage: "Total Loss & Diminished Value Appraisals in Texas | CrashTime").
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
`Service` + `BreadcrumbList` + `FAQPage` JSON-LD (FAQ rich-result eligible).
The hub↔city↔home linking forms a proper topical cluster.

---

## 4. Before you launch (required)

1. **Replace the placeholder domain.** Canonicals, `og:url`, JSON-LD, `robots.txt`
   and `sitemap.xml` all use `https://www.crashtime.example.com` — swap in the
   real domain (grep for `crashtime.example.com`).
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
