# Competitor Campaign Low-Search-Volume Remediation Plan

Prepared 2026-07-20 from `Search keyword report (2).csv`, covering 2026-07-13 through 2026-07-19. This is an implementation plan, not confirmation of live account changes or legal clearance.

## Live implementation status — 2026-07-20

Implemented in Google Ads campaign `Search | Competitor | TX | EN`:

- Applied label `LSV_2026-07-20` to the 48 keywords identified as low search volume.
- Paused those 48 keywords without deleting them or their history.
- Preserved the six keywords that were not classified as low volume, including the two eligible Dallas Auto Appraisers review terms.
- Added `[dallas auto appraisers]` and `"dallas auto appraisers"` to the enabled Dallas Auto Appraisers ad group as the first controlled parent-brand test. Both were Pending / Under review immediately after saving.
- Left the $25/day campaign budget unchanged.
- Did not add broad match, increase bids, enable paused competitor ad groups, or alter visible ad copy.

Next live-account action: after Google completes review, confirm the two parent-brand keywords are eligible before adding another competitor. Review search terms daily once impressions begin.

## Executive recommendation

Keep `Search | Competitor | TX | EN` paused while measurement is validated. Do not try to repair the campaign by raising bids, increasing the budget, or rewriting ads. Google states that low-search-volume status is based on search history and is unrelated to bids, Quality Score, or creative.

Rebuild the campaign as a much smaller parent-brand phrase-match pilot:

1. Preserve the two eligible Dallas Auto Appraisers review keywords.
2. Pause the 48 low-search-volume long-tail keywords; retain them for history rather than deleting them.
3. Test only one exact and one phrase parent-brand keyword per approved competitor, after a fresh Keyword Planner forecast.
4. Keep generic total-loss demand in `TX | Search | Total Loss | Core`, where the existing plan already has measurable Texas search volume. Do not duplicate those terms in the competitor campaign.
5. Release competitor budget only after the primary qualified-lead conversion and search-term attribution pass QA.

The competitor campaign should remain a bounded, secondary acquisition test. It should not be expected to carry lead volume.

## 1. Findings from the export

| Finding | Observed result | Interpretation |
|---|---:|---|
| Actual keyword rows | 54 | Six competitor ad groups with nine terms each |
| Low-volume keywords | 48 (88.9%) | The modifier-heavy keyword design is too granular for the available demand |
| Eligible keywords | 2 (3.7%) | Both are Dallas Auto Appraisers review terms |
| Paused-only keywords | 4 (7.4%) | Status cannot be evaluated while their ad groups are paused |
| Impressions | 0 | No auction or query evidence was generated in the report window |
| Clicks / cost / conversions | 0 / $0 / 0 | Bids, CPA, and creative performance cannot be evaluated from this export |

Eligible terms observed:

- `[dallas auto appraisers reviews]`
- `"dallas auto appraisers reviews"`

The report window is short, but low-search-volume status is not caused by the seven-day date range. Google says it evaluates the keyword's search history over the preceding 12 months and periodically rechecks the status.

## 2. What will and will not fix the issue

| Action | Decision | Reason |
|---|---|---|
| Raise CPC bids | Do not use as a remedy | Bid changes do not change low-search-volume status |
| Raise daily budget | Do not use as a remedy | There is no eligible auction volume to buy for most current terms |
| Rewrite RSAs | Keep current compliant ads for the first retest | Creative affects performance after eligibility, not the low-volume status itself |
| Broaden geography | Not a status fix | Google evaluates low-volume status using worldwide search history; geo expansion only increases reachable auctions for eligible terms |
| Change every exact keyword to broad | Reject | With zero query or conversion data, this creates uncontrolled navigational and support traffic |
| Use parent-brand phrase match | Test with caps | Consolidates `reviews`, `cost`, `pricing`, `alternative`, and similar searches under a term with a better chance of eligibility |
| Add naked exact brands | Test only after forecast | Provides maximum intent control but may still remain low volume |
| Run generic comparison/appraisal terms here | Reject | They belong in the separate core campaign and would corrupt competitor-channel reporting |
| Wait for status to change | Accept only as passive monitoring | Google can reactivate terms if demand rises, but this is not a lead-volume strategy |

## 3. Proposed campaign build

### Campaign controls

| Setting | Implementation |
|---|---|
| Campaign | `Search | Competitor | TX | EN` |
| Networks | Google Search only; Search Partners and Display off |
| Geography | Texas, Presence only |
| Language | English |
| Bidding | Manual CPC during the remediation test; retain the current $2.50 keyword cap unless Keyword Planner and economics justify a lower cap |
| Budget | Maximum $25/day, but use a $350 cumulative remediation-test loss limit |
| Match types | Exact and phrase only; no broad match in this stage |
| Ad groups | One competitor per ad group; do not split low-volume intent modifiers into separate groups |
| Ads | Competitor-neutral RSAs; no competitor trademarks in visible copy, paths, or DKI |
| Landing page | Existing neutral comparison page with competitor/ad-group UTMs |
| Auto-apply | Disable keyword additions, match broadening, budget/bid changes, and automatically created assets |

### Wave 1 keyword candidates

These are candidates for Keyword Planner and policy review, not instructions to upload every row. Publish a candidate only if it returns usable forecast demand and does not conflict with negatives.

| Priority | Ad group | Exact candidate | Phrase candidate | Current long-tail treatment |
|---:|---|---|---|---|
| 1 | Dallas Auto Appraisers | `[dallas auto appraisers]` | `"dallas auto appraisers"` | Retain the two eligible `reviews` terms; pause the other seven low-volume terms |
| 2 | AutoACV | `[autoacv]` | `"autoacv"` | Pause all nine current modifier terms; avoid duplicate `auto acv` variants unless Planner shows distinct demand |
| 3 | TotalLoss.com | `[totalloss.com]` | `"totalloss.com"` | Pause all nine modifier terms; do not use the generic phrase `"total loss"` in this ad group |
| 4 | TotalLossAppraiser.net | `[totallossappraiser.net]` | `"totallossappraiser.net"` | Pause all nine modifier terms; do not route generic `total loss appraiser` searches here |

Keep Select Auto Appraisals and Collision Claims Advisors paused in Wave 1. They add more sparse inventory without evidence that the four existing Wave 1 competitors can generate qualified traffic.

### Keyword Planner gate

For Texas, English, Google Search, use the most recent 12-month view and record:

- average monthly searches;
- three-month and year-over-year change;
- competition;
- low and high top-of-page bid ranges;
- forecast impressions, clicks, and cost at the proposed bid.

Do not enable a parent term merely because it appears in Planner. Require a non-zero campaign forecast, commercial relevance to total-loss appraisal, and an acceptable CPC under the qualified-lead economics. Save the forecast date and export with the campaign record.

## 4. Implementation sequence

### Phase 0 — measurement and safety gate

Owner: Ads + analytics. Target: before any keyword is enabled.

1. Confirm `qualified_free_review` is the optimization conversion, or document why `free_review_submitted` must temporarily remain secondary/proxy measurement.
2. Submit a controlled form test and verify exactly one Google Ads conversion; verify a refresh and direct thank-you-page visit do not duplicate it.
3. Verify GCLID/GBRAID/WBRAID, campaign, ad group, keyword, match type, and search term can be joined to the CRM lead.
4. Confirm the comparison-page UTMs persist through `free-review.html` and the form submission.
5. Check account-, campaign-, and ad-group-level negatives for conflicts with every new positive keyword.
6. Confirm ads and destination are approved, billing is healthy, Texas Presence targeting is selected, and audiences are Observation-only or absent.

Exit gate: one successful test lead, clean deduplication, approved ads/destination, and no negative-keyword conflicts.

### Phase 1 — consolidate inventory

Owner: Ads. Target: day 1.

1. Label all 48 low-volume keywords `LSV_2026-07-20` and pause them; do not remove them.
2. Retain the two eligible Dallas review terms.
3. Leave Select Auto Appraisals and Collision Claims Advisors paused.
4. Add only the parent exact/phrase terms that passed the Planner gate.
5. Use the existing RSA A and neutral comparison landing page; do not change copy, bids, and keywords simultaneously.
6. Enable at most Dallas plus one additional competitor for the first 72 hours. This preserves a readable search-term sample.

### Phase 2 — controlled launch

Owner: Ads + lead operations. Target: days 1–14.

- Review policy status, spend, impressions, and search terms daily for the first seven days.
- Add negatives for login, support, employment, corporate research, unrelated appraisal, and existing-user navigation only after checking intended-query conflicts.
- Record actual search terms by competitor and classify each as evaluation, navigational, support, irrelevant, or ambiguous.
- Do not treat CTR or a form fill as success without lead qualification.
- Do not increase bids on a keyword that remains low volume. If an eligible keyword has impressions but loses auctions on rank, evaluate Ad Rank and economics separately.

### Phase 3 — scale, isolate, or stop

Owner: Ads + finance/sales. Target: day 14 or earlier if a loss limit is hit.

| Decision | Rule, after conversion lag |
|---|---|
| Scale a competitor | At least two qualified reviews, qualified CPA at or below $33, at least 70% of paid search terms classified as relevant evaluation intent, and no policy issue |
| Continue unchanged | Relevant impressions are accumulating but the sample is too small and spend remains below the competitor loss limit |
| Tighten | More than 30% of paid search terms are navigational/support/irrelevant; add negatives or move phrase to exact |
| Pause a competitor | $100 spend or 30 clicks with zero qualified reviews, whichever occurs first; or a material policy/compliance issue |
| Stop remediation test | $350 cumulative spend without a qualified review, or the campaign cannot generate at least 100 impressions in 14 days despite eligible parent terms |
| Consider broad-match experiment | Only after tracking is reliable, the negative system has been proven on real queries, qualified outcomes exist, and a separate budget/loss cap is approved |

## 5. Budget allocation

Do not divert meaningful budget from the core campaign to force a competitor test.

| Campaign | Recommended share during remediation | Rationale |
|---|---:|---|
| `TX | Search | Total Loss | Core` | 80–90% of Search test budget | Existing Planner evidence shows measurable Texas demand for appraisal and ACV terms |
| `Search | Competitor | TX | EN` | 10–20%, capped at $25/day and $350 cumulative | High-intent but sparse and higher-risk experimental traffic |

Reallocate only from observed qualified CPA and capacity, not impression volume. Keep brand-defense spend, if any, in a separate campaign.

## 6. Legal and policy boundary

As checked 2026-07-20, Google states that it does not restrict trademarks used as keywords, but it may restrict a direct competitor's use of a trademark in ad text and restrict confusing, deceptive, or misleading use. Platform permission is not legal clearance.

- Keep competitor marks out of headlines, descriptions, display paths, images, and Dynamic Keyword Insertion.
- Keep the landing page neutral unless counsel approves specific comparative uses and every claim has a dated evidence entry.
- Do not imply affiliation, endorsement, representation, guaranteed settlement improvement, or superiority.
- Have qualified counsel review the exact Texas/US use before launch; record owner, date, sources, and unresolved questions.

Current first-party references:

- Google low-search-volume definition: https://support.google.com/google-ads/answer/2616014
- Google keyword status: https://support.google.com/google-ads/answer/2453978
- Google trademark policy: https://support.google.com/adspolicy/answer/6118
- Google match types: https://support.google.com/google-ads/answer/14996023
- Google negative keywords: https://support.google.com/google-ads/answer/2453972

## 7. Launch checklist

- [ ] Current account export saved before edits.
- [ ] Conversion and CRM attribution QA passed.
- [ ] Keyword Planner forecast saved with date and settings.
- [ ] Low-volume keywords labeled and paused, not deleted.
- [ ] Only approved parent exact/phrase candidates added.
- [ ] Positive/negative conflict check passed at every scope.
- [ ] Texas Presence, English, Google Search-only settings verified.
- [ ] Search Partners, Display, AI expansion, broad match, and DKI off.
- [ ] Competitor-neutral RSA combinations reviewed.
- [ ] Comparison-page CTA, mobile layout, forms, disclosures, and UTM persistence tested.
- [ ] $25/day campaign cap, $100 competitor cap, and $350 cumulative stop point approved.
- [ ] Daily first-week search-term owner assigned.
- [ ] Counsel/policy review recorded without claiming legal clearance.

## 8. Expected outcome

The likely outcome is a smaller competitor campaign that produces occasional, controlled evaluation traffic rather than dependable scale. If parent-brand terms still have no forecast or fail the 14-day impression gate, keep the campaign paused and invest in the core total-loss/ACV campaign. That is a valid stop decision, not a bidding failure.
