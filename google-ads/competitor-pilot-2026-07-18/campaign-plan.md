# Spur Auto Competitor Search Campaign Plan

Prepared 2026-07-18. Facts, estimates, hypotheses, and recommendations are labeled. This is an implementation-ready plan, not legal clearance and not confirmation of a live Google Ads change.

## 1. Executive recommendation

**Recommendation:** Limited pilot.

**Goal:** Acquire Texas vehicle owners who are actively evaluating another total-loss appraisal provider and convert them into qualified free claim reviews.

**Why:** Direct-competitor evaluation searches have strong commercial intent, but navigational intent, low volume, trademark complaints, weak message match, and expensive clicks make this a bounded test rather than a scaling channel.

**Primary success metric:** Cost per CRM-qualified free review.

**Maximum test budget and loss limit:** $25 average daily budget; $750 hard cumulative pause point during the first 30 days. Google may spend above the average daily amount on individual days, so use a spend rule or portfolio control in addition to the daily setting.

**Initial bid posture:** Manual CPC, $2.50 keyword cap, Google Search only. Do not use broad match, Search Partners, Dynamic Keyword Insertion, Target Impression Share, or conversion-based bidding at launch.

**Wave 1 enabled after gates:** AutoACV, TotalLoss.com, TotalLossAppraiser.net, Dallas Auto Appraisers.  
**Wave 2 held paused:** Select Auto Appraisals and Collision Claims Advisors, pending Wave 1 query quality and volume.

## 2. Assumptions and open questions

| Item | Status | Assumption or question | Decision impact |
|---|---|---|---|
| Geography | Assumption | Texas only; presence in Texas, not merely interest | Other states require separate licensing, offer, law, and economics review |
| Language | Assumption | English only | Spanish needs its own ads, page, and support workflow |
| Product | Fact from repository | Free review; $99 Essential, $299 Guided, $299 Specialty, $449 combined package | Supports review-first offer and price assets |
| Delivery | Fact from repository | Standard delivery targeted within 48 hours after the file is complete | Copy must keep the complete-file qualification |
| Guarantee | Fact from Terms | Package fee refunded if Spur Auto's appraisal does not support a value above the pre-appraisal insurer offer | Does not promise settlement recovery; exact terms must remain linked |
| Credentials | Unverified | README says credentials and license numbers are placeholders until replaced | Do not use “licensed,” “certified,” experience years, or case-count claims in ads |
| Historical ads data | Unknown | No search terms, Auction Insights, conversion history, or Keyword Planner forecast supplied | Start exact-first with manual caps and validate forecasts before enabling |
| Unit economics | Estimate | AOV $230–$245, free-review-to-paid 25–35%, gross margin 60%+, refund rate below 5% are planning assumptions | Sets a provisional qualified-lead CPA ceiling; replace with real cohort data |
| Lead qualification | Recommendation | A review is qualified when it is a Texas personal-auto total-loss claim, has an insurer offer, sufficient vehicle details, and is potentially serviceable | This must be a CRM event, not a pageview or button click |
| Customer suppression | Unknown | No existing-customer or purchaser audience supplied | Do not upload or target customer data until consent and policy review are complete |
| Legal guidance | Unknown | No written trademark or comparative-advertising advice supplied | Counsel sign-off is a launch gate; this plan does not provide legal clearance |

Discovery items before enablement: confirm service capacity, real paid conversion and gross margin, ownership/authorization for any marks, verified credentials, supported counties/vehicles, CRM owner, follow-up SLA, and whether calls are a saleable lead source.

## 3. Legal and policy verification matrix

| Market/use | Platform-policy finding | Legal/business boundary | Evidence and as-of date | Owner | Status |
|---|---|---|---|---|---|
| US/Texas — competitor keyword | Google says it will not restrict trademarks used as keywords | Keyword permissibility does not establish trademark legality or commercial wisdom | [Google trademark policy](https://support.google.com/adspolicy/answer/6118), checked 2026-07-18 | Ads owner + counsel | Lower/moderate risk; exact/phrase only |
| Visible ad text | Google says it will restrict use of a trademark in a direct competitor's ad after review/complaint | No competitor mark, confusing affiliation, logo, or trade dress in this build | [Google trademark policy](https://support.google.com/adspolicy/answer/6118), checked 2026-07-18 | Ads owner + counsel | Competitor marks prohibited |
| Display paths | Google distinguishes display-domain treatment, but visible implication still creates confusion risk | Use only `review/compare` and `texas/appraisal`; never a competitor name | [Google trademark policy](https://support.google.com/adspolicy/answer/6118), checked 2026-07-18 | Ads owner | Approved pattern |
| Landing page | Google evaluates landing-page use separately from ad-text use | First pilot page is competitor-neutral; no logos, marks, or “better than” claims | [Google trademark policy](https://support.google.com/adspolicy/answer/6118), checked 2026-07-18 | Counsel + site owner | Review before deployment |
| Confusion / false claims | Federal law can create liability for likely confusion about affiliation/sponsorship and material misrepresentation in commercial advertising | Independence disclaimer is included; all comparative claims stay out until substantiated and reviewed | [15 U.S.C. §1125](https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title15-section1125), law in effect 2026-07-15 | Qualified counsel | Unresolved legal conclusion |
| Texas appraisal statements | Texas Insurance Code Chapter 1813 applies to covered policies delivered, issued for delivery, or renewed on/after 2026-01-01 | Do not claim every policy or every claim has identical rights; review the actual policy | [Texas Insurance Code Ch. 1813](https://statutes.capitol.texas.gov/Docs/IN/pdf/IN.1813.pdf), checked 2026-07-18 | Texas insurance counsel | Use only in educational copy after review |
| Texas implementation deadlines | TDI proposed 28 TAC §§5.9800–5.9806 in May 2026; a final adoption was not verified in the Texas Register through 2026-07-18 | Do not advertise the proposed 120-day demand deadline or proposed procedure as final law | [Texas proposed appraisal rules](https://www.sos.state.tx.us/texreg/archive/May82026/Proposed%20Rules/28.INSURANCE.html), checked 2026-07-18 | Texas insurance counsel | Monitor before launch and monthly |
| Keyword matching | Phrase can reach exact traffic and additional meaning-related searches; broad reaches further | Exact-first protects the pilot; phrase is limited to two high-intent terms per ad group | [Google keyword matching](https://support.google.com/google-ads/answer/14996023), checked 2026-07-18 | Ads owner | Applied |
| Negative keywords | Google states negatives do not expand to close variants; singular/plural and synonyms may need separate entries | Negative list includes the needed variants and avoids blocking “free review” and comparison intent | [Google negative keywords](https://support.google.com/google-ads/answer/2453972), checked 2026-07-18 | Ads owner | Applied |
| Search Partners | Partner inventory extends beyond Google Search, including YouTube and other sites | Off for intent control; test separately only after qualified economics exist | [Google Search Partners](https://support.google.com/google-ads/answer/2616017), checked 2026-07-18 | Ads owner | Off |

No legal clearance is claimed. The unresolved question is how a court would assess each mark, query, and page in context; qualified counsel must own that conclusion.

## 4. Competitor and intent prioritization

Priority formula: `intent × product fit × differentiation × evidence confidence ÷ expected competition`, using 1–5 ordinal inputs. Scores are directional hypotheses, not search-volume or CPC forecasts.

| Competitor | Intent | Fit | Differentiation | Evidence | Competition | Score | Wave | Basis |
|---|---:|---:|---:|---:|---:|---:|---|---|
| TotalLossAppraiser.net | 5 | 5 | 5 | 5 | 3 | 41.7 | 1 | Public site shows a $550 flat fee and about two-week delivery; Spur's verified package and timing structure is materially different |
| Dallas Auto Appraisers | 5 | 5 | 4 | 4 | 3 | 26.7 | Direct Texas/DFW total-loss service with appraisal-clause support; strong local overlap |
| AutoACV | 5 | 5 | 4 | 5 | 4 | 25.0 | Direct free-review and appraisal offer; public pricing includes $199 report and a separate percentage-fee option |
| TotalLoss.com | 5 | 5 | 4 | 5 | 4 | 25.0 | Direct free consultation and $399 appraisal-clause service |
| Select Auto Appraisals | 4 | 5 | 3 | 4 | 3 | 16.0 | Nationwide total-loss and diminished-value service with a guarantee; pricing not found on reviewed page |
| Collision Claims Advisors | 4 | 4 | 3 | 3 | 3 | 12.0 | Overlapping total-loss appraisal service, but also serves attorneys, adjusters, and carriers, creating mixed consumer intent |

High-priority intent clusters: `alternative`, `competitors`, `reviews`, `pricing`, and `cost`.  
Moderate intent cluster: `switch from`.  
Excluded from the pilot: naked competitor brands, support/login queries, insurer brands, CCC/Mitchell/Audatex terms, and broad generic appraisal terms.

## 5. Campaign architecture

| Setting | Build |
|---|---|
| Campaign | `Search | Competitor | TX | EN` |
| Campaign type | Search |
| Status on import | Paused |
| Networks | Google Search only; Search Partners off; Display off |
| Location | Texas |
| Location option | Presence: people in or regularly in targeted locations |
| Language | English |
| Schedule | 06:00–23:00 America/Chicago, all days; review daypart quality after 100 clicks |
| Devices | All; no initial bid adjustments |
| Audiences | None at launch; no remarketing based on an accident/claim state |
| Budget | $25 average per day; $750 cumulative pilot stop rule |
| Bidding | Manual CPC, $2.50 maximum keyword bid |
| Match | Exact-first; two controlled phrase keywords per competitor; no broad |
| Auto-apply | Disable recommendations that broaden match, add keywords, change bids/budgets, or create assets |
| URL | Dedicated competitor-neutral comparison page with per-ad-group UTM content |
| Ad groups | One competitor per group; evaluation intents collapsed because expected volume is sparse |

The exact build is in `google-ads-editor-keywords.csv`; all rows are paused. No cross-negatives are needed because one competitor name is isolated per ad group and naked-brand positives are absent.

## 6. Economics, bids, and budget

Repository planning assumptions are not observed campaign facts.

`gross profit per qualified free review = AOV × free-review-to-paid rate × (1 − refund rate) × gross margin`

| Scenario | AOV | Paid rate | Refund | Gross margin | Break-even qualified-review CPA |
|---|---:|---:|---:|---:|---:|
| Conservative | $230 | 25% | 5% | 60% | $32.78 |
| Base | $237.50 | 30% | 5% | 60% | $40.61 |
| Upside | $245 | 35% | 5% | 60% | $48.88 |

**Recommendation:** Target qualified-review CPA ≤ $25 during the pilot; treat $33 as the provisional hard economic ceiling until observed margins and paid conversion replace assumptions.

`break-even CPC = target CPA × click-to-qualified-review rate`

| Click-to-qualified-review CVR | CPC at $25 target CPA | CPC at $33 ceiling |
|---:|---:|---:|
| 4% | $1.00 | $1.32 |
| 6% | $1.50 | $1.98 |
| 8% | $2.00 | $2.64 |
| 10% | $2.50 | $3.30 |

The $2.50 initial max CPC assumes a 10% qualified-review CVR at the target CPA or roughly 8% at the provisional ceiling. If the market requires higher bids, do not raise the cap until actual qualified conversion and gross-profit data supports it.

## 7. Creative design and prohibited copy

Two hypotheses are built in `google-ads-editor-rsas.csv`:

1. **Review and risk reversal:** free offer review, transparent starting price, and accurately qualified refund terms.
2. **Evidence and control:** hand-reviewed numbers, market comparables, clear documentation, and customer control of insurer communication.

Launch RSA A only. Keep RSA B paused until either RSA A reaches 200 clicks or the campaign reaches five qualified reviews. Then run a controlled creative test without changing bids, keywords, or landing page at the same time.

Prohibited:

- Competitor trademarks in headlines, descriptions, paths, images, or automatically inserted text.
- Dynamic Keyword Insertion or keyword-based URL text rendered to users.
- “Best,” “cheapest,” “fastest,” “more accurate,” “wins,” settlement-increase promises, or competitor-negative claims.
- “Licensed,” “certified,” founder tenure, or case-count claims until credentials are replaced and documented.
- The Texas Department of Insurance's aggregate $5,300 result as a Spur Auto result or expected outcome.
- Any statement that Spur Auto negotiates with or represents a customer before an insurer.

All RSA assets are designed to be grammatical in any combination. No pins are required.

## 8. Landing-page brief

Implemented draft: `compare-total-loss-appraisal-services.html`.

| Element | Requirement |
|---|---|
| Search intent | Answer “how do I compare providers?” before asking for the free review |
| Hero | “Start with the evidence, not a sales pitch” + free-review CTA |
| Comparison dimensions | Scope, sources, price structure, delivery trigger, claim control, and limitations |
| Spur facts | Free review, $99 Essential package, 48-hour standard delivery after complete file, exact refund qualification |
| Proof | Sample-report link; no testimonials, case outcomes, or credentials until verified |
| Independence | Clear statement that Spur Auto is not affiliated with an insurer or another appraisal provider |
| Trademark treatment | No competitor marks, logos, screenshots, or trade dress in Wave 1 |
| Legal limitation | No insurer-response promise; Terms and Disclaimer linked |
| Mobile/accessibility | Semantic headings, keyboard skip link, existing responsive components, no interstitial |
| Conversion path | Landing page → `free-review.html` → Web3Forms → `thank-you.html` |

Before deploy: render at 375, 768, and 1440 pixels; test all CTAs; confirm TLS and canonical; inspect page speed; verify that query parameters persist to the form/CRM or add first-party attribution storage.

## 9. Measurement specification

| Event | Primary/secondary | Trigger | Value | Deduplication | CRM/offline mapping | Current status |
|---|---|---|---:|---|---|---|
| `qualified_free_review` | Primary | CRM marks Texas total-loss submission serviceable after human review | $25 provisional optimization value | CRM lead ID/order ID + click identifier | Import enhanced conversions for leads through Google Ads Data Manager with GCLID and available GBRAID/WBRAID, consent, and hashed first-party identifiers | Not implemented |
| `free_review_submitted` | Secondary | Confirmed `thank-you.html` reached after Web3Forms success | 0 | Unique lead ID; count one | Lead created in CRM | Google Ads event not implemented |
| `paid_report` | Secondary reporting / later primary value | Stripe payment succeeds and CRM order is matched | Actual net revenue | Stripe event ID/order ID | Import value and package tier | Not implemented |
| `landing_cta_click` | Secondary diagnostic | Click from comparison page to free-review page | 0 | Session/event ID | Preserve competitor/ad group attribution | Not implemented |
| `phone_qualified_lead` | Secondary until call process exists | Call exceeds qualification threshold and is tagged qualified | $25 provisional | Google forwarding/call ID | CRM call record | No call asset in pilot |

Repository finding: `js/google-ads.js` loads `AW-18071301983`, but no `gtag('event','conversion', ...)` for Google Ads is present. `js/ads-conversions.js` handles a separate OpenAI Ads pixel and does not complete Google Ads conversion measurement.

Required dimensions: campaign, competitor/ad group, intent, keyword, search term, match type, network, device, location, RSA, landing-page version, GCLID/GBRAID/WBRAID, consent state, lead qualification, paid package, net revenue, and refund.

Current implementation note: Google states that beginning 2026-06-15, offline-conversion and enhanced-conversions-for-leads uploads migrate to the Data Manager API and are blocked in the Google Ads API for workflows without legacy access. Use [Google Ads Data Manager / enhanced conversions for leads](https://support.google.com/google-ads/answer/11021502), not a new legacy file/API implementation. Google also recommends importing GCLID when available, unique order IDs for deduplication, conversion value, consent, and GBRAID/WBRAID when available; checked 2026-07-18.

Attribution recommendation: data-driven attribution when supported; preserve first-party CRM timestamps and report both click-to-lead and lead-to-paid lag. Do not optimize to CTA clicks or pageviews.

## 10. Experiment and decision rules

| Hypothesis | Variant | Budget | Minimum evidence | Guardrail | Scale rule | Stop rule |
|---|---|---:|---|---|---|---|
| Competitor evaluation traffic can create qualified reviews | Wave 1 exact + controlled phrase | Up to $750 | 100 clicks or 5 qualified reviews, while respecting conversion lag | Search-term relevance ≥80%; no policy event; CPC ≤$2.50 | Qualified CPA ≤$25 and at least 3 qualified reviews: add up to 20% budget, not bids | Pause at $750 with qualified CPA >$33 or zero paid pipeline |
| Exact terms can expand safely to phrase | Phrase terms already isolated | Included | 30 phrase clicks | Wasted-spend rate ≤20% | Keep phrase when qualified CPA is no worse than 25% above exact | Pause phrase if irrelevant/support navigation exceeds 30% |
| Review/risk reversal beats evidence/control | RSA A vs RSA B sequentially | No extra | 200 clicks or 5 qualified reviews on A before B | Change creative only | Keep winner if qualified CVR improves ≥20% without lower lead quality | End if neither produces qualified reviews by cluster loss limit |
| Lower-priority competitors add incremental volume | Wave 2 ad groups | Separate $250 slice inside a future approved budget | Wave 1 reaches ≥5 qualified reviews | Same CPA ceiling | Enable one group at a time when Wave 1 CPA ≤$25 | Re-pause at $100 spend without a qualified review |
| Search Partners add efficient reach | Separate future experiment | Not in pilot | Requires reliable offline conversion import | Never mix into core results | Test only if qualified CPA and query transparency remain acceptable | Stop on low-quality traffic or CPA >$33 |

Cluster rules:

- Daily for days 1–7: check policy status, spend, search terms, destination health, lead duplicates, and CRM qualification.
- Pause any keyword after $100 spend without a qualified review, unless known conversion lag justifies waiting.
- Pause a competitor cluster after $200 spend without a qualified review.
- Add a negative immediately for support/login/employment or irrelevant appraisal intent.
- Do not infer competitor budget, bids, or profitability from Auction Insights.
- Scale by competitor/intent only; never apply a blanket bid increase.

## 11. Launch checklist

- [ ] Texas counsel reviewed keyword use, visible copy, landing page, guarantee language, and current appraisal-law statements separately.
- [ ] Google trademark, misrepresentation, destination, and local-law policies rechecked on launch day.
- [ ] Competitor evidence ledger refreshed; all sources and dates recorded.
- [ ] Landing page deployed, mobile-rendered, accessible, fast, and free of 404s.
- [ ] Every CTA reaches the form and every successful form reaches `thank-you.html`.
- [ ] Google Ads `free_review_submitted` event installed and deduplicated.
- [ ] GCLID/GBRAID/WBRAID and consent state captured through Web3Forms and stored in CRM.
- [ ] `qualified_free_review` enhanced-conversions-for-leads import tested through Google Ads Data Manager with a non-production QA lead.
- [ ] Stripe/CRM paid report and refund values can be reconciled.
- [ ] Campaign, budget, and conversion goal isolated from brand/generic traffic.
- [ ] Google Search only; Search Partners and Display off.
- [ ] Texas presence option and English language verified.
- [ ] $25 average daily budget, $2.50 max CPC, and $750 cumulative pause rule verified.
- [ ] Exact/phrase syntax checked and all positives tested against negatives.
- [ ] Wave 1 active only after approval; Wave 2 remains paused.
- [ ] DKI absent; broad match absent; unsafe auto-apply recommendations disabled.
- [ ] Every RSA combination reviewed in the Google Ads preview.
- [ ] Sitelinks, callouts, structured snippets, paths, and final URLs checked.
- [ ] No competitor mark appears in visible copy or display paths.
- [ ] No credentials, outcomes, or comparative claims lack current evidence.
- [ ] First-week daily owner and weekly sales-feedback owner assigned.
- [ ] Written approval records the $750 maximum acceptable test loss.

## 12. Sources

Policy, measurement, and law: [Google trademark policy](https://support.google.com/adspolicy/answer/6118), [Google keyword matching](https://support.google.com/google-ads/answer/14996023), [Google negative keywords](https://support.google.com/google-ads/answer/2453972), [Google responsive search ads](https://support.google.com/google-ads/answer/7684791), [Google Search Partners](https://support.google.com/google-ads/answer/2616017), [Google enhanced conversions for leads](https://support.google.com/google-ads/answer/11021502), [15 U.S.C. §1125](https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title15-section1125), [Texas Insurance Code Ch. 1813](https://statutes.capitol.texas.gov/Docs/IN/pdf/IN.1813.pdf), and [Texas proposed appraisal rules](https://www.sos.state.tx.us/texreg/archive/May82026/Proposed%20Rules/28.INSURANCE.html).

Market evidence: [AutoACV pricing](https://autoacv.com/pricing), [TotalLoss.com](https://totalloss.com/), [TotalLossAppraiser.net](https://www.totallossappraiser.net/), [Dallas Auto Appraisers](https://www.dallasautoappraisers.com/total-loss.html), [Select Auto Appraisals](https://www.selectautoappraisals.com/home), [Collision Claims Advisors](https://www.collisionclaimsadvisors.com/), and the [Texas Department of Insurance appraisal experience report](https://www.tdi.texas.gov/reports/pc/documents/2024-appraisal-experience-data-call-report.pdf). All checked 2026-07-18.
