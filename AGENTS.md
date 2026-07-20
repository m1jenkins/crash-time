# Agent & Developer Guidelines: Static Site Generator (Build System)

This project uses a lightweight, zero-dependency Node.js static site generator (SSG) to manage state hub pages (`states/{state-slug}.html`), city appraisal pages (`states/{state-slug}/{city-slug}.html`), and `sitemap.xml`.

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
       "totalLossThreshold": "TLF",
       "thresholdDescription": "California uses the Total Loss Formula...",
       "appraisalClause": "Not mandated by state statute...",
       "insuranceCodeRef": "California Insurance Code §2695.8",
       "deptOfInsurance": "California Department of Insurance",
       "deadlines": "40 days after proof of claim...",
       "diminishedValue": "Available in third-party claims...",
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
       "county": "Los Angeles County",
       "metroArea": "Greater Los Angeles",
       "localAngle": "The largest metro vehicle market in the US...",
       "comparisonScope": "Start with Los Angeles County listings..."
     }
   }
   ```

---

## 2. How to Run the Build System

After modifying `data/states.json` or templates in `templates/`:

```bash
npm run build
# OR
node scripts/build.js
```

### What the build script (`scripts/build.js`) does:
- Reads `data/states.json` (and `data/cities.json` if separate).
- Populates `templates/state-hub.template.html` and outputs to `states/{state-slug}.html`.
- Populates `templates/city-page.template.html` and outputs to `states/{state-slug}/{city-slug}.html`.
- Automatically rebuilds `sitemap.xml` with current dates and accurate priority levels for all static and generated URLs.

---

## 3. Template Modifications

If you need to change page layouts or global structures across all state hubs or city pages:
- Modify `templates/state-hub.template.html` for state hub pages.
- Modify `templates/city-page.template.html` for city appraisal pages.
- Available template tags:
  - State templates: `{{STATE_NAME}}`, `{{STATE_ABBREVIATION}}`, `{{STATE_SLUG}}`, `{{TOTAL_LOSS_THRESHOLD}}`, `{{THRESHOLD_DESCRIPTION}}`, `{{APPRAISAL_CLAUSE}}`, `{{INSURANCE_CODE_REF}}`, `{{DEPT_OF_INSURANCE}}`, `{{DEADLINES}}`, `{{DIMINISHED_VALUE}}`, `{{CITY_LINKS_HTML}}`.
  - City templates: `{{CITY_NAME}}`, `{{CITY_SLUG}}`, `{{STATE_NAME}}`, `{{STATE_ABBREVIATION}}`, `{{STATE_SLUG}}`, `{{COUNTY}}`, `{{METRO_AREA}}`, `{{LOCAL_ANGLE}}`, `{{COMPARISON_SCOPE}}`.
- Always run `npm run build` after editing templates.
