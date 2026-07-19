const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const DATA_FILE = path.join(ROOT_DIR, 'data', 'states.json');
const CITIES_FILE = path.join(ROOT_DIR, 'data', 'cities.json');
const STATE_TEMPLATE_PATH = path.join(ROOT_DIR, 'templates', 'state-hub.template.html');
const CITY_TEMPLATE_PATH = path.join(ROOT_DIR, 'templates', 'city-page.template.html');
const STATES_DIR = path.join(ROOT_DIR, 'states');
const SITEMAP_PATH = path.join(ROOT_DIR, 'sitemap.xml');
const BASE_URL = 'https://www.spurauto.com';

function main() {
  console.log('🚀 Starting Spur Auto SSG Build System...');

  // 1. Read Data
  if (!fs.existsSync(DATA_FILE)) {
    console.error(`❌ Data file not found: ${DATA_FILE}`);
    process.exit(1);
  }
  const rawData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  let states = rawData.states || {};
  let cities = rawData.cities || {};

  // If separate cities.json exists, merge it
  if (fs.existsSync(CITIES_FILE)) {
    const rawCities = JSON.parse(fs.readFileSync(CITIES_FILE, 'utf8'));
    cities = { ...cities, ...rawCities };
  }

  // 2. Read Templates
  const stateTemplate = fs.readFileSync(STATE_TEMPLATE_PATH, 'utf8');
  const cityTemplate = fs.readFileSync(CITY_TEMPLATE_PATH, 'utf8');

  // Ensure output directory
  if (!fs.existsSync(STATES_DIR)) {
    fs.mkdirSync(STATES_DIR, { recursive: true });
  }

  let stateCount = 0;
  let cityCount = 0;
  const generatedRoutes = [];

  // 3. Generate State Hubs and City Pages
  for (const [stateKey, stateData] of Object.entries(states)) {
    const stateSlug = stateData.slug || stateKey;
    const stateName = stateData.name;
    const stateAbbr = stateData.abbreviation;

    // Generate City Links HTML for State Hub
    const cityList = stateData.cities || [];
    const cityLinksHtml = cityList
      .map(cityKey => {
        const cityData = cities[cityKey] || { name: cityKey.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) };
        const cityName = cityData.name;
        return `<a href="${stateSlug}/${cityKey}.html">${cityName}<span>Total loss appraisal &amp; settlement disputes</span></a>`;
      })
      .join('\n        ');

    // Populate State Template
    let stateContent = stateTemplate
      .replace(/\{\{STATE_NAME\}\}/g, stateName)
      .replace(/\{\{STATE_ABBREVIATION\}\}/g, stateAbbr)
      .replace(/\{\{STATE_SLUG\}\}/g, stateSlug)
      .replace(/\{\{TOTAL_LOSS_THRESHOLD\}\}/g, stateData.totalLossThreshold || '75%')
      .replace(/\{\{THRESHOLD_DESCRIPTION\}\}/g, stateData.thresholdDescription || `In ${stateName}, total loss threshold is set to ${stateData.totalLossThreshold || '75%'}.`)
      .replace(/\{\{APPRAISAL_CLAUSE\}\}/g, stateData.appraisalClause || 'Policy language governs appraisal clause invocation.')
      .replace(/\{\{INSURANCE_CODE_REF\}\}/g, stateData.insuranceCodeRef || `${stateName} Insurance Code`)
      .replace(/\{\{DEPT_OF_INSURANCE\}\}/g, stateData.deptOfInsurance || `${stateName} Department of Insurance`)
      .replace(/\{\{DEADLINES\}\}/g, stateData.deadlines || 'Insurers must acknowledge and process claims promptly under state law.')
      .replace(/\{\{DIMINISHED_VALUE\}\}/g, stateData.diminishedValue || 'Available in third-party claims.')
      .replace(/\{\{CITY_LINKS_HTML\}\}/g, cityLinksHtml);

    const stateOutFile = path.join(STATES_DIR, `${stateSlug}.html`);
    fs.writeFileSync(stateOutFile, stateContent, 'utf8');
    stateCount++;
    generatedRoutes.push(`/states/${stateSlug}.html`);

    // Ensure State City Directory exists
    const stateCityDir = path.join(STATES_DIR, stateSlug);
    if (!fs.existsSync(stateCityDir)) {
      fs.mkdirSync(stateCityDir, { recursive: true });
    }

    // Generate City Pages for this state
    for (const cityKey of cityList) {
      const cityData = cities[cityKey] || {};
      const cityName = cityData.name || cityKey.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      const county = cityData.county || `${cityName} County`;
      const metroArea = cityData.metroArea || `${cityName} Metro Area`;
      const localAngle = cityData.localAngle || `${cityName}'s traffic density and market conditions create distinct vehicle replacement values.`;
      const comparisonScope = cityData.comparisonScope || `Start with ${county} listings, expanding into neighboring areas only when required by vehicle availability.`;

      let cityContent = cityTemplate
        .replace(/\{\{CITY_NAME\}\}/g, cityName)
        .replace(/\{\{CITY_SLUG\}\}/g, cityKey)
        .replace(/\{\{STATE_NAME\}\}/g, stateName)
        .replace(/\{\{STATE_ABBREVIATION\}\}/g, stateAbbr)
        .replace(/\{\{STATE_SLUG\}\}/g, stateSlug)
        .replace(/\{\{COUNTY\}\}/g, county)
        .replace(/\{\{METRO_AREA\}\}/g, metroArea)
        .replace(/\{\{LOCAL_ANGLE\}\}/g, localAngle)
        .replace(/\{\{COMPARISON_SCOPE\}\}/g, comparisonScope);

      const cityOutFile = path.join(stateCityDir, `${cityKey}.html`);
      fs.writeFileSync(cityOutFile, cityContent, 'utf8');
      cityCount++;
      generatedRoutes.push(`/states/${stateSlug}/${cityKey}.html`);
    }
  }

  console.log(`✅ Generated ${stateCount} State Hub pages.`);
  console.log(`✅ Generated ${cityCount} City appraisal pages.`);

  // 4. Generate Sitemap.xml
  generateSitemap(generatedRoutes);
}

function generateSitemap(generatedRoutes) {
  const currentDate = new Date().toISOString().split('T')[0];

  // Core static pages in root
  const corePages = [
    '/',
    '/index.html',
    '/how-it-works.html',
    '/pricing.html',
    '/results.html',
    '/locations.html',
    '/about.html',
    '/free-review.html',
    '/compare-total-loss-appraisal-services.html',
    '/texas.html',
    '/total-loss-appraisal-austin.html',
    '/total-loss-appraisal-corpus-christi.html',
    '/total-loss-appraisal-dallas.html',
    '/total-loss-appraisal-el-paso.html',
    '/total-loss-appraisal-fort-worth.html',
    '/total-loss-appraisal-houston.html',
    '/total-loss-appraisal-laredo.html',
    '/total-loss-appraisal-lubbock.html',
    '/total-loss-appraisal-san-antonio.html',
    '/what-to-do-car-totaled-texas.html',
    '/actual-cash-value-texas.html',
    '/dont-accept-total-loss-offer-texas.html',
    '/texas-appraisal-clause-sb458.html',
    '/totaled-car-sales-tax-texas.html',
    '/hail-totaled-car-texas.html',
    '/flooded-car-total-loss-texas.html',
    '/diminished-value-claim-texas.html',
    '/privacy.html',
    '/terms.html',
    '/disclaimer.html'
  ];

  const allUrls = new Set([...corePages, ...generatedRoutes]);

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const urlPath of allUrls) {
    const fullUrl = `${BASE_URL}${urlPath === '/' ? '' : urlPath}`;
    let priority = '0.7';
    let changefreq = 'weekly';

    if (urlPath === '/' || urlPath === '/index.html') {
      priority = '1.0';
      changefreq = 'daily';
    } else if (urlPath.startsWith('/states/')) {
      priority = urlPath.split('/').length === 3 ? '0.9' : '0.8';
    } else if (urlPath.includes('free-review') || urlPath.includes('pricing')) {
      priority = '0.9';
    }

    xml += '  <url>\n';
    xml += `    <loc>${fullUrl}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  fs.writeFileSync(SITEMAP_PATH, xml, 'utf8');
  console.log(`🗺️ Updated sitemap.xml with ${allUrls.size} URLs.`);
}

main();
