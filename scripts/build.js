const fs = require('fs');
const os = require('os');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const BASE_URL = 'https://www.spurauto.com';
const GENERATED_STATUS = 'published';
const ROUTE_STATUSES = new Set(['published', 'draft', 'static', 'redirect', 'alias']);
const ROUTE_MODES = new Set(['generated', 'none', 'draft', 'static', 'redirect', 'alias']);

const GUIDE_METADATA = [
  { canonicalPath: '/dispute-ccc-one-total-loss-valuation.html', title: 'Audit a CCC ONE valuation', description: 'Check the vehicle, comparables, adjustments, and settlement math' },
  { canonicalPath: '/total-loss-comparable-vehicles.html', title: 'Check comparable vehicles', description: 'Test whether each car is a sound market match' },
  { canonicalPath: '/total-loss-condition-adjustment.html', title: 'Condition adjustments', description: 'Find the baseline and document pre-loss condition' },
  { canonicalPath: '/wrong-trim-missing-options-total-loss.html', title: 'Wrong trim or missing options', description: 'Prove the vehicle configuration and request a correction' },
  { canonicalPath: '/total-loss-mileage-adjustment.html', title: 'Mileage adjustments', description: 'Verify odometers, direction, and calculation' },
  { canonicalPath: '/total-loss-counteroffer-letter.html', title: 'Counteroffer letter', description: 'Use a concise template and evidence index' },
  { canonicalPath: '/why-total-loss-offer-is-low.html', title: 'Why the offer is low', description: 'Separate valuation issues from ordinary settlement deductions' },
  { canonicalPath: '/questions-to-ask-total-loss-adjuster.html', title: 'Questions for the adjuster', description: 'Get the report, math, timing, and next steps in writing' },
  { canonicalPath: '/first-party-vs-third-party-total-loss-texas.html', title: 'Your insurer vs the other insurer', description: 'Understand how the Texas claim path changes your options' },
  { canonicalPath: '/is-total-loss-appraisal-worth-it.html', title: 'Is an appraisal worth it?', description: 'Compare the supported value gap with cost and scope' },
  { canonicalPath: '/what-to-do-car-totaled-texas.html', title: 'Totaled car: what to do', description: 'Seven steps from lowball offer to fair payout' },
  { canonicalPath: '/actual-cash-value-texas.html', title: 'Actual cash value (ACV)', description: 'ACV vs market value, and how insurers set it' },
  { canonicalPath: '/dont-accept-total-loss-offer-texas.html', title: 'Rejecting a low offer', description: 'What happens if you do not accept, and your options' },
  { canonicalPath: '/texas-appraisal-clause-sb458.html', title: 'Your right to appraisal', description: 'How the appraisal clause works' },
  { canonicalPath: '/totaled-car-sales-tax-texas.html', title: 'Sales tax on a total loss', description: 'The line item worth checking' },
  { canonicalPath: '/hail-totaled-car-texas.html', title: 'Hail total loss', description: 'What you are owed after a hailstorm' },
  { canonicalPath: '/flooded-car-total-loss-texas.html', title: 'Flooded car total loss', description: 'What you are owed after floodwater' },
  { canonicalPath: '/diminished-value-claim-texas.html', title: 'Diminished value claims', description: 'Rules, deadlines, and how to file' }
];

const STATE_REQUIRED_FIELDS = [
  'name', 'abbreviation', 'slug', 'canonicalPath', 'status', 'totalLossThreshold',
  'thresholdDescription', 'appraisalClause', 'insuranceCodeRef', 'deptOfInsurance',
  'deadlines', 'diminishedValue', 'doiUrl', 'review', 'sources', 'relatedGuides', 'cities'
];

const CITY_REQUIRED_FIELDS = [
  'name', 'state', 'canonicalPath', 'status', 'county', 'metroArea',
  'localAngle', 'comparisonScope', 'review'
];

const TEMPLATE_TOKENS = {
  state: new Set([
    'STATE_NAME', 'STATE_ABBREVIATION', 'STATE_SLUG', 'CANONICAL_URL',
    'TOTAL_LOSS_THRESHOLD', 'THRESHOLD_DESCRIPTION', 'APPRAISAL_CLAUSE',
    'INSURANCE_CODE_REF', 'DEPT_OF_INSURANCE', 'DEADLINES', 'DIMINISHED_VALUE',
    'CITY_LINKS_HTML', 'RELATED_GUIDES_SECTION_HTML', 'RELATED_GUIDES_FOOTER_HTML',
    'INLINE_REFERENCES_HTML'
  ]),
  city: new Set([
    'CITY_NAME', 'CITY_SLUG', 'STATE_NAME', 'STATE_ABBREVIATION', 'STATE_SLUG',
    'STATE_CANONICAL_URL', 'CANONICAL_URL', 'COUNTY', 'METRO_AREA', 'LOCAL_ANGLE',
    'COMPARISON_SCOPE', 'RELATED_GUIDES_HTML', 'RELATED_GUIDES_FOOTER_HTML', 'REVIEWED_AT_HTML'
  ])
};

function loadProject(rootDir = ROOT_DIR) {
  const dataFile = path.join(rootDir, 'data', 'states.json');
  const citiesFile = path.join(rootDir, 'data', 'cities.json');
  const stateTemplatePath = path.join(rootDir, 'templates', 'state-hub.template.html');
  const cityTemplatePath = path.join(rootDir, 'templates', 'city-page.template.html');
  const vercelConfigPath = path.join(rootDir, 'vercel.json');
  const rawData = readJsonFile(dataFile, 'data/states.json');

  if (!isPlainObject(rawData) || !isPlainObject(rawData.states) || !isPlainObject(rawData.cities)) {
    throw new Error('data/states.json must contain object properties named states and cities.');
  }

  let cities = rawData.cities;
  if (fs.existsSync(citiesFile)) {
    const rawCities = readJsonFile(citiesFile, 'data/cities.json');
    if (!isPlainObject(rawCities)) {
      throw new Error('data/cities.json must contain a JSON object.');
    }
    cities = { ...cities, ...rawCities };
  }

  return {
    rootDir,
    states: rawData.states,
    cities,
    vercelConfig: readJsonFile(vercelConfigPath, 'vercel.json'),
    stateTemplate: readTextFile(stateTemplatePath, 'templates/state-hub.template.html'),
    cityTemplate: readTextFile(cityTemplatePath, 'templates/city-page.template.html')
  };
}

function validateProject(project) {
  const errors = [];
  const { states, cities, stateTemplate, cityTemplate } = project;
  const routePaths = new Map();

  if (!isPlainObject(states) || Object.keys(states).length === 0) {
    errors.push('data/states.json must define at least one state.');
  }
  if (!isPlainObject(cities)) {
    errors.push('The merged city data must be an object.');
  }

  for (const [stateKey, state] of Object.entries(states || {})) {
    validateFields(state, STATE_REQUIRED_FIELDS, `state ${stateKey}`, errors);
    if (!isPlainObject(state)) continue;

    validateRouteRecord(state, `state ${stateKey}`, routePaths, errors);
    validateSlug(state.slug, `state ${stateKey}`, errors);
    validateUrl(state.doiUrl, `state ${stateKey}.doiUrl`, errors, ['http:', 'https:']);
    if (isGeneratedRoute(state)) validateReview(state, `state ${stateKey}`, errors);
    validateSources(state.sources, `state ${stateKey}.sources`, errors);
    validateRelatedGuides(state.relatedGuides, `state ${stateKey}.relatedGuides`, errors);

    if (!Array.isArray(state.cities)) continue;
    const seenCities = new Set();
    for (const cityKey of state.cities) {
      if (typeof cityKey !== 'string' || cityKey.length === 0) {
        errors.push(`state ${stateKey}.cities must contain non-empty city keys.`);
        continue;
      }
      if (seenCities.has(cityKey)) errors.push(`state ${stateKey}.cities contains duplicate city ${cityKey}.`);
      seenCities.add(cityKey);
      const city = cities && cities[cityKey];
      if (!isPlainObject(city)) {
        errors.push(`city ${cityKey} referenced by state ${stateKey} is missing from city data.`);
        continue;
      }
      validateCityRecord(cityKey, city, stateKey, routePaths, errors);
    }
  }

  for (const [cityKey, city] of Object.entries(cities || {})) {
    if (!isPlainObject(city)) {
      errors.push(`city ${cityKey} must be an object.`);
      continue;
    }
    if (typeof city.state === 'string' && states && !states[city.state]) {
      errors.push(`city ${cityKey}.state references unknown state ${city.state}.`);
    }
  }

  const aliasPaths = validateAliases(states, cities, routePaths, errors);
  validateStaticRoutes(project, states, cities, errors);
  validateRedirectConfiguration(project.vercelConfig, routePaths, aliasPaths, errors);

  validateTemplate(stateTemplate, 'state', errors);
  validateTemplate(cityTemplate, 'city', errors);

  if (errors.length > 0) {
    throw new Error(`Validation failed:\n- ${errors.join('\n- ')}`);
  }
  return project;
}

function validateCityRecord(cityKey, city, stateKey, routePaths, errors) {
  if (isGeneratedRoute(city)) validateFields(city, CITY_REQUIRED_FIELDS, `city ${cityKey}`, errors);
  else if (city.status === 'static') validateFields(city, ['name', 'state', 'canonicalPath', 'status'], `city ${cityKey}`, errors);
  else validateFields(city, ['name', 'state', 'status'], `city ${cityKey}`, errors);
  if (city.state !== stateKey) errors.push(`city ${cityKey}.state must be ${stateKey}.`);
  validateRouteRecord(city, `city ${cityKey}`, routePaths, errors);
  if (isGeneratedRoute(city)) validateReview(city, `city ${cityKey}`, errors);
}

function validateRouteRecord(record, label, routePaths, errors) {
  if (!ROUTE_STATUSES.has(record.status)) {
    errors.push(`${label}.status must be one of ${Array.from(ROUTE_STATUSES).join(', ')}.`);
  }
  if (record.renderMode !== undefined && !ROUTE_MODES.has(record.renderMode)) {
    errors.push(`${label}.renderMode must be one of ${Array.from(ROUTE_MODES).join(', ')}.`);
  }
  const mode = record.renderMode || (record.status === GENERATED_STATUS ? 'generated' : record.status);
  if ((record.canonicalPath === null || record.canonicalPath === undefined) && (mode === 'none' || mode === 'draft')) {
    return;
  }
  if (typeof record.canonicalPath !== 'string' || !isSafeCanonicalPath(record.canonicalPath)) {
    errors.push(`${label}.canonicalPath must be an absolute site path without query strings or traversal.`);
    return;
  }
  if (record.status !== 'alias' && record.status !== 'redirect') {
    const previous = routePaths.get(record.canonicalPath);
    if (previous) errors.push(`Duplicate canonicalPath ${record.canonicalPath} is used by ${previous} and ${label}.`);
    else routePaths.set(record.canonicalPath, label);
  }
  if (isGeneratedRoute(record) && !record.canonicalPath.startsWith('/states/')) {
    errors.push(`${label} is published but its canonicalPath is outside /states/.`);
  }
}

function validateAliases(states, cities, routePaths, errors) {
  const aliasPaths = new Map();
  for (const [label, record] of routeRecords(states, cities)) {
    if (record.aliases !== undefined && !Array.isArray(record.aliases)) {
      errors.push(`${label}.aliases must be an array.`);
      continue;
    }
    for (const [index, alias] of (record.aliases || []).entries()) {
      const aliasLabel = `${label}.aliases[${index}]`;
      if (!isSafeCanonicalPath(alias)) {
        errors.push(`${aliasLabel} must be an absolute HTML site path without query strings or traversal.`);
        continue;
      }
      if (alias === record.canonicalPath || routePaths.has(alias)) {
        errors.push(`${aliasLabel} collides with canonical route ${alias}.`);
        continue;
      }
      const previous = aliasPaths.get(alias);
      if (previous) errors.push(`Duplicate alias ${alias} is used by ${previous.label} and ${aliasLabel}.`);
      else aliasPaths.set(alias, { label: aliasLabel, canonicalPath: record.canonicalPath });
    }
  }
  return aliasPaths;
}

function validateStaticRoutes(project, states, cities, errors) {
  for (const [label, record] of routeRecords(states, cities)) {
    if (!isStaticRoute(record) || !isSafeCanonicalPath(record.canonicalPath)) continue;
    const file = routeFilePath(project.rootDir, record.canonicalPath);
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
      errors.push(`${label} static source file does not exist: ${record.canonicalPath}.`);
      continue;
    }
    const content = fs.readFileSync(file, 'utf8');
    const canonicals = extractCanonicals(content);
    const expected = absoluteUrl(record.canonicalPath);
    if (canonicals.length !== 1 || canonicals[0] !== expected) {
      errors.push(`${label} static source must contain exactly one self-referential canonical ${expected}.`);
    }
  }
}

function validateRedirectConfiguration(config, routePaths, aliasPaths, errors) {
  if (!isPlainObject(config) || !Array.isArray(config.redirects)) {
    errors.push('vercel.json must contain a redirects array.');
    return;
  }
  const redirects = new Map();
  for (const [index, redirect] of config.redirects.entries()) {
    const label = `vercel.json redirects[${index}]`;
    if (!isPlainObject(redirect) || !isSafeRedirectSource(redirect.source) || !isSafeRedirectDestination(redirect.destination)) {
      errors.push(`${label} must contain safe absolute source and destination paths.`);
      continue;
    }
    if (redirect.source === redirect.destination) errors.push(`${label} redirects a URL to itself.`);
    if (routePaths.has(redirect.source)) errors.push(`${label} uses canonical route ${redirect.source} as a redirect source.`);
    const previous = redirects.get(redirect.source);
    if (previous && previous !== redirect.destination) errors.push(`${label} conflicts with another redirect for ${redirect.source}.`);
    else redirects.set(redirect.source, redirect.destination);
  }
  for (const [source, destination] of redirects) {
    if (redirects.has(destination)) errors.push(`Redirect chain detected: ${source} -> ${destination} -> ${redirects.get(destination)}.`);
    if (destination !== '/' && !routePaths.has(destination)) errors.push(`Redirect destination is not a declared canonical route: ${source} -> ${destination}.`);
  }
  for (const [alias, metadata] of aliasPaths) {
    const destination = redirects.get(alias);
    if (destination !== metadata.canonicalPath) {
      errors.push(`${metadata.label} must redirect directly to ${metadata.canonicalPath} in vercel.json.`);
    }
  }
}

function routeRecords(states, cities) {
  return [
    ...Object.entries(states || {}).map(([key, record]) => [`state ${key}`, record]),
    ...Object.entries(cities || {}).map(([key, record]) => [`city ${key}`, record])
  ];
}

function isGeneratedRoute(record) {
  return record.status === GENERATED_STATUS && (record.renderMode === undefined || record.renderMode === 'generated');
}

function isStaticRoute(record) {
  const mode = record.renderMode || record.status;
  return record.status === 'static' && mode === 'static';
}

function isIndexableRoute(record) {
  const mode = record.renderMode || (record.status === GENERATED_STATUS ? 'generated' : record.status);
  return (record.status === 'published' || record.status === 'static') && (mode === 'generated' || mode === 'static');
}

function validateSources(sources, label, errors) {
  if (!Array.isArray(sources) || sources.length === 0) {
    errors.push(`${label} must contain at least one source.`);
    return;
  }
  for (const [index, source] of sources.entries()) {
    const title = source && (source.title || source.label);
    if (!isPlainObject(source) || typeof title !== 'string' || typeof source.url !== 'string') {
      errors.push(`${label}[${index}] must contain title/label and url.`);
      continue;
    }
    validateUrl(source.url, `${label}[${index}].url`, errors, ['http:', 'https:']);
  }
}

function validateRelatedGuides(guides, label, errors) {
  if (!Array.isArray(guides)) {
    errors.push(`${label} must be an array.`);
    return;
  }
  for (const [index, guide] of guides.entries()) {
    const canonicalPath = typeof guide === 'string' ? guide : guide && guide.canonicalPath;
    if (typeof canonicalPath !== 'string' || !isSafeCanonicalPath(canonicalPath)) {
      errors.push(`${label}[${index}] must contain a safe canonical path.`);
    }
  }
}

function validateReview(record, label, errors) {
  const reviewedOn = record.review && record.review.reviewedOn;
  if (typeof reviewedOn !== 'string') {
    errors.push(`${label}.review.reviewedOn is required for published routes.`);
    return;
  }
  validateIsoDate(reviewedOn, `${label}.review.reviewedOn`, errors);
}

function validateFields(value, fields, label, errors) {
  if (!isPlainObject(value)) {
    errors.push(`${label} must be an object.`);
    return;
  }
  for (const field of fields) {
    const fieldValue = value[field];
    const valid = field === 'cities' || field === 'sources' || field === 'relatedGuides'
      ? Array.isArray(fieldValue)
      : field === 'review'
        ? isPlainObject(fieldValue)
        : typeof fieldValue === 'string';
    if (!valid) errors.push(`${label}.${field} is required.`);
  }
}

function validateTemplate(template, kind, errors) {
  if (typeof template !== 'string' || template.length === 0) {
    errors.push(`${kind} template must not be empty.`);
    return;
  }
  const tokens = getTemplateTokens(template);
  for (const token of tokens) {
    if (!TEMPLATE_TOKENS[kind].has(token)) errors.push(`${kind} template contains unknown token {{${token}}}.`);
  }
  const required = kind === 'state'
    ? ['CANONICAL_URL', 'CITY_LINKS_HTML', 'RELATED_GUIDES_SECTION_HTML', 'RELATED_GUIDES_FOOTER_HTML', 'INLINE_REFERENCES_HTML']
    : ['CANONICAL_URL', 'STATE_CANONICAL_URL', 'RELATED_GUIDES_HTML', 'RELATED_GUIDES_FOOTER_HTML', 'REVIEWED_AT_HTML'];
  for (const token of required) {
    if (!tokens.has(token)) errors.push(`${kind} template must include {{${token}}}.`);
  }
}

function createRoutePlan(project) {
  const { states, cities } = project;
  const stateRoutes = new Map();
  const cityRoutes = new Map();
  const generatedRoutes = [];

  for (const [stateKey, state] of Object.entries(states)) {
    const stateRoute = makeRoute('state', stateKey, state, null);
    stateRoutes.set(stateKey, stateRoute);
    if (stateRoute.render) generatedRoutes.push(stateRoute);

    for (const cityKey of state.cities) {
      const city = cities[cityKey];
      const cityRoute = makeRoute('city', cityKey, city, stateKey);
      cityRoutes.set(`${stateKey}:${cityKey}`, cityRoute);
      if (cityRoute.render) generatedRoutes.push(cityRoute);
    }
  }
  const aliasPaths = new Set();
  for (const record of [...Object.values(states), ...Object.values(cities)]) {
    for (const alias of record.aliases || []) aliasPaths.add(alias);
  }
  return { stateRoutes, cityRoutes, generatedRoutes, aliasPaths };
}

function makeRoute(kind, key, data, stateKey) {
  const render = isGeneratedRoute(data);
  return {
    kind,
    key,
    stateKey,
    data,
    canonicalPath: data.canonicalPath,
    canonicalUrl: data.canonicalPath ? absoluteUrl(data.canonicalPath) : null,
    outputPath: render ? outputPathFor(data.canonicalPath) : null,
    render,
    status: data.status,
    mode: data.renderMode || data.status
  };
}

function renderToTemporaryDirectory(project, plan, tempDir) {
  const tempStatesDir = path.join(tempDir, 'states');
  fs.mkdirSync(tempStatesDir, { recursive: true });
  for (const route of plan.generatedRoutes) {
    const outputFile = path.join(tempDir, route.outputPath);
    const content = route.kind === 'state' ? renderState(project, plan, route) : renderCity(project, plan, route);
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, content, 'utf8');
  }
  return tempStatesDir;
}

function renderState(project, plan, route) {
  const state = route.data;
  const cityLinks = state.cities
    .map(cityKey => plan.cityRoutes.get(`${route.key}:${cityKey}`))
    .filter(cityRoute => cityRoute && isIndexableRoute(cityRoute.data) && cityRoute.canonicalPath)
    .map(cityRoute => {
      const city = cityRoute.data;
      const href = relativeHref(route.outputPath, cityRoute.canonicalPath);
      return `<a href="${escapeHtml(href)}">${escapeHtml(city.name)}<span>Total loss appraisal &amp; settlement disputes</span></a>`;
    })
    .join('\n        ');

  const values = {
    STATE_NAME: escapeHtml(state.name),
    STATE_ABBREVIATION: escapeHtml(state.abbreviation),
    STATE_SLUG: escapeHtml(state.slug),
    CANONICAL_URL: escapeHtml(route.canonicalUrl),
    TOTAL_LOSS_THRESHOLD: escapeHtml(state.totalLossThreshold),
    THRESHOLD_DESCRIPTION: escapeHtml(state.thresholdDescription),
    APPRAISAL_CLAUSE: escapeHtml(state.appraisalClause),
    INSURANCE_CODE_REF: escapeHtml(state.insuranceCodeRef),
    DEPT_OF_INSURANCE: escapeHtml(state.deptOfInsurance),
    DEADLINES: escapeHtml(state.deadlines),
    DIMINISHED_VALUE: escapeHtml(state.diminishedValue),
    CITY_LINKS_HTML: cityLinks,
    RELATED_GUIDES_SECTION_HTML: renderRelatedGuidesSection(route.outputPath, state.relatedGuides),
    RELATED_GUIDES_FOOTER_HTML: renderFooterGuides(route.outputPath, state),
    INLINE_REFERENCES_HTML: renderInlineReferences(state.sources)
  };
  return replaceTemplateTokens(project.stateTemplate, values);
}

function renderCity(project, plan, route) {
  const city = route.data;
  const stateRoute = plan.stateRoutes.get(route.stateKey);
  const state = stateRoute.data;
  const values = {
    CITY_NAME: escapeHtml(city.name),
    CITY_SLUG: escapeHtml(route.key),
    STATE_NAME: escapeHtml(state.name),
    STATE_ABBREVIATION: escapeHtml(state.abbreviation),
    STATE_SLUG: escapeHtml(state.slug),
    STATE_CANONICAL_URL: escapeHtml(stateRoute.canonicalUrl),
    CANONICAL_URL: escapeHtml(route.canonicalUrl),
    COUNTY: escapeHtml(city.county),
    METRO_AREA: escapeHtml(city.metroArea),
    LOCAL_ANGLE: escapeHtml(city.localAngle),
    COMPARISON_SCOPE: escapeHtml(city.comparisonScope),
    RELATED_GUIDES_HTML: renderCityGuides(route.outputPath, stateRoute),
    RELATED_GUIDES_FOOTER_HTML: renderFooterGuides(route.outputPath, state),
    REVIEWED_AT_HTML: renderReviewedAt(city.review.reviewedOn)
  };
  return replaceTemplateTokens(project.cityTemplate, values);
}

function renderRelatedGuidesSection(fromOutputPath, guidePaths) {
  const guides = guidePaths.map(resolveGuide).filter(Boolean);
  if (guides.length === 0) return '';
  const links = guides
    .map(guide => `<a href="${escapeHtml(relativeHref(fromOutputPath, guide.canonicalPath))}">${escapeHtml(guide.title)}<span>${escapeHtml(guide.description)}</span></a>`)
    .join('\n        ');
  return `<section class="section alt related-guides-section">
    <div class="container">
      <div class="section-head reveal-on-scroll">
        <h2>More claim guides</h2>
        <p>Use these plain-English guides to prepare for the next step in your claim.</p>
      </div>
      <div class="city-links reveal-on-scroll">
        ${links}
      </div>
    </div>
  </section>`;
}

function renderCityGuides(fromOutputPath, stateRoute) {
  const state = stateRoute.data;
  const stateHref = relativeHref(fromOutputPath, stateRoute.canonicalPath);
  const cards = [`<article class="card"><h3><a href="${escapeHtml(stateHref)}">${escapeHtml(state.name)} total loss and appraisal rights</a></h3><p>Statewide rules, appraisal clause context, and the main dispute paths.</p></article>`];
  for (const guidePath of state.relatedGuides) {
    const guide = resolveGuide(guidePath);
    if (!guide) continue;
    cards.push(`<article class="card"><h3><a href="${escapeHtml(relativeHref(fromOutputPath, guide.canonicalPath))}">${escapeHtml(guide.title)}</a></h3><p>${escapeHtml(guide.description)}.</p></article>`);
  }
  return cards.join('\n          ');
}

function renderInlineReferences(sources) {
  const links = sources
    .map(source => `<a href="${escapeHtml(source.url)}" rel="noopener noreferrer">${escapeHtml(source.title || source.label)}</a>`)
    .join('<span aria-hidden="true">·</span>');
  return `<p class="inline-references"><strong>Official references:</strong>${links}</p>`;
}

function renderFooterGuides(fromOutputPath, state) {
  const guides = state.relatedGuides.map(resolveGuide).filter(Boolean);
  if (guides.length === 0) {
    return `<h3>Guides</h3><p class="footer-guide-note">See the ${escapeHtml(state.name)} guide above for current statewide information.</p>`;
  }
  const links = guides
    .map(guide => `<li><a href="${escapeHtml(relativeHref(fromOutputPath, guide.canonicalPath))}">${escapeHtml(guide.title)}</a></li>`)
    .join('\n            ');
  return `<h3>${escapeHtml(state.name)} Guides</h3><ul>\n            ${links}\n          </ul>`;
}

function resolveGuide(guide) {
  if (typeof guide === 'object' && guide !== null) return guide;
  return GUIDE_METADATA.find(candidate => candidate.canonicalPath === guide) || null;
}

function renderReviewedAt(date) {
  return `<p class="reviewed-at">Reviewed on <time datetime="${escapeHtml(date)}">${escapeHtml(formatDate(date))}</time></p>`;
}

function verifyRenderedOutput(project, plan, tempStatesDir, sitemapXml, inventory) {
  const expectedFiles = new Set(plan.generatedRoutes.map(route => route.outputPath));
  const actualFiles = new Set(walkHtmlFiles(tempStatesDir).map(file => path.relative(path.dirname(tempStatesDir), file).split(path.sep).join('/')));
  if (expectedFiles.size !== actualFiles.size || Array.from(expectedFiles).some(file => !actualFiles.has(file))) {
    throw new Error('Rendered output does not match the route plan.');
  }
  for (const route of plan.generatedRoutes) {
    const content = fs.readFileSync(path.join(path.dirname(tempStatesDir), route.outputPath), 'utf8');
    if (/\{\{[A-Z0-9_]+\}\}/.test(content)) throw new Error(`Unresolved template token remains in ${route.outputPath}.`);
    if (extractCanonical(content) !== route.canonicalUrl) throw new Error(`Canonical mismatch in ${route.outputPath}.`);
    if (!/<html\b/i.test(content) || !/<head\b/i.test(content)) throw new Error(`Rendered output is not a complete HTML document: ${route.outputPath}.`);
  }
  verifySitemap(sitemapXml, inventory);
}

function collectSiteInventory(rootDir, renderedStatesDir = null, aliasPaths = new Set()) {
  const entries = [];
  for (const entry of fs.readdirSync(rootDir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.html')) {
      entries.push({ sitePath: entry.name, content: fs.readFileSync(path.join(rootDir, entry.name), 'utf8') });
    }
  }
  const statesSource = renderedStatesDir || path.join(rootDir, 'states');
  for (const file of walkHtmlFiles(statesSource)) {
    const sitePath = path.posix.join('states', path.relative(statesSource, file).split(path.sep).join('/'));
    entries.push({ sitePath, content: fs.readFileSync(file, 'utf8') });
  }
  return buildInventory(entries, aliasPaths);
}

function buildInventory(entries, aliasPaths = new Set()) {
  const inventory = [];
  const canonicals = new Map();
  for (const entry of entries.sort((a, b) => a.sitePath.localeCompare(b.sitePath))) {
    const sitePath = `/${entry.sitePath}`;
    if (aliasPaths.has(sitePath) || hasNoindex(entry.content) || isRedirectOrAlias(entry.content)) continue;
    const canonical = extractCanonical(entry.content);
    if (!canonical) throw new Error(`Indexable HTML file ${entry.sitePath} has no canonical link.`);
    const url = parseCanonicalUrl(canonical, entry.sitePath);
    if (isAliasPath(entry.sitePath, url.pathname)) continue;
    if (canonicals.has(url.href)) throw new Error(`Duplicate canonical ${url.href} in ${canonicals.get(url.href)} and ${entry.sitePath}.`);
    canonicals.set(url.href, entry.sitePath);
    inventory.push({ sitePath: entry.sitePath, canonicalUrl: url.href, lastmod: extractSignificantUpdateDate(entry.content) });
  }
  return inventory.sort((a, b) => a.canonicalUrl.localeCompare(b.canonicalUrl));
}

function renderSitemap(inventory) {
  const lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
  for (const entry of inventory) {
    lines.push('  <url>', `    <loc>${escapeXml(entry.canonicalUrl)}</loc>`);
    if (entry.lastmod) lines.push(`    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`);
    lines.push('  </url>');
  }
  lines.push('</urlset>', '');
  return lines.join('\n');
}

function verifySitemap(sitemapXml, inventory) {
  if (/<(?:priority|changefreq)\b/i.test(sitemapXml)) throw new Error('sitemap.xml must not contain priority or changefreq.');
  const locs = Array.from(sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)).map(match => decodeXml(match[1]));
  const expected = inventory.map(entry => entry.canonicalUrl);
  if (locs.length !== expected.length || new Set(locs).size !== locs.length || locs.some((loc, index) => loc !== expected[index])) {
    throw new Error('sitemap.xml does not match the rendered-site canonical inventory.');
  }
}

function replaceGeneratedOutput(tempStatesDir, sitemapXml, rootDir = ROOT_DIR) {
  const statesDir = path.join(rootDir, 'states');
  const statesRoot = path.resolve(statesDir);
  fs.mkdirSync(statesDir, { recursive: true });
  for (const file of walkHtmlFiles(statesDir)) {
    const resolved = path.resolve(file);
    if (resolved.startsWith(`${statesRoot}${path.sep}`) && resolved.endsWith('.html')) fs.rmSync(resolved);
  }
  for (const source of walkHtmlFiles(tempStatesDir)) {
    const relative = path.relative(tempStatesDir, source);
    const destination = path.resolve(statesDir, relative);
    if (!destination.startsWith(`${statesRoot}${path.sep}`) || !destination.endsWith('.html')) {
      throw new Error(`Refusing to replace output outside states/: ${destination}`);
    }
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(source, destination);
  }
  fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), sitemapXml, 'utf8');
}

function main({ validateOnly = false, rootDir = ROOT_DIR } = {}) {
  console.log(validateOnly ? '🔎 Validating Spur Auto SSG inputs...' : '🚀 Starting Spur Auto SSG build...');
  const project = validateProject(loadProject(rootDir));
  if (validateOnly) {
    console.log('✅ Data and templates are valid.');
    return;
  }
  const plan = createRoutePlan(project);
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'spur-auto-ssg-'));
  try {
    const tempStatesDir = renderToTemporaryDirectory(project, plan, tempDir);
    const inventory = collectSiteInventory(rootDir, tempStatesDir, plan.aliasPaths);
    const sitemapXml = renderSitemap(inventory);
    verifyRenderedOutput(project, plan, tempStatesDir, sitemapXml, inventory);
    replaceGeneratedOutput(tempStatesDir, sitemapXml, rootDir);
    console.log(`✅ Rendered ${plan.generatedRoutes.length} routes.`);
    console.log(`🗺️ Updated sitemap.xml with ${inventory.length} canonical URLs.`);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

function readJsonFile(file, label) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    throw new Error(`Could not read ${label}: ${error.message}`);
  }
}

function readTextFile(file, label) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch (error) {
    throw new Error(`Could not read ${label}: ${error.message}`);
  }
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function validateSlug(value, label, errors) {
  if (typeof value !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) errors.push(`${label}.slug must be lowercase kebab-case.`);
}

function isSafeCanonicalPath(value) {
  return typeof value === 'string' && value.startsWith('/') && !value.includes('?') && !value.includes('#') && !value.split('/').includes('..') && /^\/[a-z0-9][a-z0-9/_-]*\.html$/.test(value);
}

function isSafeRedirectSource(value) {
  return isSafeCanonicalPath(value);
}

function isSafeRedirectDestination(value) {
  return value === '/' || isSafeCanonicalPath(value);
}

function routeFilePath(rootDir, routePath) {
  return path.join(rootDir, routePath.replace(/^\//, ''));
}

function validateIsoDate(value, label, errors) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(`${value}T00:00:00Z`))) errors.push(`${label} must be an ISO date in YYYY-MM-DD format.`);
}

function validateUrl(value, label, errors, protocols) {
  try {
    const url = new URL(value);
    if (!protocols.includes(url.protocol)) errors.push(`${label} must use ${protocols.join(' or ')}.`);
  } catch {
    errors.push(`${label} must be an absolute URL.`);
  }
}

function getTemplateTokens(template) {
  return new Set(Array.from(template.matchAll(/\{\{([A-Z0-9_]+)\}\}/g), match => match[1]));
}

function replaceTemplateTokens(template, values) {
  let output = template;
  for (const [token, value] of Object.entries(values)) output = output.replace(new RegExp(`\\{\\{${token}\\}\\}`, 'g'), value);
  if (/\{\{[A-Z0-9_]+\}\}/.test(output)) throw new Error('Template rendering left an unresolved token.');
  return output.replace(/^[ \t]+$/gm, '');
}

function outputPathFor(canonicalPath) {
  const outputPath = canonicalPath.replace(/^\//, '');
  if (!outputPath.startsWith('states/') || outputPath.includes('..')) throw new Error(`Generated route must render inside states/: ${canonicalPath}`);
  return outputPath;
}

function absoluteUrl(canonicalPath) {
  return `${BASE_URL}${canonicalPath}`;
}

function relativeHref(fromOutputPath, canonicalPath) {
  const fromDir = path.posix.dirname(fromOutputPath);
  const target = canonicalPath.replace(/^\//, '');
  const relative = path.posix.relative(fromDir, target);
  return relative || path.posix.basename(target);
}

function walkHtmlFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkHtmlFiles(file));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(file);
  }
  return files.sort();
}

function extractCanonical(content) {
  return extractCanonicals(content)[0] || '';
}

function extractCanonicals(content) {
  const canonicals = [];
  for (const tagMatch of content.matchAll(/<link\b[^>]*>/gi)) {
    const attrs = parseAttributes(tagMatch[0]);
    if ((attrs.rel || '').toLowerCase().split(/\s+/).includes('canonical')) canonicals.push(attrs.href || '');
  }
  return canonicals;
}

function parseCanonicalUrl(canonical, sitePath) {
  let url;
  try { url = new URL(canonical); } catch { throw new Error(`Canonical in ${sitePath} must be an absolute URL.`); }
  if (url.origin !== BASE_URL) throw new Error(`Canonical in ${sitePath} must use ${BASE_URL}.`);
  if (url.search || url.hash) throw new Error(`Canonical in ${sitePath} must not contain a query or fragment.`);
  return url;
}

function parseAttributes(tag) {
  const attrs = {};
  for (const match of tag.matchAll(/([:\w-]+)\s*=\s*(["'])(.*?)\2/gs)) attrs[match[1].toLowerCase()] = match[3];
  return attrs;
}

function hasNoindex(content) {
  for (const tagMatch of content.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs = parseAttributes(tagMatch[0]);
    if ((attrs.name || '').toLowerCase() === 'robots' && /\bnoindex\b/i.test(attrs.content || '')) return true;
  }
  return false;
}

function isRedirectOrAlias(content) {
  if (/<meta\b[^>]*http-equiv\s*=\s*["']refresh["']/i.test(content)) return true;
  return /data-route-(?:status|type)\s*=\s*["'](?:redirect|alias)["']/i.test(content);
}

function isAliasPath(sitePath, canonicalPath) {
  const expectedPath = sitePath === 'index.html' ? '/' : `/${sitePath}`;
  return canonicalPath !== expectedPath;
}

function extractSignificantUpdateDate(content) {
  const dateModified = content.match(/"dateModified"\s*:\s*"(\d{4}-\d{2}-\d{2})"/i);
  return dateModified ? dateModified[1] : '';
}

function formatDate(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(year, month - 1, day)));
}

function escapeHtml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

function escapeXml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
}

function decodeXml(value) {
  return value.replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&quot;', '"').replaceAll('&apos;', "'").replaceAll('&amp;', '&');
}

if (require.main === module) {
  try {
    main({ validateOnly: process.argv.includes('--validate') });
  } catch (error) {
    console.error(`❌ ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = {
  BASE_URL,
  buildInventory,
  collectSiteInventory,
  createRoutePlan,
  extractCanonical,
  extractCanonicals,
  hasNoindex,
  loadProject,
  main,
  parseAttributes,
  renderSitemap,
  validateProject,
  verifySitemap,
  walkHtmlFiles
};
