# Google Ads implementation log

Date: 2026-07-20  
Account: Drive Right Car Buying / Spur Auto  
Primary conversion: Spur Auto – Free Review Submitted

## Keyword Planner evidence

Research settings: Texas, English, Google Search, July 2025–June 2026.

- `total loss appraisal`: 40 average monthly Texas searches; low competition; $5.53–$16.33 top-of-page bid range.
- `total loss appraisal near me`: 10; high competition; $9.55–$22.76.
- `auto total loss appraisal`: 10; bid range unavailable.
- `actual cash value of my car`: 320; high competition; $1.57–$4.99.
- `acv value of car`: 70; medium competition; $1.34–$5.00.
- `totaled car value`: 20; medium competition; $1.83–$7.20.
- Selected total-loss value variants: 10 each.
- Original low-offer, settlement-dispute, and Texas-modified candidates returned no volume and were excluded.

Forecasts are directional planning inputs, not observed account performance.

## Implemented website changes

- Added appraisal, low-offer, Texas service, pricing, trust, and three-step process content below the free-review form.
- Added the Google Ads lead-submission marker to both lead forms.
- Changed the conversion event to require a preceding form submission and use a unique transaction ID.
- Prevented direct thank-you-page visits and refreshes from creating duplicate lead conversions.

## Live account checklist

- [x] Publish `TX | Search | Total Loss | Core` as paused (campaign ID `24051112751`; source draft ID `10205328021`).
- [x] Set $30/day budget and Maximize Conversions without Target CPA.
- [x] Target Texas using Presence only; Google Search only.
- [x] Disable Search Partners, Display expansion, AI Max, broad match, and text/URL expansion.
- [x] Rename the first ad group to `Total Loss Appraisal`.
- [x] Add `Total Loss Value` and complete the ten-keyword structure in `keywords.csv`.
- [x] Add one RSA per ad group using `rsa-copy.md`.
- [x] Confirm the new campaign has no attached negative keywords, so none conflict with its ten positive keywords.
- [x] Pause `Search | Competitor | TX | EN` after the replacement is complete.
- [ ] Verify conversion tracking and the deployed landing page before enabling the new campaign.

The replacement campaign is published but paused. Both ad groups are enabled beneath the paused campaign, so they cannot serve. Google Ads reports them as not eligible because the campaign is paused. The legacy competitor campaign is also paused. The older `TX | Search | Total Loss Review | Leads` campaign was left unchanged.

## Launch gates

- Conversion action reports No recent conversions or Recording after a controlled test.
- Direct thank-you visit does not send a lead conversion.
- A real form redirect sends one conversion; refresh sends no duplicate.
- All ads use `https://www.spurauto.com/free-review.html` as the actual final URL.
- All keywords are Eligible or Under Review, with no broad match.
- Existing negative lists do not block the ten positive launch keywords.
