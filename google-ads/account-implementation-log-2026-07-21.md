# Google Ads implementation log

Implemented: 2026-07-21  
Account: Drive Right Car Buying / Spur Auto  
Source plan: `google-ads/account-audit-2026-07-21.md`

## Live changes applied

1. Paused `TX | Search | Total Loss Review | Leads` so the July 25 campaign cannot launch in its overlapping, broad-match state.
2. Paused `Search | Competitor | TX | EN` pending measurement, legal, destination, and loss-limit approval.
3. Paused `TX | Search | Total Loss | Core` pending a verified, deduplicated lead conversion.
4. Narrowed the competitor campaign negatives `customer service`, `log in`, and `sign in` from broad match to phrase match. Each change was previewed in Google Ads before application.
5. Changed `Search | Competitor | TX | EN` location inclusion from `Presence or interest` to `Presence: People in or regularly in your included locations`, then reopened the setting and verified it persisted.

## Verified without changes

- All three campaigns target Texas, English, Google Search only.
- `TX | Search | Total Loss | Core` already uses presence-only location inclusion.
- Account-level Auto-apply is turned off.
- Auto-tagging is on.
- AI Max is off for the inspected campaigns.
- Competitor automatically created assets are off and broad-match campaign expansion is off.
- `Spur Auto – Free Review Submitted` and `Spur Auto – Stripe Purchase` remain enabled, primary, included in account-level goals, and `Awaiting conversions` with 0.00 current conversions.
- Conversion diagnostics still says no measurement features are set up.
- Final campaign status verification showed all three campaigns paused with $0.00 current campaign spend.

## Deliberately not applied

- No proposed shared-list or new core negatives were published because every row in `negative-keyword-system-2026-07-20/reviewed-candidates.csv` still has `approval_status=review`.
- No budget, CPC cap, loss limit, or launch date was changed because the audit does not provide approved values.
- No competitor ad group was enabled and no competitor trademark was added to ad copy.
- No broad-match keywords were enabled.
- No pending-review keywords were migrated into core because the measurement gate is still closed and the audit does not enumerate an approved migration set.
- No bidding change was made to core because it remains paused; Maximize Conversions must not be used for launch until the lead conversion is verified.

## Remaining gates

1. Submit and verify one deduplicated free-review conversion.
2. Verify one server-confirmed Stripe test purchase conversion.
3. Reconcile the historical 428 account conversions with current actions and removed/historical inventory.
4. Verify and, if necessary, change the pending review campaign to presence-only targeting. Its advanced settings panel did not finish loading during this session; the campaign remains paused.
5. Approve qualified-lead economics, monthly budget, CPC/loss caps, conversion lag, and legal review for the Dallas competitor pilot.
6. Approve individual negative-keyword rows before publishing any new list.
7. Define the exact unique exact/phrase keywords and message-matched ads to migrate from the pending review campaign into core.

## Controlled launch update

Applied later on 2026-07-21 after owner authorization:

- Promotion evidence showed $700.00 granted, $431.73 spent, and $268.27 remaining, with credit expiration on July 26, 2026.
- Enabled only `TX | Search | Total Loss | Core`.
- Increased its average daily budget from $30.00 to $55.00. At full delivery, five days would total up to $275.00, closely matching the remaining promotional balance; actual daily spend can vary and credit application is controlled by Google Ads billing.
- Changed core bidding from Maximize Conversions to Maximize Clicks because conversion tracking remains unverified.
- Added an $8.00 maximum CPC bid limit as the controlled traffic-learning guardrail.
- Re-verified the core campaign as Enabled, $55.00/day, Maximize Clicks, with bid-strategy learning active.
- Left `TX | Search | Total Loss Review | Leads` and `Search | Competitor | TX | EN` paused.
