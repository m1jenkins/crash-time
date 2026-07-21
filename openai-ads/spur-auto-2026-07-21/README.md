# Spur Auto ChatGPT Ads pilot

Status: **draft; not approved to launch**  
Prepared: 2026-07-21  
Platform: OpenAI Ads Manager Beta / ChatGPT Ads  
User-approved budget: **$25 per day**

This package contains one tightly scoped Texas Clicks campaign for Spur Auto's free total-loss offer review. The $25 daily budget is the current OpenAI Ads minimum per campaign, so the plan keeps one campaign and two intent-led ad groups instead of fragmenting the budget.

## Files

- `campaign-package.md` — strategy, policy gate, measurement, budget logic, experiments, dashboard, and handoff
- `campaigns.csv` — campaign settings for transfer into the current Ads Manager schema
- `ad-groups.csv` — focused ad groups and JSON-formatted context hints
- `ads.csv` — four ads with checked title/copy lengths, static UTMs, and creative mapping
- `creative-prompts.md` — final built-in image-generation prompts and constraints
- `assets/` — source and 1200 x 1200 final creative files

Use only the final files named below: the offer-review `v2` image and the
value-report `v3` image. Other images are retained as rejected/working drafts
for traceability and must not be uploaded.

The current OpenAI bulk-upload workbook has fixed tabs and headers. Transfer these rows into the template downloaded from Ads Manager; do not upload these CSVs as though they were the official schema without matching its current columns.

## Proposed live creative URLs after deployment

- `https://www.spurauto.com/assets/images/openai-ads/spur-auto-offer-review-v2-2026-07-21.jpg`
- `https://www.spurauto.com/assets/images/openai-ads/spur-auto-value-report-v3-2026-07-21.jpg`

Both files are square JPGs at 1200 x 1200. They must return HTTP 200 directly from the public URLs before ads are submitted.

## Immediate owner decisions

1. Confirm Texas as the only pilot geography and approve the assumed 2026-07-27 through 2026-08-25 test window.
2. Obtain OpenAI's category determination for an independent vehicle appraiser whose site discusses insurance claim valuations and document support.
3. Set an allowable cost per confirmed and qualified review lead; no target CPA or lead value was supplied.
4. Confirm Texas licensing/service scope and resolve unsupported nationwide and outcome claims before submission.
