# Spur Auto OpenAI Ads campaign package

Prepared 2026-07-21. Current platform mechanics and policies were checked against official OpenAI sources on that date. This is a strategy and transfer package, not legal advice, policy approval, or authorization to activate spend.

## 1. Executive strategy

Run one Texas-only Clicks campaign at $25/day with two focused need-states:

1. A driver wants to check whether a total-loss valuation deserves a closer look.
2. A driver is evaluating independent appraisal evidence after noticing possible valuation errors.

Both groups lead to the free review page and optimize provisionally to the confirmed `lead_created` event. This keeps the free review as the single primary conversion and prevents the minimum budget from being split across multiple campaigns.

The offer is positioned literally: free review first, optional $99 standard report if a paid appraisal appears worthwhile. The ads do not promise savings, a higher settlement, negotiation, representation, legal help, licensing coverage, or a turnaround time.

## 2. Facts, assumptions, and unresolved decisions

| Item | Status | Value | Evidence or owner | Impact if wrong |
|---|---|---|---|---|
| Advertiser | Confirmed | Spur Auto, a third-party independent vehicle appraisal firm | Repository site and legal pages | Identity mismatch can block verification |
| Offer | Confirmed on site | Free claim review; optional standard report listed at $99 | `free-review.html`, `pricing.html` | Copy and price must be revised if the offer changes |
| Primary audience | Strategic recommendation | Texas adults reviewing a total-loss vehicle valuation | Site offer and Texas-first business plan | Wrong audience lowers relevance and lead quality |
| Geography | Assumed | Texas only | `BUSINESS-PLAN.md` says launch is single-state/regional | Must not launch until service/licensing scope is confirmed |
| Primary conversion | Confirmed in code; live QA pending | Confirmed free-review form submission as `lead_created` | `js/ads-conversions.js`, `thank-you.html` | Reporting and optimization fail if the live event is not mapped |
| Budget | Confirmed | $25 daily | User instruction; current platform minimum | One campaign is required to avoid exceeding the daily budget |
| Pilot dates | Assumed | 2026-07-27 through 2026-08-25 | Owner to approve | Changes maximum scheduled spend |
| Maximum scheduled spend | Derived | $750 for 30 days at $25/day | Budget arithmetic; daily budget is a target and can fluctuate | Not a guaranteed invoice amount |
| Target CPA / lead value | Unresolved | Not provided | Owner | No valid scale or pause threshold can be set yet |
| Approved proof | Partial | Free review, $99 price, stated review inputs | Visible destination copy | Operational and licensing claims remain unresolved |
| Tracking readiness | Partial | Browser Pixel exists; no verified CAPI or CRM join | Code review | Lead attribution and quality feedback remain incomplete |
| Policy status | Unresolved / elevated risk | Insurance-claim-adjacent service with document-support pages | OpenAI Ads policies; site terms and pricing | Written category determination is required before activation |

## 3. Suitability and policy gate

### Current official rules verified

- ChatGPT Ads currently support Clicks/CPC and Views/CPM campaigns, with maximum bids at ad-group level. OpenAI recommends a $3-$5 starting maximum CPC for Clicks campaigns.
- The minimum daily campaign budget is currently $25.
- Ads use advertiser identity, title, copy, landing page, and a square JPG/PNG image no larger than 1200 x 1200. Titles have a 50-character maximum with 16-24 recommended; copy has a 100-character maximum with 32-48 recommended.
- Context hints guide conversational matching but are not exact-match keywords or guaranteed placements.
- Insurance advertising is restricted and may be approved case by case. Legal advice, representation, legal claims services, and document preparation are prohibited.
- Ads and landing pages must be truthful, consistent, reachable, and free of interface imitation or implied OpenAI endorsement.

Official sources: [Ad policies](https://openai.com/policies/ad-policies/), [Ads basics](https://help.openai.com/en/articles/20001207-ads-in-chatgpt-the-basics), [campaign setup](https://help.openai.com/en/articles/20001210-create-campaigns-for-chatgpt), [ad groups](https://help.openai.com/en/articles/20001211), [ads and creative](https://help.openai.com/en/articles/20001212), and [launch schema](https://help.openai.com/en/articles/20001209-launch-campaigns).

### Internal preflight result

**Draftable, but not approved to launch.** Spur Auto truthfully describes itself as an independent vehicle appraiser and expressly says it is not a law firm or public adjuster. However, the promoted service is tied to insurance claim valuation, and the broader site includes claim-specific submission documents, response drafting, escalation material, and state-law content. Those facts create a reasonable risk of classification as restricted insurance advertising or prohibited legal/document-preparation services.

Do not disguise or remove truthful disclosures to evade review. Ask OpenAI Ads support for a category determination using the exact service description, destination URL, Texas scope, credentials/licensure, and sample deliverables. Launch only if the advertiser/account review explicitly permits the offer.

Additional destination blockers:

- The homepage claims Spur Auto often finds hundreds or thousands more, but no substantiation was found in the repository.
- The site repeatedly claims nationwide availability while the business plan says state-by-state expansion and no nationwide operating evidence was found.
- Timing, credentials, licensing, customer results, and guarantee performance need owner evidence before they are used in ads.

The draft ads intentionally omit those claims. Because OpenAI reviews destinations as well as creative, the site-level inconsistencies still need correction or substantiation before submission.

## 4. Campaign architecture

| Campaign | Objective | Geography | Budget | Ad group | Need-state | Max bid | Primary conversion | Destination |
|---|---|---|---:|---|---|---:|---|---|
| `openai_clicks_total_loss_tx_prospecting` | Clicks | Texas | $25/day | `offer_check` | Check a total-loss valuation before deciding | $3.00 max CPC | `lead_created` | `/free-review.html` |
| `openai_clicks_total_loss_tx_prospecting` | Clicks | Texas | Shared | `appraisal_evidence` | Evaluate independent appraisal evidence and price | $3.00 max CPC | `lead_created` | `/free-review.html` |

The $3.00 starting maximum CPC is the low end of OpenAI's current $3-$5 guidance. If delivery remains weak after account/ad approval and 48 hours of clean tracking, test $3.50 in one ad group at a time without changing copy or budget in the same observation window.

Intent guardrails: avoid injury, medical treatment, death, emotional crisis, personal-injury law, coverage advice, bad-faith litigation, debt/credit, auto loans, repair estimates, towing, salvage buyers, and diminished-value services. Ads Manager's current support for advertiser-defined negative contexts was not verified; treat these as creative, landing-page, and review guardrails rather than claiming a negative-keyword control.

## 5. Context hints and ad inventory

The exact hints are in `ad-groups.csv`. Each is a complete situation and stays inside one coherent ad-group job. They do not promise exact matching or access to user queries.

Four ads are in `ads.csv`. All titles are 21-22 characters and all copy lines are 42-47 characters, inside current recommended ranges. The message angles are:

- Free low-offer check
- Specific valuation inputs reviewed
- Review before buying
- Transparent $99 report price

Every ad maps to the same relevant free-review destination with a unique static `utm_content` value. No ad defaults to the homepage.

## 6. Creative briefs

### CR-OFFER-01

- Audience situation: checking an insurer's total-loss valuation
- Communication goal: show calm, independent evidence review
- Proof shown: redacted valuation packet and comparable vehicle listings
- Composition: appraiser hands, paper, laptop, one clear square focal area
- On-asset text: none
- Brand treatment: site favicon/advertiser identity supplied by Ads Manager; no generated logo in the image
- Policy controls: no crash damage, injury, distress, insurer logos, savings claims, UI imitation, or endorsement
- Destination match: free review page explains vehicle-detail and comparable review

### CR-EVIDENCE-01

- Audience situation: deciding whether a paid independent appraisal is worthwhile
- Communication goal: make the report and comparable evidence tangible
- Proof shown: finished bound report and three abstract/redacted comparable sheets
- Composition: clean overhead three-quarter still life
- On-asset text: none
- Policy controls: no legal imagery, certificates, outcome claims, third-party brands, or cash
- Destination match: free review page presents the optional $99 standard report

Final prompts and the rejected-first-draft correction are documented in `creative-prompts.md`.

## 7. Landing-page map

| Ad group / angle | Destination | Above-fold promise | Proof | CTA | Form friction | Event | Required change | Owner |
|---|---|---|---|---|---|---|---|---|
| Offer check | `/free-review.html` | Check a total-loss offer at no charge | Inputs reviewed and review process | Check my offer | Email, vehicle, mileage, ZIP, offer; insurer and file optional | `lead_created` | Confirm Texas eligibility, qualify unsupported nationwide wording, complete live pixel test | Business + analytics |
| Appraisal evidence | `/free-review.html` | Review first; optional complete report at $99 | Vehicle details, comparables, valuation audit | Start free | Same form | `lead_created` | Keep $99 price and scope consistent; obtain category approval | Business + policy owner |

The form requests only fields plausibly needed for the review. The optional insurer name and file upload should remain optional. UTM values currently stay in the browser URL, but no repository evidence showed those fields joining the submitted Web3Forms lead or a CRM record.

## 8. Measurement plan

| Event | Role | Browser source | Server source | Event ID | Consent rule | Destination | CRM join | QA status | Owner |
|---|---|---|---|---|---|---|---|---|---|
| `page_viewed` on landing page | Diagnostic | Not explicitly sent in current code | None found | N/A | Confirm applicable notice/choice requirements | OpenAI | None found | Optional implementation | Analytics |
| `lead_created` | Primary platform optimization proxy | Pixel fires on confirmed thank-you page | None found | UUID stored in session and passed as `event_id` | Privacy policy describes Pixel; counsel/owner to confirm consent behavior | OpenAI | No verified join | Code reviewed; live Ads Manager receipt test pending | Analytics |
| Qualified review lead | Business-quality signal | Not applicable | CRM/offline process needed | Stable lead ID needed | Minimize data and follow current OpenAI rules | Internal source of truth; optional CAPI later | Missing | Blocker for scale, not necessarily a bounded pilot | Business |
| Paid report | Revenue outcome | Stripe success path exists, but no OpenAI order event was verified | None found | Order/session ID needed | Payment and ad-data rules apply | Internal revenue source; optional CAPI later | Missing | Future workstream | Business + analytics |

Current Pixel code uses the documented `lead_created` event, `customer_action` type, and a unique event ID. The OpenAI Pixel automatically captures `oppref` and stores it in the first-party `__oppref` cookie. If a Conversions API implementation is added, reuse the same browser `event_id` as the server event ID for deduplication and send only currently permitted fields.

Official measurement sources: [conversion measurement](https://help.openai.com/en/articles/20001409-conversion-measurement), [JavaScript Pixel](https://developers.openai.com/ads/measurement-pixel), [Conversions API](https://developers.openai.com/ads/conversions-api), and [supported events](https://developers.openai.com/ads/supported-events).

UTM convention:

```text
utm_source=openai
utm_medium=cpc
utm_campaign=leads_total_loss_texas
utm_content=<intent>_<angle>_<variant>
utm_term=unspecified
```

Rendered example:

```text
https://www.spurauto.com/free-review.html?utm_source=openai&utm_medium=cpc&utm_campaign=leads_total_loss_texas&utm_content=offer_check_free_review_a&utm_term=unspecified
```

QA before activation:

1. Create/select the conversion data source and map `lead_created` as the campaign conversion.
2. Use the Pixel's documented debug mode in a safe test environment, submit one test lead, and confirm one event on the success page.
3. Refresh the success page and confirm no duplicate event.
4. Confirm `oppref` and every UTM survive the landing path and redirect.
5. Add hidden source fields or another first-party method so the submitted lead retains campaign/ad identifiers; never put personal or claim data in a URL.
6. Join confirmed leads to qualified-review and paid-report outcomes using an internal lead ID.
7. Document Ads Manager time zone, attribution window, modeled-conversion setting, and reporting lag when configured.

## 9. Budget and pacing

| Item | Value | Status |
|---|---:|---|
| Daily campaign budget | $25 | User approved; current minimum |
| Assumed pilot duration | 30 days | Owner approval needed |
| Maximum scheduled budget | $750 | Derived from 30 x $25; daily pacing may fluctuate |
| Starting max CPC | $3.00 per ad group | Strategic recommendation at low end of current guidance |
| Target CPA | Unset | Requires lead value and close economics |

No conversion forecast is presented because Spur Auto's observed ChatGPT Ads CPC, landing-page CVR, qualified-lead rate, and paid-report rate were not supplied. Useful planning formulas are:

```text
clicks = spend / observed average CPC
confirmed leads = clicks x observed form CVR
qualified leads = confirmed leads x observed qualification rate
paid reports = qualified leads x observed close rate
CPA = spend / confirmed leads
qualified CPA = spend / qualified leads
break-even lead CPA = contribution margin per paid report x lead-to-paid rate
```

Capacity references, not forecasts: $25 divided by a $3 average CPC is about 8.3 clicks/day; $25 divided by $5 is 5 clicks/day. Actual delivery can be lower, and a maximum bid is not an average CPC forecast.

## 10. Experiment backlog and decision rules

| Priority | Hypothesis | Variable | Control | Variant | Primary metric | Guardrail | Observation rule | Decision action |
|---:|---|---|---|---|---|---|---|---|
| 1 | The confirmed lead event is reliable | Measurement | One test submission | Refresh and repeat-path test | One event per confirmed lead | No PII/claim data sent; no duplicates | Complete before activation | Block spend if failed |
| 2 | Free-check framing earns more qualified interest than report framing | Message/ad group | `offer_check` | `appraisal_evidence` | Qualified lead rate | Confirmed lead CPA | Read directionally only after each group has at least 30 clicks and no tracking issue | Keep winner; rewrite loser without changing bid |
| 3 | Input-specific copy improves useful clicks | Ad copy | OA_TX_OFFER_A | OA_TX_OFFER_B | Confirmed lead CVR | CTR and qualified rate | At least 30 clicks per ad or 14 days, whichever is later | Keep the better business-quality variant |
| 4 | Transparent $99 pricing improves qualification | Ad copy | OA_TX_APPRAISAL_A | OA_TX_APPRAISAL_B | Qualified lead rate | Paid-report rate | Same rule; do not judge on CTR alone | Keep price-led copy only if downstream quality improves |
| 5 | Texas-specific page framing improves form completion | Landing page | Current destination | Texas-qualified ad landing variant | Form CVR | Policy clarity and qualification | Only after message test; one page variable family at a time | Ship only if claims and service scope stay accurate |
| 6 | A higher bid unlocks delivery | Max CPC | $3.00 | $3.50 in one group | Impressions and clicks | CPC and daily pacing | Only after 48 clean hours with approved ads and weak delivery | Retain only if volume improves within CPA guardrail |

Do not increase budget until the owner sets a qualified-lead CPA target and at least two consecutive weekly cohorts meet it with acceptable paid-report quality.

## 11. KPI dashboard specification

Create five views:

1. Executive: spend, confirmed leads, confirmed-lead CPA, qualified leads, qualified CPA, paid reports, contribution revenue.
2. Funnel: impressions -> clicks -> landing-page views -> form starts -> confirmed leads -> qualified leads -> paid reports.
3. Creative: CTR, landing-page-view rate, lead CVR, qualified rate, and paid rate by ad ID, angle, and visual.
4. Measurement health: Pixel event receipt, event-ID uniqueness, duplicate rate, `oppref` presence, UTM completeness, reporting delay, consent state.
5. Policy/operations: advertiser/account status, ad review status, disapproval reason, crawler status, broken URLs, price mismatch, claim evidence owner, creative review date.

Use Ads Manager for delivery metrics and the first-party lead/revenue system for business outcomes. Do not let cheap browser leads override poor qualified-lead or paid-report performance.

## 12. Preflight and handoff

| Item | Status | Evidence | Owner |
|---|---|---|---|
| Current platform mechanics verified | Pass as of 2026-07-21 | Official OpenAI sources linked above | Campaign owner |
| Policy/category review completed | **Blocked** | Insurance/claims adjacency and document-support scope need OpenAI determination | Business owner |
| Claims substantiated | **Blocked** | Price/free review confirmed; outcome/nationwide/credential claims need evidence | Business owner |
| Landing page loads and matches | Partial pass | Live URL and UTM URL returned HTTP 200 | Web owner |
| OAI-AdsBot and OAI-SearchBot access | Pass in direct test | Both returned HTTP 200; `robots.txt` allows all | Web owner |
| Creative format | Pass locally | Two JPGs, square, 1200 x 1200 | Campaign owner |
| Public image URLs | **Blocked until deployment** | Local files exist; hosted URLs not yet verified | Web owner |
| Browser event | Partial | Code matches current standard event; live receipt test pending | Analytics |
| Server events and deduplication | Not implemented | No CAPI evidence found | Analytics |
| CRM quality join | **Blocked for scale** | No source/quality join found | Business + analytics |
| Account verification and billing | Unverified | Live account was not modified or inspected | Account owner |
| Budget | Pass | $25/day user instruction | Account owner |
| Geography and dates | Needs approval | Texas and dates are explicit assumptions | Account owner |

### Launch blockers

1. OpenAI category eligibility/approval for the exact appraisal and claim-support offer.
2. Owner evidence for Texas licensing/service scope and removal or substantiation of nationwide/outcome claims.
3. Account verification, advertiser identity, favicon, billing, conversion mapping, and one live Pixel QA event.
4. Public deployment and HTTP 200 validation of both creative image URLs.
5. Owner approval of dates and a target CPA or allowable qualified-lead cost.

### Next three actions

1. Send OpenAI Ads support a precise category-review request with the destination, service boundary, Texas scope, credentials, and representative deliverables.
2. Resolve the site claims and run the measurement/UTM QA checklist.
3. After approval, transfer the CSV rows into the current Ads Manager template, keep all entities in Draft, and request a final preflight before activation.

