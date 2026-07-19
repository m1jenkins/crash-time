// First-party ad-click attribution capture for lead forms.
// Captures Google click identifiers (gclid/gbraid/wbraid), UTM parameters, and
// ValueTrack parameters from the landing URL, stores them locally, and injects
// them as hidden fields into the lead forms so Web3Forms carries attribution
// into the CRM record. Required for enhanced-conversions-for-leads imports.
(function (window, document) {
  "use strict";

  var STORAGE_KEY = "spur_auto_ad_attribution";
  // GCLIDs are importable for 90 days after the click.
  var MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;

  var CAPTURED_PARAMS = [
    "gclid",
    "gbraid",
    "wbraid",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "matchtype",
    "network",
    "device"
  ];

  var LEAD_FORM_SELECTORS = ["#free-review-form", "#hero-contact-form"];

  function readStorage() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return null;
      if (!parsed.captured_at_ms || Date.now() - parsed.captured_at_ms > MAX_AGE_MS) {
        window.localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return parsed;
    } catch (error) {
      return null;
    }
  }

  function writeStorage(record) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch (error) {
      // Private browsing can deny storage; same-page injection still works.
    }
  }

  function captureFromUrl() {
    var params;
    try {
      params = new window.URLSearchParams(window.location.search);
    } catch (error) {
      return null;
    }

    var record = {};
    var found = false;
    for (var i = 0; i < CAPTURED_PARAMS.length; i++) {
      var value = params.get(CAPTURED_PARAMS[i]);
      if (value) {
        record[CAPTURED_PARAMS[i]] = value.slice(0, 512);
        found = true;
      }
    }
    if (!found) return null;

    record.landing_page = window.location.pathname;
    record.captured_at = new Date().toISOString();
    record.captured_at_ms = Date.now();
    return record;
  }

  function setHiddenField(form, name, value) {
    var field = form.querySelector('input[type="hidden"][name="' + name + '"]');
    if (!field) {
      field = document.createElement("input");
      field.type = "hidden";
      field.name = name;
      form.appendChild(field);
    }
    field.value = value;
  }

  function injectIntoForms(record) {
    for (var i = 0; i < LEAD_FORM_SELECTORS.length; i++) {
      var form = document.querySelector(LEAD_FORM_SELECTORS[i]);
      if (!form) continue;
      for (var key in record) {
        if (!Object.prototype.hasOwnProperty.call(record, key)) continue;
        if (key === "captured_at_ms") continue;
        setHiddenField(form, key, String(record[key]));
      }
    }
  }

  function initialize() {
    var fromUrl = captureFromUrl();
    if (fromUrl) writeStorage(fromUrl);

    var record = fromUrl || readStorage();
    if (record) injectIntoForms(record);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
})(window, document);
