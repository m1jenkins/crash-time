# Live Competitor Campaign Optimization Audit

Date: 2026-07-19
Live campaign ID: 24045577664 (account OCID 8145604253)
Reference build: this folder, prepared 2026-07-18

This audit was produced without direct access to the Google Ads account. Everything in Section 1 was verified against the live website and this repository. Everything in Section 3 must be checked inside the Google Ads UI against the researched build; the checklist maps each item to where it lives in the interface.

## 1. Verified today (no account access needed)

| Item | Status | Evidence |
|---|---|---|
| Landing page deployed | PASS | `https://www.spurauto.com/compare-total-loss-appraisal-services.html` is live, renders the hero, CTAs, six comparison questions, pricing facts, and the independence disclaimer from the landing-page brief |
| Competitor-neutral page | PASS | No competitor names, logos, or comparative claims appear on the live page |
| Conversion path | PASS | Landing page links to `free-review.html`; form posts to Web3Forms and redirects to `thank-you.html` |
| Google Ads conversion event | FIXED IN CODE, PENDING LABEL | `js/google-ads.js` now fires a deduplicated `free_review_submitted` conversion on `thank-you.html`; it stays inert until the conversion label from the account is pasted in (Section 2, step 1) |
| Click-ID and UTM capture | FIXED IN CODE, PENDING DEPLOY | New `js/attribution.js` captures gclid, gbraid, wbraid, all UTM parameters, and network/device/matchtype, stores them first-party for 90 days, and injects them as hidden Web3Forms fields so every lead record carries its click attribution |
| End-to-end test | PASS | Headless Chromium test confirmed: capture on ad landing, persistence to the form page, hidden-field injection, one-time conversion fire with `transaction_id`, no double-count on refresh |

## 2. Blocking steps before the campaign can be optimized at all

Optimization requires conversion data. Until these two steps are done, the account has zero signal to optimize against and every dollar spent is unmeasurable.

1. **Create the conversion action and paste its label.** In Google Ads: Goals > Conversions > New conversion action > Website > manual event. Name it `free_review_submitted`, category Submit lead form, count One, click-through window 30 days. Copy the conversion label (the part after the `/` in `AW-18071301983/XXXXX`) into `LEAD_CONVERSION_LABEL` in `js/google-ads.js`, then deploy.
2. **Deploy this branch to the live site.** The attribution capture and conversion event only work once `js/attribution.js` and the updated `js/google-ads.js` are live.

After both: submit one QA lead through an ad preview click and confirm the conversion registers in Google Ads (it can take a few hours) and the lead email/CRM record contains the gclid and UTM fields.

The `qualified_free_review` CRM import (enhanced conversions for leads through Google Ads Data Manager) remains open per the campaign plan; the hidden-field capture above is its prerequisite.

## 3. Settings checklist against the live campaign

Verify each row in the Google Ads UI for campaign 24045577664. Expected values come from `campaign-settings.csv` and the campaign plan.

| # | Setting | Expected | Where to check |
|---|---|---|---|
| 1 | Campaign type and networks | Search; Google Search only; Search Partners OFF; Display OFF | Campaign > Settings > Networks |
| 2 | Location | Texas only | Campaign > Settings > Locations |
| 3 | Location option | Presence: people in or regularly in targeted locations (NOT "presence or interest") | Campaign > Settings > Locations > Location options |
| 4 | Language | English | Campaign > Settings > Languages |
| 5 | Bidding | Manual CPC; no Enhanced CPC; no conversion-based bidding yet | Campaign > Settings > Bidding |
| 6 | Max CPC | $2.50 on every keyword | Keywords column view; sort by Max CPC |
| 7 | Daily budget | $25.00 | Campaign > Settings > Budget |
| 8 | Ad schedule | 06:00 to 23:00 America/Chicago, all days; confirm account time zone matches | Campaign > Settings > Ad schedule |
| 9 | Wave 1 ad groups enabled | AutoACV, TotalLoss.com, TotalLossAppraiser.net, Dallas Auto Appraisers | Ad groups list |
| 10 | Wave 2 ad groups paused | Select Auto Appraisals, Collision Claims Advisors and all their keywords/ads | Ad groups list |
| 11 | Match types | Exact for all keywords except the two designated phrase keywords per Wave 1 competitor; NO broad match anywhere | Keywords list; filter by match type |
| 12 | RSA A enabled, RSA B paused | One enabled RSA per Wave 1 ad group; RSA B stays paused until A reaches 200 clicks or 5 qualified reviews | Ads list |
| 13 | No DKI | No `{KeyWord:...}` in any headline, description, or path | Open each RSA |
| 14 | Display paths | `compare` / `texas` only; no competitor name in paths | Ads list |
| 15 | Final URLs | All point to `compare-total-loss-appraisal-services.html` with the per-ad-group `utm_content` from the keywords CSV | Ads and keywords final URL columns |
| 16 | Negative keywords attached | All 50 campaign-level negatives from `negative-keywords.csv` | Campaign > Keywords > Negative keywords |
| 17 | Assets | Sitelinks, callouts, structured snippets from `ad-assets.csv`; nothing auto-created | Campaign > Assets |
| 18 | Auto-apply recommendations OFF | Disable every recommendation type that adds keywords, broadens match, changes bids/budgets, or creates assets | Recommendations > Auto-apply (gear icon) |
| 19 | Conversion goal isolation | Campaign uses campaign-specific conversion goal (`free_review_submitted`, later `qualified_free_review`) and does not optimize to account-default goals from other campaigns | Campaign > Settings > Goals |
| 20 | No audience expansion | No audiences, no optimized targeting, no remarketing lists | Campaign > Audiences |

Trademark hygiene reminder while auditing: competitor names must appear ONLY in keywords and internal ad-group names, never in rendered ad text or paths.

## 4. Ongoing optimization cadence (from the experiment rules)

Daily for the first 7 days of spend, then weekly:

1. **Search terms report** (Keywords > Search terms): add an immediate negative for any support/login/employment or irrelevant-appraisal query; target at least 80% relevance. Pause the phrase keywords in an ad group if irrelevant or navigational queries exceed 30% of its traffic.
2. **Spend guardrails**: pause any keyword at $100 cumulative spend without a qualified review; pause a competitor ad group at $200; pause the campaign at $750 total spend if qualified CPA exceeds $33 or the paid pipeline is empty. Google can overspend the daily budget on single days, so track cumulative spend, not days elapsed.
3. **Policy status** (Ads > Policy details): a trademark disapproval or limited status on any RSA needs same-day attention; do not appeal with competitor-name copy.
4. **CPC discipline**: do not raise the $2.50 cap on any keyword until observed qualified-review conversion data supports it (break-even math is in campaign-plan.md Section 6).
5. **Scaling rule**: at qualified CPA at or under $25 with at least 3 qualified reviews, add up to 20% budget; never blanket-raise bids. Enable Wave 2 one ad group at a time only after Wave 1 produces 5 or more qualified reviews; re-pause any Wave 2 group at $100 spend without a qualified review.
6. **Creative test**: keep RSA B paused until RSA A reaches 200 clicks or 5 qualified reviews, then run it as the only change.
7. **Do not act on Auction Insights** as evidence of competitor budgets or profitability.

## 5. What changed in this repository on 2026-07-19

- `js/attribution.js` (new): first-party capture of gclid/gbraid/wbraid, UTM, and ValueTrack parameters; 90-day persistence; hidden-field injection into `#free-review-form` and `#hero-contact-form`.
- `js/google-ads.js`: adds the deduplicated `free_review_submitted` conversion event on `thank-you.html`, inert until `LEAD_CONVERSION_LABEL` is set.
- `compare-total-loss-appraisal-services.html`, `free-review.html`, `index.html`: load `js/attribution.js`.
- All pages: cache-busting version bump for `js/google-ads.js`.
