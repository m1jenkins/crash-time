// Google Ads site-wide tag and lead conversion handling.
(function (window, document) {
  "use strict";

  var GOOGLE_ADS_ID = "AW-18071301983";

  // Conversion labels are public browser configuration. Create the
  // "free_review_submitted" conversion action in Google Ads (Goals >
  // Conversions > New conversion action > Website), then paste its label here.
  var LEAD_CONVERSION_LABEL = "REPLACE_WITH_GOOGLE_ADS_CONVERSION_LABEL";
  var LABEL_PLACEHOLDER = "REPLACE_WITH_GOOGLE_ADS_CONVERSION_LABEL";
  var CONVERSION_ID_KEY = "spur_auto_gads_lead_conversion_id";
  var CONVERSION_SENT_KEY = "spur_auto_gads_lead_conversion_sent";

  var conversionConfigured = Boolean(
    LEAD_CONVERSION_LABEL && LEAD_CONVERSION_LABEL !== LABEL_PLACEHOLDER
  );

  if (window.__spurGoogleAdsLoaded) return;
  window.__spurGoogleAdsLoaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_ADS_ID);

  var script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GOOGLE_ADS_ID);
  document.head.appendChild(script);

  function getSessionValue(key) {
    try {
      return window.sessionStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function setSessionValue(key, value) {
    try {
      window.sessionStorage.setItem(key, value);
      return true;
    } catch (error) {
      return false;
    }
  }

  function createConversionId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    return "lead-" + Date.now() + "-" + Math.random().toString(16).slice(2);
  }

  function rememberLeadSubmission(form) {
    if (!form || !conversionConfigured) return;

    form.addEventListener("submit", function () {
      setSessionValue(CONVERSION_ID_KEY, createConversionId());
    });
  }

  function measureConfirmedLead() {
    if (!conversionConfigured) return;

    // A missing ID means the user reached the confirmation page without a
    // tracked form submission in this session; do not count a conversion.
    var conversionId = getSessionValue(CONVERSION_ID_KEY);
    if (!conversionId || getSessionValue(CONVERSION_SENT_KEY) === conversionId) return;

    // Mark before sending so a refresh cannot count the same success twice.
    if (!setSessionValue(CONVERSION_SENT_KEY, conversionId)) return;

    try {
      window.gtag("event", "conversion", {
        send_to: GOOGLE_ADS_ID + "/" + LEAD_CONVERSION_LABEL,
        transaction_id: conversionId
      });
    } catch (error) {
      // Measurement must never block or alter the confirmed success experience.
    }
  }

  function initializeConversionHooks() {
    rememberLeadSubmission(document.querySelector("#hero-contact-form"));
    rememberLeadSubmission(document.querySelector("#free-review-form"));

    if (document.body && document.body.hasAttribute("data-lead-success")) {
      measureConfirmedLead();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeConversionHooks);
  } else {
    initializeConversionHooks();
  }
})(window, document);
