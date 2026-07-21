# Google Ads Search account audit

Prepared: 2026-07-21  
Account: Drive Right Car Buying / Spur Auto  
Scope: enabled and paused Search campaigns, ad groups, keywords, negative keywords, locations, RSAs, assets, bidding, budgets, and conversion readiness  
Method: read-only Google Ads UI review plus CSV exports; no live account changes were made

## Handoff status

**Ready after listed blockers.** Do not leave the account as-is, and do not add a fourth Search campaign now. Keep one non-brand core, prevent the overlapping July 25 campaign from launching in its current form, and treat competitor traffic as an isolated pilot that remains gated by measurement, owner approval, and legal review.

## Executive decision

1. **Measurement is the first blocker.** Both primary conversion actions are still `Awaiting conversions`, and Google Ads Diagnostics says no measurement features are set up. The current core campaign is nevertheless using Maximize Conversions.
2. **The two non-brand campaigns overlap.** The pending `TX | Search | Total Loss Review | Leads` campaign duplicates core appraisal themes, contains eight broad-match keywords, and points all three ads to the homepage.
3. **The competitor campaign is structurally sparse.** Only four keywords are effectively eligible in an enabled ad group. Three enabled competitor ad groups contain no enabled keywords, and most competitor RSAs are rated Poor.
4. **Negative coverage is inconsistent.** The competitor and pending review campaigns have campaign negatives; the core campaign has none. The live list also retains three risky multiword broad negatives that a prior repository review had already narrowed to phrase match.
5. **Geographic scope is coherent but incomplete to audit.** All three campaigns target Texas, English, and Google Search only. The live advanced location option was not exposed in the audited table, so presence-only targeting must be re-verified before launch.

## Observed account state

### Campaign map

| Campaign | Status / start | Budget | Bidding | Structure | Audit conclusion |
| --- | --- | ---: | --- | --- | --- |
| `TX | Search | Total Loss | Core` | Enabled; started 2026-07-20; learning | $30/day | Maximize Conversions | 2 enabled ad groups, 10 enabled exact/phrase keywords, 2 RSAs | Best base to preserve, but conversion bidding is not ready and the campaign has no negatives |
| `TX | Search | Total Loss Review | Leads` | Enabled but Pending; starts 2026-07-25 | $30/day | Maximize Clicks | 3 ad groups, 43 enabled keywords, including 8 broad; 3 RSAs | Do not let it launch unchanged; overlaps core and sends all groups to the homepage |
| `Search | Competitor | TX | EN` | Enabled; started 2026-07-18; learning | $25/day | Maximize Clicks | 6 ad groups, 56 keyword rows, 6 RSAs | Keep isolated and capped; only Dallas currently has an effective enabled keyword set |

Current combined daily budgets total **$85/day**, about **$2,584 per 30.4-day month** if fully spent. Lead value, close rate, target qualified-lead CPA, and an approved monthly ceiling were not available, so no budget amount is launch-ready.

### Performance evidence and reconciliation warning

- For the three current campaigns, both the last-7-day and last-30-day views show **0 impressions, 0 clicks, $0 spend, and 0 conversions**.
- The campaign start dates explain why there is no usable current-campaign history: July 18, July 20, and a future July 25 start.
- The 30-day campaign export also contains account totals that do not belong to the three current campaign rows: **6,044 impressions, 835 clicks, $374.06 cost, and 428 conversions** account-wide; Search totals are **1,366 impressions, 54 clicks, $190.61 cost, and 9 conversions**.
- These totals likely come from campaigns or inventory excluded by the current enabled/paused filter, including removed or historical entities. They must be reconciled before anyone treats the displayed $0.87 account CPA or $21.18 Search CPA as evidence for the new campaigns.

No search-term evidence exists for the three current campaigns. Keyword, bid, and negative recommendations in this audit are therefore structural and pre-launch, not performance-proven.

## Measurement audit

Observed conversion actions:

| Conversion action | Source | Optimization | Count | Status | Account-level goal |
| --- | --- | --- | --- | --- | --- |
| `Spur Auto – Free Review Submitted` | Website | Primary | One | Awaiting conversions | Included |
| `Spur Auto – Stripe Purchase` | Website | Primary | Every | Awaiting conversions | Included, but assigned to 0 of 3 current campaigns |

The core campaign uses the campaign-specific `Submit lead forms` goal and Maximize Conversions, while the conversion action has not yet recorded a verified conversion. This fails the measurement gate.

Required evidence before conversion-based bidding:

1. Submit one controlled free-review form and confirm exactly one Google Ads conversion.
2. Confirm a direct visit and refresh of the thank-you page do not create duplicates.
3. Complete one controlled Stripe test path and verify that only a confirmed paid Checkout Session creates a purchase conversion.
4. Retain GCLID/GBRAID/WBRAID and join the lead to CRM qualification; use `qualified_free_review` or an equivalent qualified outcome for optimization when available.
5. Reconcile the historical 428 account conversions with the currently enabled conversion actions and campaign-status filters.

Until then, the preferred operating choice is to keep acquisition campaigns paused. If the owner explicitly accepts a limited traffic-learning period, use tightly controlled exact/phrase inventory with Maximize Clicks and a documented CPC/loss cap instead of Maximize Conversions.

## Keyword and routing audit

### Core campaign

- 10 enabled keywords across `Total Loss Appraisal` and `Total Loss Value`.
- Exact and phrase only; no broad match and AI Max is off.
- The structure is compact and commercially relevant.
- The final URL is `https://www.spurauto.com/free-review.html` for both ad groups.
- The campaign has no attached negative keywords.

Recommendation: preserve this campaign as the single non-brand core. Add only unique, approved low-offer and insurer/valuation themes after removing duplicates from the pending campaign.

### Pending review campaign

- 43 enabled keywords in `Total Loss Appraisal`, `Low Offer / Payout`, and `CCC & Insurer Test`.
- Eight broad-match keywords sit in the appraisal group while conversion measurement is unverified.
- Exact, phrase, and broad versions of closely overlapping themes coexist in the same group.
- It overlaps the core campaign on `total loss appraisal`, `auto total loss appraisal`, `total loss appraisal near me`, and adjacent valuation intent.
- All three RSAs use the homepage as the actual final URL, despite display paths and copy promising a free-review flow.

Recommendation: do not launch this campaign on July 25. Migrate only unique exact/phrase themes into the core campaign, retain one message-matched ad group per intent, and point every acquisition group to `free-review.html` unless a stronger dedicated page is approved.

### Competitor campaign

- 56 keyword rows: 48 paused and 8 enabled.
- Four enabled rows are in the enabled `Dallas Auto Appraisers` group.
- Two enabled rows each remain inside paused `Collision Claims Advisors` and `Select Auto Appraisals` groups and therefore cannot serve.
- `AutoACV`, `TotalLoss.com`, and `TotalLossAppraiser.net` are enabled ad groups whose keyword inventory is entirely paused, producing Google's “ad groups without keywords” warning.
- Most modifier-heavy competitor keywords were already paused for low search volume. The two Dallas parent-brand terms and two Dallas review terms are the only practical current test inventory.

Recommendation: keep only a small, owner-approved Dallas pilot after measurement and legal gates pass. Do not add broad match, generic total-loss terms, or competitor trademarks to visible ad copy. Keep the campaign at 10–20% of approved Search test budget with a cumulative loss limit; pause it if Keyword Planner cannot support the test.

## Negative-keyword audit

Observed live inventory:

| Campaign | Negatives | Scope | Match-type mix |
| --- | ---: | --- | --- |
| Competitor | 50 | Campaign | Broad and phrase |
| Pending review | 36 | Campaign | Broad and phrase |
| Core | 0 | — | — |

Deterministic checks on 86 negatives against 109 positive keywords found:

- **0 literal positive/negative conflicts**;
- **0 exact-match negatives**;
- **60 broad and 26 phrase negatives**;
- **3 hygiene warnings** for multiword broad negatives: `sign in`, `log in`, and `customer service`.

Implementation recommendation:

1. Narrow the three warned multiword broad negatives to phrase after owner review.
2. Use the repository's proposed shared universal-irrelevance list only after its rows are approved and attached to explicit campaigns.
3. Add conservative core coverage for clearly irrelevant employment, education, non-vehicle appraisal, car-sale/salvage, and repair intent.
4. Keep valuable terms protected: `free`, `review`, `appraisal`, `valuation`, `actual cash value`, insurer names, comparison intent, and relevant legal-information journeys.
5. Add cross-negatives only after the receiving campaign/ad group is eligible, funded, geographically aligned, and page-matched.

## Geography and network audit

Observed for all three campaigns:

- Texas target;
- English language;
- Google Search only;
- no Search Partners shown;
- all-day schedules for the two non-brand campaigns;
- 6:00 AM–11:00 PM daily for the competitor campaign;
- all devices, with no active bid adjustments.

The Texas target and Texas-specific ad copy are aligned. Before launch, re-open each campaign's advanced location options and verify **Presence: people in or regularly in Texas**. Google's default can also include people who merely show interest in Texas, so the target name alone is not enough to establish presence-only behavior.

## Ads, assets, and landing pages

- 11 responsive search ads were exported: 6 competitor, 2 core, and 3 pending review.
- Deterministic RSA validation passed: 0 count, length, duplicate, or final-URL errors.
- Ad-strength distribution: 5 Poor, 3 Average, 2 Good, and 1 Excellent.
- Five of six competitor ads are Poor and all use the same generic comparison creative. Do not follow Google's keyword-in-copy suggestion by inserting competitor trademarks without explicit legal review.
- Core ads use `free-review.html` and have Good/Average strength.
- All three pending-review ads use the homepage; this is a page/message mismatch and should be corrected before launch.
- The major claims—free review, $99 report, 48-hour/two-business-day response, and conditional fee refund—are supported by the current site copy. The refund limitation and no-guarantee language remain important.
- 31 asset associations exist. The competitor ad diagnostics still request more sitelinks, so asset coverage should be reviewed campaign by campaign rather than assumed from the account total.

## Recommended implementation sequence

### Phase 0 — stop uncontrolled launch

Owner approval required for any live change.

1. Prevent `TX | Search | Total Loss Review | Leads` from starting on July 25 in its current form.
2. Keep the competitor campaign paused until measurement, legal, destination, and loss-limit approvals are recorded.
3. Prefer pausing the core campaign until the controlled lead test records correctly. If the owner accepts a traffic-learning exception, use exact/phrase only with capped Maximize Clicks.
4. Disable auto-apply recommendations that add keywords, broaden match types, alter budgets/bids, or create unreviewed assets.

### Phase 1 — pass measurement and reporting gates

1. Verify one deduplicated lead and one server-confirmed purchase.
2. Confirm the core campaign optimizes only to the intended lead goal.
3. Reconcile historical/removed campaign totals and current conversion actions.
4. Define qualified-lead value, close rate, target CPA, conversion lag, monthly budget, and maximum test loss.

### Phase 2 — consolidate non-brand Search

Use `TX | Search | Total Loss | Core` as the single non-brand campaign:

- `Total Loss Appraisal` — exact/phrase, `free-review.html`;
- `Total Loss Value / ACV` — exact/phrase, `free-review.html`;
- `Low Offer / Settlement` — selected unique exact/phrase terms from the pending campaign;
- `CCC / Insurer Valuation` — selected unique exact/phrase terms with insurer-neutral, claim-specific copy.

Remove duplicate themes from the pending campaign instead of allowing both campaigns to compete. Do not launch broad match until meaningful conversions, search-term governance, and budget for discovery exist.

### Phase 3 — approve negatives and page alignment

1. Review and approve the shared-list candidates.
2. Apply the narrowest safe negative match type and rerun conflict screening.
3. Point every acquisition RSA to `free-review.html` or an approved intent-specific page.
4. Keep competitor names out of headlines, descriptions, paths, images, and Dynamic Keyword Insertion.
5. Add enough accurate sitelinks and callouts at the appropriate level to remove asset gaps.

### Phase 4 — controlled launch and evaluation

1. Launch only the consolidated core first.
2. Review search terms daily for the first week, then weekly when volume stabilizes.
3. Assess qualified leads, not raw form fills. Account for conversion lag before exclusions or bid changes.
4. Launch the Dallas competitor pilot only after the core is measurable and its separate approval/loss cap is signed.
5. Consider a separate brand campaign only if Keyword Planner, Auction Insights, or search-term evidence shows material branded demand or competitor pressure.

## Decision table

| Question | Decision |
| --- | --- |
| Leave the account unchanged? | **No** |
| Add a new Search campaign now? | **No** |
| Preserve the existing core? | **Yes, after measurement and negative-keyword fixes** |
| Launch the July 25 review campaign unchanged? | **No** |
| Keep competitor Search as a major lead source? | **No; retain only as a capped secondary pilot** |
| Use broad match now? | **No** |
| Use Maximize Conversions now? | **Not until the intended conversion is verified** |

## Open approvals and dependencies

- Owner: pause/launch decisions, budget, CPC/loss caps, broad match, and negative approvals.
- Analytics/engineering: conversion verification, deduplication, click-ID retention, CRM qualification, and historical conversion reconciliation.
- Legal/compliance: competitor-keyword and comparative-advertising review; no legal conclusion is made here.
- Marketing/site owner: final URL mapping, claim evidence, sitelinks, and campaign-specific page fit.
- Ads owner: presence-only location verification, auto-apply audit, Search Terms cadence, and change log.

## Current platform references

- Google Ads: [About Smart Bidding](https://support.google.com/google-ads/answer/7065882)
- Google Ads: [Your guide to broad match](https://support.google.com/google-ads/answer/12159290)
- Google Ads: [Prevent clicks outside geo-targeted locations](https://support.google.com/google-ads/answer/9376662)
- Google Ads: [About targeting geographic locations](https://support.google.com/google-ads/answer/2453995)

