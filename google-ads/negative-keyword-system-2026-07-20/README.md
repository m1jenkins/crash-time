# Negative-keyword review package

This folder contains review-only seed recommendations for Spur Auto's Texas total-loss Search campaigns. Nothing here has been applied to Google Ads.

## Files

- `reviewed-candidates.csv`: canonical approval surface; all rows start as `review`.
- `strategy-brief.md`: intent map, scope architecture, risks, implementation, monitoring, and rollback.
- `shared-list-membership.csv`: explicit proposed campaign membership and legacy exclusion.
- `protected-intent.csv`: valuable and ambiguous terms intentionally kept eligible.
- `live-generic-positive-keywords.csv`: normalized read-only inventory of the 43 live generic positives observed 2026-07-20.
- `conflicts-repository.csv`: literal screen against the repository's 54 competitor positives.
- `conflicts-live-generic.csv`: literal screen against the 43 live generic positives.
- `hygiene-findings.csv`: non-destructive structural findings.
- `validation-summary.md`: audit results and remaining approval gates.

The original campaign artifacts under `google-ads/competitor-pilot-2026-07-18/` are preserved unchanged.

## Re-run validation

```bash
CLI=/Users/macbookprom42025/.codex/skills/google-ads-negative-keywords/scripts/negative_keyword_cli.py
DIR=google-ads/negative-keyword-system-2026-07-20

python3 "$CLI" conflicts \
  google-ads/competitor-pilot-2026-07-18/google-ads-editor-keywords.csv \
  "$DIR/reviewed-candidates.csv" \
  --include-review \
  --output "$DIR/conflicts-repository.csv"

python3 "$CLI" conflicts \
  "$DIR/live-generic-positive-keywords.csv" \
  "$DIR/reviewed-candidates.csv" \
  --include-review \
  --output "$DIR/conflicts-live-generic.csv"

python3 "$CLI" hygiene \
  "$DIR/reviewed-candidates.csv" \
  --output "$DIR/hygiene-findings.csv"
```

## Export only after approval

After a human changes selected rows to `approval_status=approved`, run:

```bash
python3 "$CLI" export "$DIR/reviewed-candidates.csv" \
  --output-dir "$DIR/editor-export"
```

Preview the resulting files in Google Ads Editor as pending changes. Applying them to the live account requires separate explicit authorization.
