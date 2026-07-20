# Validation summary

Validated 2026-07-20. No live Google Ads changes were made.

## Inventory

- 79 review candidates: 46 shared-list rows and 33 campaign rows.
- Campaign rows comprise 24 normalized competitor-only exclusions and 9 gated generic-to-competitor routing negatives.
- 64 high-confidence and 15 medium-confidence recommendations.
- All 79 rows have `approval_status=review`; zero rows are approved or exportable.
- Every literal term from the preserved 50-row competitor negative file is represented in the normalized review file.
- None of the protected research or commercial-intent terms appear as literal candidates.

## Conflict and hygiene checks

- Repository screen: 79 candidates against 54 competitor positives; zero literal conflicts.
- Live generic screen: 79 candidates against 43 enabled generic positives; zero literal conflicts.
- Hygiene: zero errors, warnings, or informational findings after narrowing `log in`, `sign in`, and `customer service` from legacy multiword broad match to phrase match.

Conflict screening is literal and syntactic. Shared-list findings can only become scope-confirmed after membership is applied, so Google Ads Editor preview and live destination verification remain required.

## Approval gates

- Human approval is required before changing any row to `approved` or generating Editor files.
- Verify that `Search | Competitor | TX | EN` is enabled, funded, Texas-presence targeted, and landing-page eligible immediately before approving routing negatives.
- Do not approve `select auto appraisals` or `collision claims advisors` while their receiving ad groups are paused.
- Inspect medium-confidence rows (`tutorial`, `tutorials`, `download`, `resale value`, `junk car`, `scrap car`, and all cross-negatives) in full-query and campaign context.
- After approval, run the documented exporter and import only as pending Google Ads Editor changes for row-by-row preview. Applying pending changes requires separate explicit authorization.
