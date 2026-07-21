const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const { spawnSync } = require('node:child_process');
const test = require('node:test');

const controllerApi = require('../js/lead-form.js');
const PROJECT_ROOT = path.join(__dirname, '..');

class FakeEvent {
  constructor(type, options = {}) {
    this.type = type;
    this.bubbles = Boolean(options.bubbles);
    this.detail = options.detail;
    this.defaultPrevented = false;
    this.target = options.target || null;
  }

  preventDefault() {
    this.defaultPrevented = true;
  }
}

class FakeEventTarget {
  constructor() {
    this.listeners = new Map();
    this.parentNode = null;
  }

  addEventListener(type, listener) {
    if (!this.listeners.has(type)) this.listeners.set(type, []);
    this.listeners.get(type).push(listener);
  }

  dispatchEvent(event) {
    if (!event.target) event.target = this;
    for (const listener of this.listeners.get(event.type) || []) listener.call(this, event);
    if (event.bubbles && this.parentNode && typeof this.parentNode.dispatchEvent === 'function') {
      this.parentNode.dispatchEvent(event);
    }
    return !event.defaultPrevented;
  }

  emit(type, options = {}) {
    const event = new FakeEvent(type, options);
    this.dispatchEvent(event);
    return event;
  }
}

class FakeElement extends FakeEventTarget {
  constructor(tagName, document) {
    super();
    this.tagName = String(tagName || '').toUpperCase();
    this.ownerDocument = document;
    this.attributes = new Map();
    this.children = [];
    this.dataset = {};
    this.hidden = false;
    this.disabled = false;
    this.type = '';
    this.name = '';
    this.value = '';
    this.files = [];
    this.labels = [];
    this.className = '';
    this._id = '';
    this._textContent = '';
    this.innerHTML = '';
    this._customValidity = '';
    this.validationMessage = '';
    this.validity = { valid: true };
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = String(value || '');
    if (this.ownerDocument && this._id) this.ownerDocument.ids.set(this._id, this);
  }

  get textContent() {
    return this._textContent;
  }

  set textContent(value) {
    this._textContent = String(value || '');
    if (value === '') this.children = [];
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  getAttribute(name) {
    return this.attributes.has(name) ? this.attributes.get(name) : null;
  }

  removeAttribute(name) {
    this.attributes.delete(name);
  }

  hasAttribute(name) {
    return this.attributes.has(name);
  }

  appendChild(child) {
    child.parentNode = this;
    this.children.push(child);
    if (child.id && child.ownerDocument) child.ownerDocument.ids.set(child.id, child);
    return child;
  }

  insertAdjacentElement(_position, element) {
    if (!this.parentNode || !this.parentNode.children) return null;
    const siblings = this.parentNode.children;
    const index = siblings.indexOf(this);
    element.parentNode = this.parentNode;
    siblings.splice(index + 1, 0, element);
    if (element.id && element.ownerDocument) element.ownerDocument.ids.set(element.id, element);
    return element;
  }

  remove() {
    if (this.ownerDocument && this.id) this.ownerDocument.ids.delete(this.id);
    if (!this.parentNode || !this.parentNode.children) return;
    const index = this.parentNode.children.indexOf(this);
    if (index !== -1) this.parentNode.children.splice(index, 1);
    this.parentNode = null;
  }

  focus() {
    if (this.ownerDocument) this.ownerDocument.activeElement = this;
  }

  click() {
    this.emit('click');
  }

  setCustomValidity(message) {
    this._customValidity = String(message || '');
    this.validationMessage = this._customValidity;
    this.validity.valid = !this._customValidity;
  }
}

class FakeForm extends FakeElement {
  constructor(document) {
    super('form', document);
    this.id = 'test-lead-form';
    this.action = 'https://api.web3forms.com/submit';
    this.fields = [];
    this.submitButton = null;
    this.redirectInput = null;
  }

  addField(field) {
    this.fields.push(field);
    this.appendChild(field);
    return field;
  }

  querySelector(selector) {
    if (selector === 'button[type="submit"], input[type="submit"]') return this.submitButton;
    if (selector === 'input[name="redirect"]') return this.redirectInput;
    return null;
  }

  querySelectorAll(selector) {
    if (selector === 'input, select, textarea') return this.fields.slice();
    return [];
  }

  checkValidity() {
    let valid = true;
    for (const field of this.fields) {
      if (field.type !== 'hidden' && !field.validity.valid) {
        valid = false;
        this.emit('invalid', { target: field });
      }
    }
    return valid;
  }

  reportValidity() {
    return this.fields.every(field => field.type === 'hidden' || field.validity.valid);
  }

  requestSubmit() {
    if (!this.checkValidity()) return;
    this.emit('submit');
  }
}

class FakeDocument extends FakeEventTarget {
  constructor() {
    super();
    this.ids = new Map();
    this.activeElement = null;
    this.forms = [];
    this.readyState = 'complete';
    this.body = new FakeElement('body', this);
    this.body.parentNode = this;
  }

  createElement(tagName) {
    return new FakeElement(tagName, this);
  }

  getElementById(id) {
    return this.ids.get(id) || null;
  }

  querySelectorAll(selector) {
    if (selector === 'form[data-lead-form]') return this.forms;
    return [];
  }
}

class FakeFormData {
  constructor(form) {
    this.values = new Map();
    for (const field of form.fields) {
      if (field.name) this.values.set(field.name, field.type === 'file' ? field.files[0] : field.value);
    }
  }

  append(name, value) {
    this.values.set(name, value);
  }

  delete(name) {
    this.values.delete(name);
  }

  get(name) {
    return this.values.get(name);
  }

  has(name) {
    return this.values.has(name);
  }

  set(name, value) {
    this.values.set(name, value);
  }
}

class MemoryStorage {
  constructor(initial = {}) {
    this.values = new Map(Object.entries(initial));
  }

  getItem(key) {
    return this.values.has(key) ? this.values.get(key) : null;
  }

  removeItem(key) {
    this.values.delete(key);
  }

  setItem(key, value) {
    this.values.set(key, String(value));
  }
}

function createField(document, options = {}) {
  const field = new FakeElement(options.tagName || 'input', document);
  field.id = options.id || '';
  field.name = options.name || '';
  field.type = options.type || 'text';
  field.value = options.value || '';
  field.files = options.files || [];
  field.labels = [{ textContent: options.label || options.name || 'Field' }];
  field.validity.valid = options.valid !== false;
  field.validationMessage = options.validationMessage || (field.validity.valid ? '' : 'Complete this field.');
  if (options.describedBy) field.setAttribute('aria-describedby', options.describedBy);
  return field;
}

function createHarness(options = {}) {
  const document = new FakeDocument();
  const form = new FakeForm(document);
  form.dataset.leadForm = '';
  form.parentNode = document;
  document.forms.push(form);

  const email = form.addField(createField(document, {
    id: 'email', name: 'email', type: 'email', value: 'driver@example.com', label: 'Email'
  }));
  const vehicle = form.addField(createField(document, {
    id: 'vehicle', name: 'vehicle', value: '2021 Toyota RAV4 XLE', label: 'Vehicle'
  }));
  const attachment = form.addField(createField(document, {
    id: 'attachment', name: 'attachment', type: 'file', files: [], label: 'Valuation report', describedBy: 'attachment-help'
  }));
  const redirect = form.addField(createField(document, {
    id: 'redirect', name: 'redirect', type: 'hidden', value: 'https://www.spurauto.com/thank-you.html'
  }));
  form.redirectInput = redirect;

  const button = new FakeElement('button', document);
  button.type = 'submit';
  button.innerHTML = 'Check my offer <span aria-hidden="true">→</span>';
  button.textContent = 'Check my offer →';
  form.submitButton = button;
  form.appendChild(button);

  const redirects = [];
  let idSequence = 0;
  const window = {
    AbortController,
    CustomEvent: FakeEvent,
    FormData: FakeFormData,
    crypto: { randomUUID: () => `submission-${++idSequence}` },
    document,
    fetch: options.fetch || (() => Promise.resolve(response(200, { success: true }))),
    location: { assign: url => redirects.push(url) },
    navigator: { onLine: options.onLine !== false },
    setTimeout,
    clearTimeout
  };

  const formData = [];
  const controller = controllerApi.enhanceForm(form, {
    window,
    document,
    fetch: window.fetch,
    timeoutMs: options.timeoutMs || 100,
    redirectDelayMs: options.redirectDelayMs === undefined ? 0 : options.redirectDelayMs,
    createFormData: currentForm => {
      const data = new FakeFormData(currentForm);
      formData.push(data);
      return data;
    }
  });

  return { attachment, button, controller, document, email, form, formData, redirects, vehicle, window };
}

function response(status, payload, options = {}) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json() {
      if (options.malformed) return Promise.reject(new SyntaxError('Invalid JSON'));
      return Promise.resolve(payload);
    }
  };
}

async function settle(delay = 5) {
  await new Promise(resolve => setTimeout(resolve, delay));
}

test('attachment validation accepts documented types and rejects bad type or size', () => {
  const document = new FakeDocument();
  const file = createField(document, { id: 'file', name: 'attachment', type: 'file' });

  file.files = [{ name: 'valuation.pdf', type: 'application/pdf', size: 1024 }];
  assert.equal(controllerApi.validateAttachment(file), '');
  assert.equal(file.validity.valid, true);

  file.files = [{ name: 'valuation.exe', type: 'application/octet-stream', size: 1024 }];
  assert.match(controllerApi.validateAttachment(file), /PDF, JPG, or PNG/);
  assert.equal(file.validity.valid, false);

  file.files = [{ name: 'valuation.png', type: 'image/png', size: controllerApi.MAX_FILE_BYTES + 1 }];
  assert.match(controllerApi.validateAttachment(file), /5 MB or smaller/);
  assert.equal(file.validity.valid, false);
});

test('confirmed success omits redirect from AJAX, publishes one non-PII event, and redirects once', async () => {
  let requestOptions;
  let requestCount = 0;
  const harness = createHarness({
    fetch: (_url, options) => {
      requestCount += 1;
      requestOptions = options;
      return Promise.resolve(response(200, { success: true }));
    }
  });
  let confirmation;
  harness.form.addEventListener('spurauto:lead-confirmed', event => { confirmation = event.detail; });

  harness.form.requestSubmit();
  harness.form.requestSubmit();
  await settle();

  assert.equal(requestCount, 1);
  assert.equal(requestOptions.headers.Accept, 'application/json');
  assert.equal(Object.hasOwn(requestOptions.headers, 'Content-Type'), false);
  assert.equal(harness.formData[0].has('redirect'), false);
  assert.equal(harness.form.redirectInput.value, 'https://www.spurauto.com/thank-you.html');
  assert.equal(harness.formData[0].get('submission_id'), harness.controller.submissionId);
  assert.deepEqual(confirmation, {
    submissionId: harness.controller.submissionId,
    formId: 'test-lead-form',
    provider: 'web3forms'
  });
  assert.equal(Object.hasOwn(confirmation, 'email'), false);
  assert.equal(harness.form.dataset.submitState, 'success');
  assert.deepEqual(harness.redirects, ['https://www.spurauto.com/thank-you.html']);
});

test('failed request preserves values, exposes retry, reuses submission ID, and succeeds with fresh FormData', async () => {
  let requestCount = 0;
  const harness = createHarness({
    fetch: () => {
      requestCount += 1;
      return Promise.resolve(requestCount === 1
        ? response(500, { success: false })
        : response(200, { success: true }));
    }
  });

  harness.form.requestSubmit();
  await settle();
  assert.equal(harness.form.dataset.submitState, 'server-error');
  assert.equal(harness.controller.ui.retry.hidden, false);
  assert.equal(harness.email.value, 'driver@example.com');
  assert.equal(harness.vehicle.value, '2021 Toyota RAV4 XLE');

  harness.controller.retry();
  await settle();
  assert.equal(requestCount, 2);
  assert.equal(harness.formData.length, 2);
  assert.notEqual(harness.formData[0], harness.formData[1]);
  assert.equal(harness.formData[0].get('submission_id'), harness.formData[1].get('submission_id'));
  assert.equal(harness.form.dataset.submitState, 'success');
  assert.equal(harness.redirects.length, 1);
});

test('HTTP and provider failures map to recoverable form states', async t => {
  const cases = [
    ['client-error', () => Promise.resolve(response(400, { success: false }))],
    ['rate-limited', () => Promise.resolve(response(429, { success: false }))],
    ['server-error', () => Promise.resolve(response(503, { success: false }))],
    ['server-error', () => Promise.resolve(response(200, { success: false }))],
    ['server-error', () => Promise.resolve(response(200, null, { malformed: true }))],
    ['server-error', () => Promise.reject(new TypeError('Network failed'))]
  ];

  for (const [expected, fetch] of cases) {
    await t.test(expected, async () => {
      const harness = createHarness({ fetch });
      harness.form.requestSubmit();
      await settle();
      assert.equal(harness.form.dataset.submitState, expected);
      assert.equal(harness.email.value, 'driver@example.com');
      assert.equal(harness.controller.ui.retry.hidden, false);
      assert.equal(harness.redirects.length, 0);
    });
  }
});

test('offline and timeout failures remain recoverable', async t => {
  await t.test('offline', async () => {
    const harness = createHarness({
      onLine: false,
      fetch: () => Promise.reject(new TypeError('Offline'))
    });
    harness.form.requestSubmit();
    await settle();
    assert.equal(harness.form.dataset.submitState, 'offline');
  });

  await t.test('timeout', async () => {
    const harness = createHarness({
      timeoutMs: 5,
      fetch: (_url, options) => new Promise((resolve, reject) => {
        options.signal.addEventListener('abort', () => reject(new Error('Aborted')));
      })
    });
    harness.form.requestSubmit();
    await settle(15);
    assert.equal(harness.form.dataset.submitState, 'timeout');
    assert.equal(harness.controller.ui.retry.hidden, false);
  });
});

test('invalid fields block fetch, receive linked errors, and focus the summary', async () => {
  let requestCount = 0;
  const harness = createHarness({ fetch: () => { requestCount += 1; } });
  harness.email.validity.valid = false;
  harness.email.validationMessage = 'Enter a valid email address.';

  harness.form.requestSubmit();
  await settle();

  assert.equal(requestCount, 0);
  assert.equal(harness.form.dataset.submitState, 'invalid');
  assert.equal(harness.email.getAttribute('aria-invalid'), 'true');
  assert.match(harness.email.getAttribute('aria-describedby'), /email-error/);
  assert.equal(harness.controller.ui.summary.hidden, false);
  assert.equal(harness.controller.ui.summaryList.children.length, 1);
  assert.equal(harness.document.activeElement, harness.controller.ui.summary);
});

test('missing browser capabilities leave the native form unenhanced', () => {
  const document = new FakeDocument();
  const form = new FakeForm(document);
  const window = { document, fetch: undefined, FormData: FakeFormData, AbortController, CustomEvent: FakeEvent };
  assert.equal(controllerApi.enhanceForm(form, { window, document }), null);
  assert.equal(form.dataset.leadEnhanced, undefined);
});

function runTrackingScript(relativePath, { document, sessionStorage, oaiq, gtag }) {
  const source = fs.readFileSync(path.join(PROJECT_ROOT, relativePath), 'utf8');
  const window = {
    crypto: { randomUUID: () => 'native-fallback-id' },
    document,
    gtag,
    oaiq,
    sessionStorage
  };
  vm.runInNewContext(source, { document, window }, { filename: relativePath });
}

test('tracking creates pending state only after enhanced confirmation and measures once on thank-you', () => {
  const storage = new MemoryStorage();
  const sourceDocument = new FakeDocument();
  const form = new FakeForm(sourceDocument);
  form.dataset.leadForm = '';
  form.dataset.leadEnhanced = 'true';
  sourceDocument.forms = [form];
  const pixelCalls = [];
  const googleCalls = [];

  runTrackingScript('js/ads-conversions.js', {
    document: sourceDocument,
    sessionStorage: storage,
    oaiq: (...args) => pixelCalls.push(args),
    gtag: (...args) => googleCalls.push(args)
  });
  runTrackingScript('js/google-ads-events.js', {
    document: sourceDocument,
    sessionStorage: storage,
    oaiq: (...args) => pixelCalls.push(args),
    gtag: (...args) => googleCalls.push(args)
  });

  form.emit('submit');
  assert.equal(storage.getItem('spur_auto_lead_conversion_id'), null);
  assert.equal(storage.getItem('spur_auto_google_ads_free_review_pending'), null);

  sourceDocument.emit('spurauto:lead-confirmed', {
    detail: { submissionId: 'confirmed-id', formId: 'test-lead-form', provider: 'web3forms' }
  });
  assert.equal(storage.getItem('spur_auto_lead_conversion_id'), 'confirmed-id');
  assert.equal(storage.getItem('spur_auto_google_ads_free_review_pending'), 'confirmed-id');
  assert.equal(pixelCalls.filter(call => call[0] === 'measure').length, 0);
  assert.equal(googleCalls.length, 0);

  const successDocument = new FakeDocument();
  successDocument.body.setAttribute('data-lead-success', '');
  runTrackingScript('js/ads-conversions.js', {
    document: successDocument,
    sessionStorage: storage,
    oaiq: (...args) => pixelCalls.push(args),
    gtag: (...args) => googleCalls.push(args)
  });
  runTrackingScript('js/google-ads-events.js', {
    document: successDocument,
    sessionStorage: storage,
    oaiq: (...args) => pixelCalls.push(args),
    gtag: (...args) => googleCalls.push(args)
  });

  const leadMeasures = pixelCalls.filter(call => call[0] === 'measure' && call[1] === 'lead_created');
  assert.equal(leadMeasures.length, 1);
  assert.equal(leadMeasures[0][2].type, 'customer_action');
  assert.equal(leadMeasures[0][3].event_id, 'confirmed-id');
  assert.equal(googleCalls.length, 1);
  assert.equal(googleCalls[0][2].transaction_id, 'confirmed-id');

  runTrackingScript('js/ads-conversions.js', {
    document: successDocument,
    sessionStorage: storage,
    oaiq: (...args) => pixelCalls.push(args),
    gtag: (...args) => googleCalls.push(args)
  });
  runTrackingScript('js/google-ads-events.js', {
    document: successDocument,
    sessionStorage: storage,
    oaiq: (...args) => pixelCalls.push(args),
    gtag: (...args) => googleCalls.push(args)
  });
  assert.equal(pixelCalls.filter(call => call[0] === 'measure' && call[1] === 'lead_created').length, 1);
  assert.equal(googleCalls.length, 1);
});

test('native fallback still prepares pending conversion state on submit', () => {
  const storage = new MemoryStorage();
  const document = new FakeDocument();
  const form = new FakeForm(document);
  form.dataset.leadForm = '';
  document.forms = [form];

  runTrackingScript('js/ads-conversions.js', {
    document,
    sessionStorage: storage,
    oaiq: () => {},
    gtag: () => {}
  });
  runTrackingScript('js/google-ads-events.js', {
    document,
    sessionStorage: storage,
    oaiq: () => {},
    gtag: () => {}
  });
  form.emit('submit');

  assert.equal(storage.getItem('spur_auto_lead_conversion_id'), 'native-fallback-id');
  assert.equal(storage.getItem('spur_auto_google_ads_free_review_pending'), 'native-fallback-id');
});

test('all editable lead-form sources carry the resilient form and tracking contract', () => {
  const sources = [
    'index.html',
    'free-review.html',
    'templates/city-page.template.html',
    'total-loss-appraisal-austin.html',
    'total-loss-appraisal-corpus-christi.html',
    'total-loss-appraisal-dallas.html',
    'total-loss-appraisal-el-paso.html',
    'total-loss-appraisal-fort-worth.html',
    'total-loss-appraisal-houston.html',
    'total-loss-appraisal-laredo.html',
    'total-loss-appraisal-lubbock.html',
    'total-loss-appraisal-san-antonio.html'
  ];

  for (const source of sources) {
    const html = fs.readFileSync(path.join(PROJECT_ROOT, source), 'utf8');
    assert.match(html, /<form[^>]+data-lead-form/);
    assert.match(html, /name="redirect" value="https:\/\/www\.spurauto\.com\/thank-you\.html"/);
    assert.match(html, /lead-form\.js\?v=20260721f02/);
    assert.match(html, /google-ads-events\.js\?v=20260721f02/);
    assert.match(html, /ads-conversions\.js\?v=20260721f02/);
  }
});

test('the build gives every published generated city the shared form contract', t => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'spur-lead-form-test-'));
  const fixtureRoot = path.join(tempRoot, 'project');
  fs.cpSync(PROJECT_ROOT, fixtureRoot, {
    recursive: true,
    filter(source) {
      const relative = path.relative(PROJECT_ROOT, source);
      return !relative.split(path.sep).includes('.git') && !relative.split(path.sep).includes('node_modules');
    }
  });
  t.after(() => fs.rmSync(tempRoot, { recursive: true, force: true }));

  const build = spawnSync(process.execPath, ['scripts/build.js'], { cwd: fixtureRoot, encoding: 'utf8' });
  assert.equal(build.status, 0, `${build.stdout || ''}${build.stderr || ''}`);

  const data = JSON.parse(fs.readFileSync(path.join(fixtureRoot, 'data', 'states.json'), 'utf8'));
  const cities = Object.values(data.cities).filter(city => city.status === 'published' && city.renderMode === 'generated');
  assert.equal(cities.length, 11);

  for (const city of cities) {
    const html = fs.readFileSync(path.join(fixtureRoot, city.canonicalPath.replace(/^\//, '')), 'utf8');
    assert.match(html, /<form[^>]+data-lead-form/);
    assert.match(html, /name="redirect" value="https:\/\/www\.spurauto\.com\/thank-you\.html"/);
    assert.match(html, /\.\.\/\.\.\/js\/lead-form\.js\?v=20260721f02/);
  }
});
