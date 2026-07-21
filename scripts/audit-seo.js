const fs = require('fs');
const path = require('path');

const {
  BASE_URL,
  collectSiteInventory,
  createRoutePlan,
  extractCanonicals,
  hasNoindex,
  loadProject,
  parseAttributes,
  validateProject,
  verifySitemap
} = require('./build');

const ROOT_DIR = path.join(__dirname, '..');

function auditSite(rootDir = ROOT_DIR) {
  const project = validateProject(loadProject(rootDir));
  const plan = createRoutePlan(project);
  const inventory = collectSiteInventory(rootDir, null, plan.aliasPaths);
  const sitemap = fs.readFileSync(path.join(rootDir, 'sitemap.xml'), 'utf8');
  verifySitemap(sitemap, inventory);

  const errors = [];
  const redirectMap = new Map(project.vercelConfig.redirects.map(redirect => [redirect.source, redirect.destination]));
  const routeKinds = collectLocationRouteKinds(project);
  const titles = new Map();
  const descriptions = new Map();

  for (const entry of inventory) {
    const file = path.join(rootDir, entry.sitePath);
    if (!fs.existsSync(file)) {
      errors.push(`Sitemap canonical has no source file: ${entry.canonicalUrl}.`);
      continue;
    }
    const content = fs.readFileSync(file, 'utf8');
    auditPage({ content, entry, redirectMap, rootDir, routeKind: routeKinds.get(entry.canonicalUrl), titles, descriptions, errors });
  }

  const unresolved = findUnresolvedTokens(rootDir);
  if (unresolved.length > 0) errors.push(`Unresolved template tokens found in ${unresolved.join(', ')}.`);
  if (errors.length > 0) throw new Error(`SEO audit failed:\n- ${Array.from(new Set(errors)).join('\n- ')}`);

  return { canonicalCount: inventory.length };
}

function auditPage({ content, entry, redirectMap, rootDir, routeKind, titles, descriptions, errors }) {
  if (hasNoindex(content)) errors.push(`Canonical page is noindex: ${entry.sitePath}.`);

  const canonicals = extractCanonicals(content);
  if (canonicals.length !== 1 || canonicals[0] !== entry.canonicalUrl) {
    errors.push(`${entry.sitePath} must contain exactly one canonical matching ${entry.canonicalUrl}.`);
  }

  const titleMatches = Array.from(content.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi));
  if (titleMatches.length !== 1 || !normalizeText(titleMatches[0][1])) {
    errors.push(`${entry.sitePath} must contain exactly one non-empty title.`);
  } else {
    registerUnique(titles, normalizeText(titleMatches[0][1]).toLowerCase(), entry.sitePath, 'title', errors);
  }

  const descriptionsOnPage = [];
  for (const tagMatch of content.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs = parseAttributes(tagMatch[0]);
    if ((attrs.name || '').toLowerCase() === 'description') descriptionsOnPage.push(normalizeText(attrs.content || ''));
  }
  if (descriptionsOnPage.length !== 1 || !descriptionsOnPage[0]) {
    errors.push(`${entry.sitePath} must contain exactly one non-empty meta description.`);
  } else {
    registerUnique(descriptions, descriptionsOnPage[0].toLowerCase(), entry.sitePath, 'meta description', errors);
  }

  const schemaNodes = parseJsonLd(content, entry.sitePath, errors);
  if (routeKind) validateLocationSchema(schemaNodes, entry, routeKind, errors);
  validateInternalLinks(content, entry, redirectMap, rootDir, errors);
}

function registerUnique(registry, value, sitePath, label, errors) {
  const previous = registry.get(value);
  if (previous) errors.push(`Duplicate ${label} appears in ${previous} and ${sitePath}.`);
  else registry.set(value, sitePath);
}

function parseJsonLd(content, sitePath, errors) {
  const nodes = [];
  for (const scriptMatch of content.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const attrs = parseAttributes(`<script ${scriptMatch[1]}>`);
    if ((attrs.type || '').toLowerCase() !== 'application/ld+json') continue;
    try {
      collectSchemaNodes(JSON.parse(scriptMatch[2]), nodes);
    } catch (error) {
      errors.push(`Invalid JSON-LD in ${sitePath}: ${error.message}.`);
    }
  }
  return nodes;
}

function collectSchemaNodes(value, nodes) {
  if (Array.isArray(value)) {
    for (const item of value) collectSchemaNodes(item, nodes);
    return;
  }
  if (!value || typeof value !== 'object') return;
  nodes.push(value);
  if (Array.isArray(value['@graph'])) collectSchemaNodes(value['@graph'], nodes);
}

function validateLocationSchema(nodes, entry, routeKind, errors) {
  const service = nodes.find(node => schemaTypeIncludes(node, 'Service'));
  if (!service) errors.push(`${entry.sitePath} is a ${routeKind} route but has no Service JSON-LD.`);
  else if (service['@id'] !== `${entry.canonicalUrl}#service`) {
    errors.push(`Service @id in ${entry.sitePath} must be ${entry.canonicalUrl}#service.`);
  }

  const breadcrumbs = nodes.find(node => schemaTypeIncludes(node, 'BreadcrumbList'));
  const items = breadcrumbs && breadcrumbs.itemListElement;
  const lastItem = Array.isArray(items) ? items[items.length - 1] : null;
  if (!breadcrumbs || !lastItem || lastItem.item !== entry.canonicalUrl) {
    errors.push(`BreadcrumbList in ${entry.sitePath} must end at ${entry.canonicalUrl}.`);
  }
}

function schemaTypeIncludes(node, type) {
  const value = node && node['@type'];
  return Array.isArray(value) ? value.includes(type) : value === type;
}

function validateInternalLinks(content, entry, redirectMap, rootDir, errors) {
  for (const match of content.matchAll(/<a\b[^>]*\bhref\s*=\s*(["'])(.*?)\1/gi)) {
    const href = match[2].trim();
    if (!href || href.startsWith('#') || /^(?:mailto:|tel:|javascript:|data:)/i.test(href)) continue;
    let url;
    try {
      url = new URL(href, entry.canonicalUrl);
    } catch {
      errors.push(`Invalid internal link in ${entry.sitePath}: ${href}.`);
      continue;
    }
    if (url.origin !== BASE_URL) continue;
    if (redirectMap.has(url.pathname)) {
      errors.push(`${entry.sitePath} links to redirect source ${url.pathname}; link to ${redirectMap.get(url.pathname)} instead.`);
      continue;
    }
    const target = sitePathToFile(rootDir, url.pathname);
    if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
      errors.push(`Broken internal link in ${entry.sitePath}: ${url.pathname}.`);
    }
  }
}

function collectLocationRouteKinds(project) {
  const routes = new Map();
  for (const state of Object.values(project.states)) {
    if (isIndexableRecord(state)) routes.set(`${BASE_URL}${state.canonicalPath}`, 'state');
  }
  for (const city of Object.values(project.cities)) {
    if (isIndexableRecord(city)) routes.set(`${BASE_URL}${city.canonicalPath}`, 'city');
  }
  return routes;
}

function isIndexableRecord(record) {
  const mode = record.renderMode || record.status;
  return (record.status === 'published' || record.status === 'static') && (mode === 'generated' || mode === 'static');
}

function sitePathToFile(rootDir, sitePath) {
  if (sitePath === '/' || sitePath === '') return path.join(rootDir, 'index.html');
  return path.join(rootDir, decodeURIComponent(sitePath).replace(/^\//, ''));
}

function findUnresolvedTokens(rootDir) {
  const files = [];
  for (const entry of fs.readdirSync(rootDir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.html')) files.push(path.join(rootDir, entry.name));
  }
  walk(path.join(rootDir, 'states'), files);
  return files
    .filter(file => /\{\{[A-Z0-9_]+\}\}/.test(fs.readFileSync(file, 'utf8')))
    .map(file => path.relative(rootDir, file).split(path.sep).join('/'));
}

function walk(directory, files) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(file, files);
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(file);
  }
}

function normalizeText(value) {
  return String(value).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function main() {
  const result = auditSite(ROOT_DIR);
  console.log(`✅ SEO audit passed: ${result.canonicalCount} canonical URLs with unique metadata, valid location schema, clean links, and aligned redirects.`);
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(`❌ ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { auditSite };
