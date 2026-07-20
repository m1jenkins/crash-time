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
3. Complete conversion QA. The deduplicated Google Ads `free_review_submitted` event and server-confirmed Stripe purchase event were deployed on 2026-07-20; verify each once in Google Ads diagnostics without creating duplicate production conversions.
4. A CRM field and Google Ads Data Manager enhanced-conversions-for-leads import identify `qualified_free_review` with GCLID/GBRAID/WBRAID retention and consent handling.
5. The owner approves the $750 maximum test loss and the initial $2.50 max CPC.

Measurement deployment update, 2026-07-20:

- `thank-you.html` now triggers the deduplicated Google Ads lead conversion through `js/google-ads-events.js` only after the Web3Forms success path reaches the thank-you page.
- All three active Stripe Payment Links redirect to `stripe-success.html` with `{CHECKOUT_SESSION_ID}`.
- `api/stripe-session.js` retrieves the Checkout Session from Stripe using Vercel's sensitive, production-only `STRIPE_SECRET_KEY` and returns the Checkout Session/order ID, Payment Intent ID, actual amount, currency, payment status, refunded amount, and paid/partial-refund/refund status.
- `trackStripePurchase()` is called only after the server reports a completed, paid Checkout Session. Checkout-link clicks never fire the purchase conversion.
- Production commit `43d75a5` deployed successfully. Invalid IDs are rejected, and a valid-format nonexistent ID reached Stripe, confirming production authentication without creating a charge.
- CRM qualification and enhanced-conversions-for-leads import remain separate launch gates. The CRM must retain the Stripe Checkout Session ID as the purchase/refund reconciliation key.

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
3. Import `campaign-settings.csv`, then `google-ads-editor-keywords.csv`, `google-ads-editor-rsas.csv`, and `ad-assets.csv` into Google Ads Editor. Map columns during preview because Editor labels can vary by version.
4. Attach `negative-keywords.csv` at campaign scope.
5. Review every rendered RSA combination and every final URL in Editor.
6. Keep all entities paused until the legal, measurement, destination, and budget gates are signed off.
