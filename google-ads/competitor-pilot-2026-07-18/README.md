# Spur Auto Google Ads Competitor Pilot

Prepared: 2026-07-18  
Market: Texas, United States  
Language: English  
Status: **Built as a paused implementation pack; not published to Google Ads**

## Recommendation

Run a 30-day, exact-first Search pilot after the five launch gates below are complete. Keep the campaign isolated, cap average daily budget at $25, pause automatically at $750 total spend, and judge it on **qualified free-review CPA**, not clicks or raw forms.

Launch gates:

1. Counsel reviews the Texas trademark/comparative-advertising boundary and the campaign-only landing page.
2. The new landing page is deployed and its mobile form path is tested end to end.
3. Google Ads conversion measurement is completed; the repository currently loads `AW-18071301983` but does not fire a Google Ads lead conversion event.
4. A CRM field and offline import identify `qualified_free_review` with GCLID/GBRAID/WBRAID retention.
5. The owner approves the $750 maximum test loss and the initial $2.50 max CPC.

## Files

- `campaign-plan.md` — strategy, assumptions, legal/policy matrix, economics, landing-page brief, tracking, experiments, and launch checklist.
- `campaign-settings.csv` — campaign-level configuration.
- `google-ads-editor-keywords.csv` — paused keyword build for Google Ads Editor.
- `google-ads-editor-rsas.csv` — paused responsive-search-ad build.
- `negative-keywords.csv` — campaign negatives with match type, category, and rationale.
- `ad-assets.csv` — sitelinks, callouts, and structured snippets.
- `evidence-ledger.csv` — sources and qualifications for every material claim or competitor observation.

## Safety boundary

- Competitor names appear only in backend keywords, internal labels, and research records.
- Competitor names, logos, trade dress, and unverified comparative claims are excluded from visible ads and the landing page.
- Dynamic Keyword Insertion is prohibited in every competitor ad group.
- The landing page makes no promise that an insurer will raise an offer.
- The pack is paused by default and does not authorize publication, budget changes, or account edits.

## Import order

1. Deploy and QA `compare-total-loss-appraisal-services.html`.
2. Create or verify the campaign conversion actions described in `campaign-plan.md`.
3. Import `campaign-settings.csv`, then `google-ads-editor-keywords.csv`, `google-ads-editor-rsas.csv`, and `ad-assets.csv` into Google Ads Editor.
4. Attach `negative-keywords.csv` at campaign scope.
5. Review every rendered RSA combination and every final URL in Editor.
6. Keep all entities paused until the legal, measurement, destination, and budget gates are signed off.

