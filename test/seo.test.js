const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');

const PROJECT_ROOT = path.join(__dirname, '..');

function createFixture(t) {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'spur-seo-test-'));
  const fixtureRoot = path.join(tempRoot, 'project');
  fs.cpSync(PROJECT_ROOT, fixtureRoot, {
    recursive: true,
    filter(source) {
      const relative = path.relative(PROJECT_ROOT, source);
      const segments = relative.split(path.sep);
      return !segments.includes('.git') && !segments.includes('node_modules') && !segments.includes('google-ads');
    }
  });
  t.after(() => fs.rmSync(tempRoot, { recursive: true, force: true }));
  return fixtureRoot;
}

function runScript(rootDir, script, args = []) {
  return spawnSync(process.execPath, [script, ...args], {
    cwd: rootDir,
    encoding: 'utf8'
  });
}

function runValidate(rootDir) {
  return runScript(rootDir, 'scripts/build.js', ['--validate']);
}

function runBuild(rootDir) {
  return runScript(rootDir, 'scripts/build.js');
}

function runAudit(rootDir) {
  return runScript(rootDir, 'scripts/audit-seo.js');
}

function output(result) {
  return `${result.stdout || ''}${result.stderr || ''}`;
}

function assertFailed(result, pattern) {
  assert.notEqual(result.status, 0, `Expected command to fail, but it passed:\n${output(result)}`);
  if (pattern) assert.match(output(result), pattern);
}

function readData(rootDir) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'states.json'), 'utf8'));
}

function writeData(rootDir, data) {
  fs.writeFileSync(path.join(rootDir, 'data', 'states.json'), `${JSON.stringify(data, null, 2)}\n`);
}

function mutateData(rootDir, mutator) {
  const data = readData(rootDir);
  mutator(data);
  writeData(rootDir, data);
}

function generatedHash(rootDir) {
  const files = walkFiles(path.join(rootDir, 'states')).filter(file => file.endsWith('.html'));
  files.push(path.join(rootDir, 'sitemap.xml'));
  const hash = crypto.createHash('sha256');
  for (const file of files.sort()) {
    hash.update(path.relative(rootDir, file));
    hash.update(fs.readFileSync(file));
  }
  return hash.digest('hex');
}

function walkFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkFiles(file));
    else if (entry.isFile()) files.push(file);
  }
  return files;
}

function mutateHtml(rootDir, relativePath, mutator) {
  const file = path.join(rootDir, relativePath);
  fs.writeFileSync(file, mutator(fs.readFileSync(file, 'utf8')));
}

test('baseline build is atomic, idempotent, and produces the 40-URL canonical inventory', t => {
  const rootDir = createFixture(t);
  assert.equal(runValidate(rootDir).status, 0);
  assert.equal(runBuild(rootDir).status, 0);
  const firstHash = generatedHash(rootDir);
  assert.equal(runBuild(rootDir).status, 0);
  assert.equal(generatedHash(rootDir), firstHash);
  const audit = runAudit(rootDir);
  assert.equal(audit.status, 0, output(audit));
  assert.match(output(audit), /40 canonical URLs/);
});

test('generated location templates omit empty review modules and use the stable city hero', t => {
  const rootDir = createFixture(t);
  assert.equal(runBuild(rootDir).status, 0);

  const florida = fs.readFileSync(path.join(rootDir, 'states', 'florida.html'), 'utf8');
  assert.doesNotMatch(florida, /State sources and editorial review/i);
  assert.doesNotMatch(florida, /No jurisdiction-specific claim guides/i);
  assert.doesNotMatch(florida, /Know your claim before you negotiate it/i);
  assert.match(florida, /class="inline-references"/);
  assert.match(florida, /href="florida\/orlando\.html"/);

  const orlando = fs.readFileSync(path.join(rootDir, 'states', 'florida', 'orlando.html'), 'utf8');
  assert.doesNotMatch(orlando, /State sources and editorial review/i);
  assert.doesNotMatch(orlando, /Client-specific appraisal example/i);
  assert.match(orlando, /class="city-hero"/);
  assert.match(orlando, /class="container city-hero-grid"/);
  assert.match(orlando, /class="city-claim-card" id="claim-check"/);
  assert.equal((orlando.match(/id="city-contact-form"/g) || []).length, 1);
  assert.ok(orlando.indexOf('class="city-hero-copy"') < orlando.indexOf('class="city-claim-card"'));
});

test('invalid input fails before changing generated output', t => {
  const rootDir = createFixture(t);
  assert.equal(runBuild(rootDir).status, 0);
  const before = generatedHash(rootDir);
  mutateData(rootDir, data => delete data.cities.miami.localAngle);
  assertFailed(runBuild(rootDir), /city miami\.localAngle is required/);
  assert.equal(generatedHash(rootDir), before);
});

const validationCases = [
  {
    name: 'missing referenced city',
    pattern: /city miami referenced by state florida is missing/,
    mutate(data) { delete data.cities.miami; }
  },
  {
    name: 'duplicate canonical',
    pattern: /Duplicate canonicalPath/,
    mutate(data) { data.cities.tampa.canonicalPath = data.cities.miami.canonicalPath; }
  },
  {
    name: 'duplicate alias',
    pattern: /Duplicate alias/,
    mutate(data) { data.cities.dallas.aliases = [...data.cities.houston.aliases]; }
  },
  {
    name: 'unsafe alias',
    pattern: /must be an absolute HTML site path/,
    mutate(data) { data.cities.dallas.aliases = ['/../unsafe']; }
  },
  {
    name: 'alias colliding with canonical',
    pattern: /collides with canonical route/,
    mutate(data) { data.cities.dallas.aliases = [data.cities.houston.canonicalPath]; }
  },
  {
    name: 'missing static source',
    pattern: /static source file does not exist/,
    mutate(data) {
      Object.assign(data.cities.miami, {
        status: 'static',
        renderMode: 'static',
        canonicalPath: '/missing-static.html',
        aliases: []
      });
    }
  }
];

for (const fixture of validationCases) {
  test(`validation rejects ${fixture.name}`, t => {
    const rootDir = createFixture(t);
    mutateData(rootDir, fixture.mutate);
    assertFailed(runValidate(rootDir), fixture.pattern);
  });
}

test('validation rejects unknown template tokens', t => {
  const rootDir = createFixture(t);
  fs.appendFileSync(path.join(rootDir, 'templates', 'city-page.template.html'), '\n{{UNKNOWN_TOKEN}}\n');
  assertFailed(runValidate(rootDir), /unknown token/);
});

test('validation rejects alias redirect mismatches', t => {
  const rootDir = createFixture(t);
  const file = path.join(rootDir, 'vercel.json');
  const config = JSON.parse(fs.readFileSync(file, 'utf8'));
  config.redirects.find(redirect => redirect.source === '/states/texas.html').destination = '/total-loss-appraisal-dallas.html';
  fs.writeFileSync(file, JSON.stringify(config, null, 2));
  assertFailed(runValidate(rootDir), /must redirect directly to \/texas\.html/);
});

test('validation rejects redirect loops and chains', async t => {
  await t.test('loop', t => {
    const rootDir = createFixture(t);
    const file = path.join(rootDir, 'vercel.json');
    const config = JSON.parse(fs.readFileSync(file, 'utf8'));
    config.redirects.push({ source: '/loop.html', destination: '/loop.html', statusCode: 301 });
    fs.writeFileSync(file, JSON.stringify(config, null, 2));
    assertFailed(runValidate(rootDir), /redirects a URL to itself/);
  });
  await t.test('chain', t => {
    const rootDir = createFixture(t);
    const file = path.join(rootDir, 'vercel.json');
    const config = JSON.parse(fs.readFileSync(file, 'utf8'));
    config.redirects.push({ source: '/extra-alias.html', destination: '/states/texas.html', statusCode: 301 });
    fs.writeFileSync(file, JSON.stringify(config, null, 2));
    assertFailed(runValidate(rootDir), /Redirect chain detected/);
  });
});

const auditCases = [
  {
    name: 'duplicate titles',
    pattern: /Duplicate title/,
    mutate(rootDir) {
      const source = fs.readFileSync(path.join(rootDir, 'states', 'florida.html'), 'utf8').match(/<title>[\s\S]*?<\/title>/i)[0];
      mutateHtml(rootDir, 'states/california.html', html => html.replace(/<title>[\s\S]*?<\/title>/i, source));
    }
  },
  {
    name: 'duplicate descriptions',
    pattern: /Duplicate meta description/,
    mutate(rootDir) {
      const source = fs.readFileSync(path.join(rootDir, 'states', 'florida.html'), 'utf8').match(/<meta name="description"[^>]*>/i)[0];
      mutateHtml(rootDir, 'states/california.html', html => html.replace(/<meta name="description"[^>]*>/i, source));
    }
  },
  {
    name: 'invalid JSON-LD',
    pattern: /Invalid JSON-LD/,
    mutate(rootDir) {
      mutateHtml(rootDir, 'states/florida.html', html => html.replace('"@context": "https://schema.org"', '"@context": INVALID'));
    }
  },
  {
    name: 'misaligned Service identifiers',
    pattern: /Service @id/,
    mutate(rootDir) {
      mutateHtml(rootDir, 'states/florida.html', html => html.replace('https://www.spurauto.com/states/florida.html#service', 'https://www.spurauto.com/states/florida.html#wrong'));
    }
  },
  {
    name: 'misaligned breadcrumb destinations',
    pattern: /BreadcrumbList/,
    mutate(rootDir) {
      mutateHtml(rootDir, 'states/florida.html', html => html.replace('"item": "https://www.spurauto.com/states/florida.html"', '"item": "https://www.spurauto.com/states/california.html"'));
    }
  },
  {
    name: 'broken internal links',
    pattern: /Broken internal link/,
    mutate(rootDir) {
      mutateHtml(rootDir, 'states/florida.html', html => html.replace('</body>', '<a href="/missing-page.html">Missing</a></body>'));
    }
  },
  {
    name: 'links to redirect sources',
    pattern: /links to redirect source \/index\.html/,
    mutate(rootDir) {
      mutateHtml(rootDir, 'states/florida.html', html => html.replace('</body>', '<a href="/index.html">Home alias</a></body>'));
    }
  }
];

for (const fixture of auditCases) {
  test(`SEO audit rejects ${fixture.name}`, t => {
    const rootDir = createFixture(t);
    assert.equal(runBuild(rootDir).status, 0);
    fixture.mutate(rootDir);
    assertFailed(runAudit(rootDir), fixture.pattern);
  });
}
