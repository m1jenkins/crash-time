# Spur Auto Frontend Audit and Implementation Plan

Audit date: 2026-07-21  
Scope: audit and planning only. No website source, generated state/city HTML, or `sitemap.xml` was changed.

## Outcome

- Result: **Reject**
- Weighted score: **63.0 / 100**
- Rendered browser inspection completed: **yes**, in Chromium through Playwright
- Primary routes inspected: `/`, `/how-it-works.html`, `/pricing.html`, `/results.html`, `/locations.html`, `/about.html`, `/free-review.html`
- Representative content routes inspected: `/texas.html`, `/states/florida.html`, `/total-loss-appraisal-houston.html`, `/actual-cash-value-texas.html`
- Automatic failures:
  - The outcome component does not include a customer-authorized vehicle photo.
  - A failed primary form submission navigates to a blank browser error page and loses the entered data. Loading, error, preserved-input, and retry states are absent.
  - The homepage horizontally overflows at 320px.
  - A 200% text-size stress test creates substantial horizontal overflow on the homepage, pricing page, and free-review page.
  - Axe reports serious WCAG issues for contrast and links that rely on color alone on conversion, location, state, and editorial routes.
- Remaining blocker: operating-scope claims must be verified before they are used to support a purchase or lead submission. The owner has confirmed that the published customer claim outcomes are real.

The visual redesign is stronger than the outcome suggests. It has a recognizable editorial voice, a clear primary action, restrained shapes, good keyboard focus, and competent responsive work. After the owner corrected the case-status assumption, the remaining Reject factors are form recovery, accessibility, reflow, and operating-scope verification.

## Design thesis

> This experience should feel **calmly investigative and evidence-led** for drivers dealing with a stressful total-loss offer because they come to decide whether the valuation is worth challenging; it must make the free review and paid independent appraisal immediately clear, prove who performs the work and what evidence the customer receives, and differ from generic claims-lead websites through real customer outcomes, report artifacts, current state-specific sources, and a document-review composition.

Thesis tests:

1. If the thesis is ignored, the site becomes a polished lead form surrounded by claims the user cannot verify.
2. A generic competitor could copy the colors and layout, but could not honestly copy a real redacted report, the operator's verified credentials, dated state sources, and a transparent evidence methodology.
3. A user should remember that Spur Auto checks the insurer's vehicle facts and comparable evidence before asking the user to buy anything.

## Context gate

| Input | Finding | Evidence status |
|---|---|---|
| Category and offer | Independent total-loss vehicle valuation: free initial review, then paid appraisal/report packages | Verified in repository routes and pricing content |
| Primary audience | Drivers who believe an insurer's total-loss offer may be low; generally novice, anxious, and time-sensitive | Verified in site and business-plan copy |
| Primary task | Decide whether the offer deserves a closer review, then submit the claim details | Verified in homepage and free-review hierarchy |
| Business model | Free lead review followed by $99, $299, or $449 report/support purchases | Verified in pricing and checkout links |
| Decision character | Financially meaningful, emotionally loaded, infrequent, and difficult for a consumer to evaluate | Verified in business context; emotional intensity is a conservative inference |
| Trust threshold | Operator identity, qualifications, service scope, report artifact, methodology, privacy, price, delivery timing, guarantee terms, and operational geography | Required by the category; only partially present |
| Wrong-fit facts | Spur Auto is not a law firm or public adjuster, does not contact the insurer, cannot guarantee an outcome, and should tell users when an offer appears fair | Verified in visible disclosures |
| Device context | Mobile is likely important for users handling a claim away from a desk | Assumed; analytics were not available |
| Fixed brand assets | Spur Auto mark, navy/oxide/sage palette, DM Serif Display, Plus Jakarta Sans, claim-document imagery | Verified in repository assets and CSS |

Top first-visit questions:

1. Is the insurer's offer low enough to challenge?
2. Why should I trust this company with my claim information and money?
3. What exactly will I receive, how much will it cost, and how soon will it arrive?

## Proof ledger

| Claim, asset, or proof | Repository source | Verified now? | Objection answered | Current placement | Status |
|---|---|---:|---|---|---|
| Free review, response within 48 hours | Homepage and free-review copy | Partially | What happens after I submit? | Hero and form | Operational promise needs owner confirmation |
| Report packages and prices | `pricing.html` plus Stripe Checkout links | Yes for displayed configuration | What does it cost? | Pricing cards and table | Ready, subject to checkout QA |
| Legal/service boundary | Footer, free-review, city pages, terms/disclaimer | Yes in repository | Are you representing me? | Mostly footer and lower-page copy | Ready but visually over-repeated |
| Current state rules and sources | `data/states.json`, generated routes, Texas guides | Yes in repository | Do you understand my state? | State and guide pages | Strongest current proof type |
| Founder name and first-person story | `about.html` and homepage | Yes as published content | Who is behind the service? | About and homepage | Identity present; qualifications absent |
| Completed customer outcomes with exact dollar values | `index.html`; owner confirmation received 2026-07-22 | Yes, confirmed by owner | Does this work? | Homepage outcome panel | **Approved real cases; keep privacy redactions and results disclaimer** |
| Customer vehicle photos | No customer photo is currently displayed | Not supplied | Can I see the vehicle? | Homepage outcome panel | **Optional; publish only with customer authorization** |
| Credentialed operator, experience, licenses, certifications | Claims appear in `BUSINESS-PLAN.md`; `README.md` says credentials must be verified | No | Are they qualified? | Not visibly established | **Blocked: do not publish until verified** |
| Nationwide availability and ability to work in any state | Homepage, free-review, locations; only five state systems are represented and business plan notes state-specific licensing | No operating proof found | Can you serve me here? | High in funnel | **Blocked: qualify or verify** |
| Money-back guarantee | Pricing and FAQ | Partial | What if the report does not support more value? | Pricing | Needs complete terms, process, exclusions, and timing |
| Real sample report | Stylized preview on homepage and explanatory `results.html` | No downloadable/redacted artifact found | What am I buying? | Results and homepage | **Missing high-value proof** |
| Media, reviews, testimonials | Repository launch notes say to add only after real proof exists | No | Has anyone credible validated this? | Omitted | Correctly omitted |

Proof that must not be fabricated: customer photos, testimonials, review counts, media logos, founder qualifications, licenses, volume metrics, nationwide operating authorization, or a report represented as customer work. The owner confirms that the published customer results are real.

## Context-to-interface decisions

| Dimension | Recommended decision | Context reason | Acceptance evidence |
|---|---|---|---|
| Page model and hierarchy | Keep a task-first homepage, but move verifiable report evidence before any outcome claim | The user is urgent but needs proof before commitment | First two desktop screens show task, price, scope, and a real artifact |
| Navigation vocabulary | Keep `Results` where it links users to the real published case; clarify when a section is specifically a report walkthrough | The label should lead to genuine outcome evidence | Nav label and page content match the destination promise |
| Copy and tone | Use specific scope, evidence, limits, geography, and timing; preserve privacy redactions and individual-results language | High-trust service benefits from precise context | Every material claim has an owner/source in a proof ledger |
| Typography | Retain the serif/sans pairing, increase long-form reading size, and correct heading hierarchy | Current typography is distinctive, but some body copy is small and pricing skips from h1 to h3 | No heading-level jumps; long-form text remains comfortable at 200% |
| Color roles | Retain navy, oxide, and sage; use darker oxide on off-white and underline inline links | The palette fits the investigative editorial thesis but has measured AA failures | Axe reports zero WCAG 2 AA/2.1 AA/2.2 AA violations |
| Imagery | Use real report pages, document annotations, founder portrait, and state-source artifacts; stop reusing one vehicle hero everywhere | Trust depends on work and operator proof, not generic category atmosphere | Every prominent image has a named job: prove, explain, or orient |
| Shape language | Retain rules, ledgers, tabs, and report-like dividers; remove emoji value icons | Document geometry is more ownable than generic cards or emoji | About and proof sections look related to the report product |
| Spacing and density | Keep open desktop pacing; reduce mobile footer length and repeated disclosures without hiding essential limits | Current mobile pages can exceed 11,000px and bury useful closure | Primary content ends before compact legal/navigation disclosure |
| Interaction and feedback | Progressively enhance forms with loading, preserved input, inline errors, success confirmation, and retry | A lead submission is the core conversion path | Offline/timeout/server-error fixtures keep the user on the page with data intact |
| Motion | Keep motion limited to navigation, disclosure, and state feedback with a reduced-motion path | Motion is not the identity or a decision aid here | Zero nonessential running animations under reduced motion |
| Desktop composition | Pair the task with a real report artifact or form, then sequence methodology, proof, packages, and boundaries | Desktop has room to show evidence and action together | Five-second test identifies offer, proof, price, and next action |
| Mobile composition | Show category/local orientation, one trust fact, and one action before large forms; use compact disclosures and package accordions | Mobile users need confidence before a long input task | Local H1 and scope appear before the city form; no horizontal overflow |

## Direction divergence

| Direction | Page model | First-view priority | Proof strategy | Art direction | Mobile behavior | Tradeoff |
|---|---|---|---|---|---|---|
| A. Task-first evidence review | Immediate claim check followed by report evidence | Is my offer worth checking? | Redacted report excerpt, currentness, operator identity | Claim-file desk, annotations, valuation ledger | Orientation, compact review CTA, then form | Best conversion path; less founder narrative up front |
| B. Founder-led authority | Proof-led professional service | Who will review my claim? | Verified credentials, portrait, methodology, representative work | Workshop/inspection portraiture and report artifacts | Founder proof before form | Higher trust, but slower for urgent visitors |
| C. Claim decision center | Qualification/comparison utility | Which dispute path fits my situation? | State rules, checklist, package fit matrix | Legal/valuation reference system | Guided steps and progressive disclosure | Strong self-service value, but more interaction and state complexity |

Selected direction: **A. Task-first evidence review**, borrowing verified operator proof from Direction B.

Why: the current homepage already proves that direct task framing converts visually. The redesign should preserve that speed while pairing its real customer outcome with tangible report evidence and stronger operator credibility. Direction C is a useful later product expansion after the core lead path is resilient.

## Rendered evidence

Evidence directory: `/Users/macbookprom42025/.codex/visualizations/2026/07/21/019f866c-73ff-7c52-8d15-5c41e741be88/frontend-audit`

- Full-page desktop and mobile captures exist for all seven primary routes.
- Viewport captures exist for all seven primary routes at 320x568, 390x844, 844x390, 768x1024, 1024x768, 1366x768, 1440x900, and 1920x1080.
- Representative state, city, and editorial full-page captures were also reviewed.
- Interaction evidence includes mobile navigation open, invalid form, pricing comparison open, simulated form network failure, and 200% text-size stress.

Representative artifacts:

- [Homepage desktop full page](/Users/macbookprom42025/.codex/visualizations/2026/07/21/019f866c-73ff-7c52-8d15-5c41e741be88/frontend-audit/home-desktop-1440x900-full.png)
- [Homepage mobile full page](/Users/macbookprom42025/.codex/visualizations/2026/07/21/019f866c-73ff-7c52-8d15-5c41e741be88/frontend-audit/home-mobile-390x844-full.png)
- [Pricing desktop full page](/Users/macbookprom42025/.codex/visualizations/2026/07/21/019f866c-73ff-7c52-8d15-5c41e741be88/frontend-audit/pricing-desktop-1440x900-full.png)
- [Free-review mobile full page](/Users/macbookprom42025/.codex/visualizations/2026/07/21/019f866c-73ff-7c52-8d15-5c41e741be88/frontend-audit/free-review-mobile-390x844-full.png)
- [Mobile navigation open](/Users/macbookprom42025/.codex/visualizations/2026/07/21/019f866c-73ff-7c52-8d15-5c41e741be88/frontend-audit/home-mobile-nav-open-390x844.png)
- [Simulated form network failure](/Users/macbookprom42025/.codex/visualizations/2026/07/21/019f866c-73ff-7c52-8d15-5c41e741be88/frontend-audit/free-review-network-failure-390x844.png)
- [Homepage 200% text-size stress](/Users/macbookprom42025/.codex/visualizations/2026/07/21/019f866c-73ff-7c52-8d15-5c41e741be88/frontend-audit/home-text-resize-200-320x568.png)
- [Houston city mobile full page](/Users/macbookprom42025/.codex/visualizations/2026/07/21/019f866c-73ff-7c52-8d15-5c41e741be88/frontend-audit/houston-city-mobile-390x844-full.png)

## Proven strengths

- The homepage clearly states the user's problem, free starting point, timing, and entry price.
- The serif/sans system, dark navy, oxide accent, sage rules, and document-led composition are recognizable without relying on gradients or glass effects.
- Mobile navigation works with keyboard input, Escape closes it, and focus returns to the toggle.
- Visible focus is strong: 3px blue outline plus a white separation ring.
- The homepage outcome tabs support Arrow Left, Arrow Right, Home, and End with correct selected state and panel labelling.
- Native `details` disclosures on pricing and FAQ sections are keyboard operable.
- Required form fields have visible labels, appropriate input types, and native validation focuses the first invalid field.
- Reduced-motion emulation leaves no running animations after load.
- One h1, main landmark, navigation landmark, and footer landmark are present on every inspected route.
- All seven primary routes rendered at all eight required viewport sizes without console/page errors. Only the 320px homepage produced horizontal overflow.
- Pricing is transparent and the mobile comparison correctly changes from a table to disclosures rather than squeezing the desktop table.
- State pages cite official sources and show review dates, which is valuable category-specific trust content.

## Prioritized findings

Priority formula: `severity x path criticality x breadth x confidence / effort`. Scores of 12 or more are P0, 6 to 11.9 are P1, 3 to 5.9 are P2, and lower non-blockers are P3.

| ID | Priority | Score | Observation -> impact -> cause -> revision -> verification |
|---|---:|---:|---|
| F-01 | Resolved | 0.0 | Owner confirmed on 2026-07-22 that the published homepage outcomes are real customer claims -> retain the module with identifying details redacted and an individual-results disclaimer -> keep approved claim records and publication authorization outside the public repository |
| F-02 | P0 | 33.8 | Simulated Web3Forms failure navigates to `chrome-error://chromewebdata/`, shows a blank page, and loses inputs -> the primary lead path has no recovery -> direct document POST has no progressive-enhancement error state -> intercept submission, preserve data, expose loading/error/retry/success, and keep native POST as a fallback -> test timeout, offline, 4xx, 5xx, double submit, and retry success |
| F-03 | P0 | 18.0 | `Nationwide`, `every state`, and `any state` appear throughout the funnel, but operating/licensing proof was not found and the business plan says state-specific expansion -> wrong-fit users may submit or buy under an unverified availability assumption -> marketing scope is broader than published operating evidence -> qualify availability by verified service scope and route unsupported states to a transparent eligibility review -> owner/legal approval plus state-by-state content test |
| F-04 | P0 | 54.0 | Axe reports serious link-distinction failures on the free-review privacy link, city breadcrumbs, city inline links, and editorial links; it also reports 4.4:1 accent contrast on pricing/state surfaces -> links may be missed and AA is not met -> shared inline-link styling relies on a small color delta, and oxide is too light on paper -> underline inline content links and use a darker semantic accent on off-white -> axe zero violations plus manual hover/focus/visited inspection |
| F-05 | P0 | 27.0 | A 200% text-size stress creates 626px, 344px, and 388px page widths in a 320px viewport on home, pricing, and free-review -> users with enlarged text must pan horizontally -> fixed/minimum widths and oversized brand/type treatments do not yield -> make containers intrinsic, allow logo/type wrapping or scaling, and test every critical component at enlarged text -> zero horizontal scroll at 200% with all controls intact |
| F-06 | P0 | 54.0 | Homepage is 15px wider than a 320px viewport because outcome values extend to 335px and the tab strip extends off-canvas -> narrow users lose reflow and can accidentally pan -> the two-column outcome value geometry has a hard width and the tab rail is not isolated -> make value rows intrinsic and contain intentional tab scrolling -> 320x568 automated width check reports zero overflow |
| F-07 | P0 | 18.0 | The Results route contains no visible report pages and no real result, while navigation calls it `Results` -> users looking for proof see abstract cards and a repeated vehicle image -> navigation promise and page artifact do not match -> rename to `Sample Report` and show a verified/redacted multi-page artifact, or publish consented case studies and keep `Results` -> five-second test confirms the route delivers what the label promises |
| F-08 | P0 | 18.0 | Pricing begins with h1 and then jumps directly to h3 tier names -> assistive navigation loses a section level -> price cards were styled without a semantic section heading -> add an h2 such as `Choose the report depth that fits your claim` and keep package names at h3, or promote package names if structurally appropriate -> automated heading-outline check reports no jumps |
| F-09 | P0 | 12.0 | City mobile pages place the full short form before the local h1 and comparison context -> search visitors are asked for data before confirming location relevance and service scope -> desktop conversion columns were reordered into a form-first stack -> show local h1, scope, currentness, and one CTA first; place the form after orientation or link to the dedicated form -> first two mobile screens identify city, task, proof, and action in that order |
| F-10 | P1 | 9.0 | Internal routes reuse the same vehicle-and-clipboard hero regardless of page job -> the About, Results, Pricing, process, state, and editorial routes feel templated and less credible -> one category image is carrying art direction for unrelated content -> assign route-specific proof imagery and use no image where text or an artifact is stronger -> image-job ledger names prove/explain/orient purpose for each hero |
| F-11 | P1 | 8.0 | About relies on an enthusiast story and emoji value icons but provides no verified portrait, qualifications, methodology, or accountable operator details -> a high-trust buyer cannot assess expertise -> proof is absent and decorative icons substitute for authority -> add only verified operator evidence, replace emoji with report/process artifacts, and show the exact role and limits -> proof review plus manual trust test |
| F-12 | P2 | 4.5 | Mobile footers repeat large navigation inventories and long legal text on every route -> useful closure is pushed far below the primary content -> desktop footer structure was stacked without reprioritization -> use compact mobile navigation disclosure and a concise universal boundary statement linking to full terms/disclaimer -> keyboard, touch, and essential-disclosure review |
| F-13 | P2 | 3.0 | Internal pages request Google Fonts even though local font files exist, and the shared CSS has 6,314 lines/124KB with historical systems layered together -> font reliability and maintainability may suffer -> homepage and internal pages use different asset-loading strategies and cumulative overrides -> self-host one font setup and consolidate obsolete rules after regression captures -> network request audit and screenshot diff across every primary route |

## Page-by-page summary

| Route | One job | What works | Main revision |
|---|---|---|---|
| `/` | Qualify concern and start a free review | Strong task clarity, price/timing transparency, distinctive editorial composition, real customer outcome | Add supporting report evidence, fix 320/200% reflow, and add form recovery |
| `/how-it-works.html` | Explain the customer journey and deliverable | Clear sequence and report chapters | Replace repeated hero art; source or soften broad claims such as how most insurers respond |
| `/pricing.html` | Help a driver choose report depth | Transparent prices, comparison table, effective mobile disclosures | Repair heading outline and contrast; expand guarantee process/limits near purchase actions |
| `/results.html` | Currently: explain report structure | Honest disclaimer that it is not a result | Rename to Sample Report and show the actual artifact; do not imply results until proof exists |
| `/locations.html` | Route users to relevant state guidance | State selector and rule framing are understandable | Qualify nationwide availability and distinguish published service states from eligibility-only states |
| `/about.html` | Establish accountable operator trust | Personal motivation and honesty promise are clear | Add verified authority and real operator imagery; remove emoji-led value cards |
| `/free-review.html` | Collect the minimum useful claim information | Visible labels, native validation, price and process context | Add progressive-enhanced submission states, preserved data, field-linked errors, retry, and success announcement |
| State/city templates | Explain local rules and convert qualified visitors | Dated sources and local comparison scope | Reorder mobile opener; add link distinction globally; edit templates/data only, never generated HTML |
| Editorial guides | Answer claim questions and route to help | Specific language and useful state/legal detail | Increase reading comfort, distinguish inline links, add lightweight in-page navigation on longer guides |

## Pattern decisions

| Pattern | Current job | Context fit | Simpler alternative | Decision and constraints | Verification |
|---|---|---|---|---|---|
| Split task-first homepage hero with form | Lets urgent users understand and act in one view | Strong fit for an anxious, high-intent lead funnel | Hero with one CTA to dedicated form | Retain on desktop; on mobile keep orientation and CTA before the long form. Form must have complete states and preserve data | Desktop/mobile first-view and form-state matrix |
| Tier cards plus comparison | Compares parallel paid packages | Strong fit because packages share a schema but differ by support/research depth | Plain price list | Retain cards and table; keep mobile disclosures; correct semantic heading order | Keyboard, long-copy, 320px, and 200% tests |
| FAQ disclosures | Resolve purchase objections without a very long open page | Valid because answers are secondary and native `details` is accessible | Inline answers beside each package | Retain only questions that cannot be answered near the related decision | Keyboard/touch and open-state screenshots |
| Outcome tabs | Present real customer claims | Owner-confirmed cases provide relevant proof when privacy and context are preserved | Static single-case section | Retain the approved cases; keep redactions and individual-results language, and use a contained non-tabular mobile layout if needed | Record gate, keyboard test, 320px reflow |
| Repeated three-column cards | Organizes parallel process/rule/value concepts | Mixed: valid for parallel state rules, weaker for About values and repeated marketing claims | Editorial list or one lead artifact with supporting notes | Retain only where objects are truly comparable; replace About emoji cards and generic proof cards | Logo-swap and arbitrary-reordering tests |
| Repeated full-width CTA band | Provides a closing action | Valid for conversion, but copy must reflect the page's argument | Inline text link | Retain one closing band per page, using route-specific evidence and action copy | Scroll-path review on desktop/mobile |

## State coverage audit

| Family | Status | Evidence and required implementation |
|---|---|---|
| Data fetching | Not applicable to static page content | No asynchronous page data observed |
| Data presence | Not applicable to static page content | No stored/filterable data surface observed |
| Submission | **Fail** | Native invalid state works; loading, server error, offline, preserved input, retry, and retry success are missing |
| Controls | Partial pass | Focus, hover, tab selection, and native disclosures work; pricing semantics/contrast need revision |
| Navigation | Pass | Current page, collapsed/expanded, Escape close, and focus return verified |
| Media | **Fail** | No customer-authorized vehicle image is supplied; route art is over-reused; broken-image fallback needs explicit verification after new assets |
| Auth | Not applicable | No identity-dependent routes |
| Permissions | Not applicable | No role/entitlement-dependent controls |
| Content stress | **Fail** | 320px homepage overflow and 200% text-size overflow |
| Display preferences | Partial fail | Reduced motion passes; enlarged text and reflow fail |
| Localization | Not applicable to current stated scope | English-only U.S. service; re-evaluate if multilingual or localized service is added |

## Implementation plan

### Phase 0: Truth and publication gate

Goal: make every claim near a form or purchase action supportable.

1. Create a small proof manifest for operator claims, operating states, timing, guarantee terms, report artifacts, and customer outcomes.
2. Retain the owner-confirmed real homepage outcome with privacy redactions, exact approved figures, and an individual-results disclaimer.
3. Keep `Results` for genuine customer outcomes and clearly label report-only walkthrough content.
4. Replace nationwide/any-state language with verified operating scope or a clearly described eligibility review.
5. Add owner/legal approval for guarantee wording, service boundary, turnaround trigger, and state eligibility.

Likely files: `index.html`, `results.html`, `locations.html`, `free-review.html`, `pricing.html`, `how-it-works.html`, `about.html`, shared footer sources/templates, `data/states.json` where route metadata must change.

Acceptance gate:

- No material claim is published without a proof-manifest entry.
- No placeholder is visible.
- The route label `Results` is used only if the route contains verified results.
- Unsupported-state visitors see accurate availability and a useful next step.

### Phase 1: Lead-form resilience and measurement integrity

Goal: make the primary conversion recoverable under real network conditions.

1. Keep the semantic HTML form and native POST fallback.
2. Add progressive-enhanced submission with `idle`, `validating`, `submitting`, `success`, `field error`, `server error`, `offline`, and `retrying` states.
3. Disable duplicate submits only while a request is active and explain the state in button text.
4. Preserve non-sensitive values on failure and focus an error summary linked to fields.
5. Add a live status region for submission and retry feedback.
6. Confirm ads/conversion events fire only after confirmed success, not on attempted submit.
7. Reuse one form-state controller across homepage, free-review, and generated city forms.

Likely files: `js/main.js`, `js/ads-conversions.js`, `index.html`, `free-review.html`, `templates/city-page.template.html`, `thank-you.html`, `css/styles.css`.

Acceptance gate:

- Offline, timeout, 4xx, 5xx, and aborted submissions keep the user on the page with data intact.
- Errors are visible, announced, field-linked when appropriate, and retryable.
- Success is confirmed once and conversion measurement remains deduplicated.
- Native no-JavaScript submission still works.

### Phase 2: Accessibility, semantics, and reflow

Goal: clear all automatic failures before visual expansion.

1. Add underlines or another non-color cue to inline content and privacy links while excluding nav, buttons, and card-level links.
2. Use the darker oxide token for text on paper/off-white and recheck all hover/focus/visited states.
3. Add a semantic h2 above pricing tiers and verify every route's heading outline.
4. Remove/fix the outcome geometry that exceeds 320px.
5. Refactor fixed/minimum widths that fail 200% text-size stress, including the logo/header, package cards, form grid, values, and long labels.
6. Increase breadcrumb and small inline-link target area where practical.
7. Add automated axe, heading, duplicate-ID, horizontal-overflow, and form-state tests.

Likely files: `css/styles.css`, `pricing.html`, `index.html`, root editorial pages, `templates/state-hub.template.html`, `templates/city-page.template.html`, test files.

Acceptance gate:

- Axe returns zero WCAG 2 A/AA, 2.1 AA, and 2.2 AA violations on every primary and representative generated route.
- No horizontal scroll at 320px or 200% text size.
- Keyboard focus remains visible and ordered at every required viewport.
- Heading outlines have one h1 and no skipped levels.

### Phase 3: Proof-led page architecture and art direction

Goal: make the site credible without decorative effects or generic category imagery.

1. Produce a privacy-reviewed, redacted report sample and show real page excerpts on the homepage and Sample Report route.
2. Add a real founder/operator portrait and only verified qualifications, role, methodology, and service limits.
3. Give each main route a different evidence job:
   - Homepage: offer check plus report excerpt.
   - How It Works: annotated intake-to-report flow.
   - Pricing: package output comparison and guarantee mechanics.
   - Sample Report: readable report pages with captions and limitations.
   - Locations: state-rule/status switchboard.
   - About: accountable operator and methodology.
   - Free Review: secure intake, data-use explanation, and next-step timeline.
4. Replace emoji icons with report-derived notation, line work, or plain editorial lists.
5. Update city mobile composition so local identity/scope precedes form collection.

Likely files: all seven main static routes, image assets, `templates/state-hub.template.html`, `templates/city-page.template.html`, `data/states.json`, `css/styles.css`.

Acceptance gate:

- Every prominent visual is classified as prove, explain, or orient.
- About and Sample Report answer who performs the work and what the buyer receives before conversion pressure.
- City/state first views are location-specific without relying on a swapped place name.
- Mobile is intentionally reordered, not only stacked.

### Phase 4: System consolidation and mobile closure

Goal: reduce drift and make future generated routes inherit the corrected system.

1. Consolidate old CSS layers into explicit tokens and component sections after screenshot baselines are in place.
2. Self-host the existing font files on all routes and remove third-party font requests.
3. Centralize repeated header/footer/legal fragments in the build system where feasible without changing static-route ownership rules.
4. Compress mobile footer navigation with accessible native disclosure while leaving essential service boundaries visible.
5. Add route-level performance checks for fonts, responsive images, layout shift, and third-party scripts.

Likely files: `css/styles.css`, head markup on static routes, templates, build/test tooling.

Acceptance gate:

- No visual regressions across the eight-viewport matrix.
- Fonts render without third-party dependency.
- Shared generated routes inherit accessibility and mobile fixes from templates.
- Build, SEO, and audit commands all pass.

### Required verification after implementation

Run:

```bash
npm run validate
npm run test:seo
npm run build
npm run audit:seo
```

Then repeat browser coverage for all primary routes at:

`320x568`, `390x844`, `844x390`, `768x1024`, `1024x768`, `1366x768`, `1440x900`, `1920x1080`.

Also repeat:

- Keyboard navigation, Escape, focus return, tabs, disclosures, and skip link.
- Form pristine, partial, invalid, submitting, offline, timeout, server error, retry, and success.
- 200% text size, reduced motion, broken/missing media, long labels, and dense content.
- Axe plus manual screen-reader/semantic review.
- Proof-manifest validation before publishing claims.

Repository rule: edit `data/states.json` and templates for generated routes, then run the build. Never manually edit HTML inside `states/` or `sitemap.xml`.

## Rubric

| Category | Weight | Score (1-5) | Weighted |
|---|---:|---:|---:|
| Brand specificity | 5 | 4 | 4.0 |
| Audience fit | 4 | 4 | 3.2 |
| Industry fit | 4 | 4 | 3.2 |
| Content specificity | 5 | 3 | 3.0 |
| Information hierarchy | 6 | 4 | 4.8 |
| Composition | 6 | 4 | 4.8 |
| Typography | 4 | 4 | 3.2 |
| Color | 4 | 3 | 2.4 |
| Imagery/art direction | 4 | 2 | 1.6 |
| Shape language | 3 | 4 | 2.4 |
| Interaction quality | 7 | 2 | 2.8 |
| Motion | 3 | 4 | 2.4 |
| Mobile composition | 7 | 3 | 4.2 |
| Accessibility | 8 | 2 | 3.2 |
| Functional completeness | 8 | 2 | 3.2 |
| Visual coherence | 5 | 4 | 4.0 |
| Originality | 4 | 4 | 3.2 |
| Trust | 5 | 1 | 1.0 |
| Conversion clarity | 5 | 4 | 4.0 |
| Memorability | 3 | 4 | 2.4 |
| **Total** | **100** |  | **63.0** |

Lowest-scoring categories: trust, interaction quality, functional completeness, accessibility, and imagery/art direction.

Non-compensable status:

- Accessibility: fail
- Functional completeness: fail
- Interaction quality: fail
- Mobile composition: fail at narrow/text-stress and city first-view priority
- Trust: fail pending proof validation

## Accessibility evidence and limitations

Automated scan: axe-core 4.10.3 on desktop and mobile versions of the seven primary routes plus Houston, Florida, and the ACV guide.

Manual/browser checks completed:

- Keyboard order and focus visibility
- Mobile menu expand/collapse, Escape, and focus return
- Homepage tab arrow-key behavior
- Native pricing/FAQ disclosure behavior
- Native invalid form focus
- Reduced motion
- Narrow reflow and 200% text-size stress
- Heading levels, h1 count, landmarks, duplicate IDs, labels, alt presence, and target sizing

Not completed:

- Production backend success and real vendor error responses
- VoiceOver/NVDA screen-reader session
- Production analytics-informed mobile/device distribution
- Legal/operational verification of credentials, geography, guarantee, and customer outcomes
- Live Stripe purchase completion

## Revisions made after rendered critique

None. The requested scope was audit and implementation planning. Website changes should begin only after the proof/operating-scope gate is resolved, then be re-rendered and re-inspected before sign-off.
