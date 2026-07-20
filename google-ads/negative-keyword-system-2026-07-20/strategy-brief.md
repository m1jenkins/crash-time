# Spur Auto negative-keyword strategy

Prepared 2026-07-20. This is a **seed recommendation**, not a performance-proven negative list and not a record of live-account changes.

## Objective and business boundary

- Optimize Texas Search traffic toward CRM-qualified free total-loss claim reviews.
- Serve private-passenger total-loss claimants; diminished value and other valuation services are excluded from paid acquisition for this launch.
- Use Texas statewide presence targeting. Geography is controlled by campaign settings rather than state-name negatives; metro performance should be reported for Dallas–Fort Worth, Houston, San Antonio, Austin, and the remaining Texas market.
- The repository's provisional qualified-review CPA is for reporting and economic review only. It is not an automatic query-exclusion threshold.

No Search Terms performance history was available on 2026-07-20. Conversion lag and attribution-window inputs remain unknown.

## Intent map

| Class | Treatment | Examples |
| --- | --- | --- |
| Wanted | Keep eligible | total-loss appraisal, low insurer offer, actual cash value, appraisal clause, settlement dispute, free review |
| Unwanted | Review for exclusion | employment, appraisal education, non-vehicle appraisal, car selling, pre-purchase inspection, diminished value, unrelated insurance lines |
| Ambiguous | Keep active | free, DIY, reddit, sample, template, reviews, complaints, attorneys, CCC, Mitchell, KBB |
| Route | Campaign negative only after destination gate | AutoACV, TotalLoss.com, TotalLossAppraiser.net, Dallas Auto Appraisers, Select Auto Appraisals, Collision Claims Advisors |

## Scope architecture

`Spur Auto | Universal Irrelevance` is a proposed shared list attached only to:

- `Search | Competitor | TX | EN`
- `TX | Search | Total Loss Review | Leads`

The paused legacy `Competitors' Campaign` remains excluded. No account-level negatives are proposed while legacy Drive Right car-buying history remains in this account.

The prior 50-row competitor file is preserved. Its reusable employment, education, unsupported-service, and wrong-asset terms are normalized into the shared list; navigation, corporate research, downloads/piracy, `resale value`, and the broad competitor-context `real estate` boundary remain campaign-specific.

## Live and repository observations

- Live UI check on 2026-07-20: `Search | Competitor | TX | EN` was Eligible (Limited); `TX | Search | Total Loss Review | Leads` was Pending; the legacy `Competitors' Campaign` was Paused.
- The live keyword report contained 54 competitor positives and 43 generic positives with zero impressions/clicks in the selected July 13–19 window.
- The repository contains the same 54 competitor keyword rows: 36 enabled Wave 1 rows and 18 paused Wave 2 rows.
- Cross-negatives are review-gated. Select Auto Appraisals and Collision Claims Advisors must not be approved while their receiving ad groups remain paused.

## Risks and warnings

- Shared-list conflict findings are syntactic `possible-scope` results until list membership is applied and verified.
- Negative matching does not generally expand to synonyms or singular/plural variants; deliberate variants are separate rows.
- `tutorial`, `download`, `junk car`, `scrap car`, and `resale value` are medium-confidence because some full queries may sit on a valuable research path.
- Search Terms reports omit some low-volume queries. A clean report does not prove complete coverage.
- Future Performance Max negatives affect Search and Shopping inventory only; they are not universal PMax placement controls.
- No term is approved for export. `reviewed-candidates.csv` is the approval surface.

## Review, implementation, and rollback

1. Review each candidate's business intent and change `approval_status` only after owner approval.
2. Resolve every literal conflict and inspect medium-confidence rows in full-query context.
3. Confirm shared-list membership and every cross-negative destination's status, funding, Texas presence setting, and landing page.
4. Export only approved rows with the bundled negative-keyword CLI.
5. Import into Google Ads Editor as pending changes and verify destination and match type row by row before any separate authorization to apply.
6. Review Search Terms daily for the first seven active days, weekly thereafter, monthly for N-gram/redundancy analysis, and quarterly for scope/conflict governance.
7. Roll back by removing the new campaign negative or detaching the shared list. Do not alter the preserved legacy list as part of rollback.

Platform mechanics were checked against first-party Google Ads documentation on 2026-07-20: [negative matching](https://support.google.com/google-ads/answer/2453972), [account-level negatives](https://support.google.com/google-ads/answer/11396330), and [Performance Max negatives](https://support.google.com/google-ads/answer/15726455).
