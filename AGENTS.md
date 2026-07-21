# Agent & Developer Guidelines: Static Site Generator (Build System)

This project uses a lightweight, zero-dependency Node.js static site generator (SSG) to manage published generated state/city pages under `states/` and the rendered-site `sitemap.xml`. Existing static routes, including the Texas root pages, remain owned by their source files and are not regenerated.

> [!IMPORTANT]
> **DO NOT manually edit or manually create HTML files inside `states/` or modify `sitemap.xml` by hand.** All state hubs, city pages, and sitemap entries are generated automatically at build time from `data/states.json`.

---

## 1. How to Add or Update a State / City

To add a new state or city, or update legal guidelines/market data for an existing location:

1. Open `data/states.json`.
2. To add/update a state:
   Add or update the state key under `"states"`:
   ```json
   "states": {
     "california": {
       "name": "California",
       "abbreviation": "CA",
       "slug": "california",
       "canonicalPath": "/states/california.html",
       "status": "published",
       "renderMode": "generated",
       "totalLossThreshold": "TLF",
       "thresholdDescription": "California uses the Total Loss Formula...",
       "appraisalClause": "Not mandated by state statute...",
       "insuranceCodeRef": "California Insurance Code §2695.8",
       "deptOfInsurance": "California Department of Insurance",
       "deadlines": "40 days after proof of claim...",
       "diminishedValue": "Available in third-party claims...",
       "aliases": [],
       "relatedGuides": [],
       "review": {"reviewedOn": "2026-07-18"},
       "sources": [{"title": "California Department of Insurance", "url": "https://www.insurance.ca.gov/"}],
       "cities": ["los-angeles", "san-diego", "san-francisco", "sacramento"]
     }
   }
   ```
3. To add/update a city:
   Add or update the city key under `"cities"` and include its key in the parent state's `"cities"` array:
   ```json
   "cities": {
     "los-angeles": {
       "name": "Los Angeles",
       "state": "california",
       "canonicalPath": "/states/california/los-angeles.html",
       "status": "published",
       "renderMode": "generated",
       "county": "Los Angeles County",
       "metroArea": "Greater Los Angeles",
       "localAngle": "The largest metro vehicle market in the US...",
       "comparisonScope": "Start with Los Angeles County listings...",
       "review": {"reviewedOn": "2026-07-18"}
     }
   }
   ```

---

## 2. Route statuses and build stages

Every state and city record has an explicit `status` and `renderMode`.
`renderMode: generated` routes render into `states/`; `none`, `draft`,
`static`, `redirect`, and `alias` routes are skipped. Draft routes may use a
null `canonicalPath`. Published generated records must provide complete
content; the generator does not invent state or city values when data is
missing. `review.reviewedOn`, `sources`, and `aliases` are part of the route
metadata used by the publication gate.

The build is a publication gate:

1. Load data, templates, and optional city data.
2. Validate all data, route paths, template tokens, dates, and sources.
3. Create a route plan from canonical paths.
4. Render generated pages and sitemap inventory into a temporary directory.
5. Verify canonicals, tokens, duplicate handling, sitemap contents, and output scope.
6. Replace generated HTML only after the complete render succeeds.

Stale generated HTML is removed only inside `states/`; root static files are
never deleted by the generator.

## 3. How to Run the Build System

After modifying `data/states.json` or templates in `templates/`:

```bash
npm run validate
npm run test:seo
npm run build
npm run audit:seo
# OR
node scripts/build.js
```

### What the build script (`scripts/build.js`) does:
- Reads `data/states.json` (and `data/cities.json` if separate).
- Populates `templates/state-hub.template.html` and outputs to `states/{state-slug}.html`.
- Populates `templates/city-page.template.html` and outputs to `states/{state-slug}/{city-slug}.html`.
- Rebuilds `sitemap.xml` from the canonical inventory of indexable rendered HTML. It emits one absolute `<loc>` per canonical and only emits `<lastmod>` when the page has an explicit significant-update/dateModified value.

---

## 4. Template Modifications

If you need to change page layouts or global structures across all state hubs or city pages:
- Modify `templates/state-hub.template.html` for state hub pages.
- Modify `templates/city-page.template.html` for city appraisal pages.
- Available template tags:
  - State templates: `{{STATE_NAME}}`, `{{STATE_ABBREVIATION}}`, `{{STATE_SLUG}}`, `{{CANONICAL_URL}}`, `{{TOTAL_LOSS_THRESHOLD}}`, `{{THRESHOLD_DESCRIPTION}}`, `{{APPRAISAL_CLAUSE}}`, `{{INSURANCE_CODE_REF}}`, `{{DEPT_OF_INSURANCE}}`, `{{DEADLINES}}`, `{{DIMINISHED_VALUE}}`, `{{CITY_LINKS_HTML}}`.
  - Shared values: `{{CANONICAL_URL}}`, `{{RELATED_GUIDES_HTML}}`, `{{SOURCE_LINKS_HTML}}`, `{{REVIEWED_AT_HTML}}`.
  - City templates: `{{CITY_NAME}}`, `{{CITY_SLUG}}`, `{{STATE_NAME}}`, `{{STATE_ABBREVIATION}}`, `{{STATE_SLUG}}`, `{{STATE_CANONICAL_URL}}`, `{{CANONICAL_URL}}`, `{{COUNTY}}`, `{{METRO_AREA}}`, `{{LOCAL_ANGLE}}`, `{{COMPARISON_SCOPE}}`.
- Always run `npm run build` after editing templates.
