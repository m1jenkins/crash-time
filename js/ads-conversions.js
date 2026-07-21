// OpenAI Ads Measurement Pixel and confirmed lead conversion handling.
(function (window, document) {
  "use strict";

  // Pixel IDs are public browser configuration.
  var OPENAI_ADS_PIXEL_ID = "1FkmT28b6AkfCMFBEcxsHP";
  var PIXEL_PLACEHOLDER = "REPLACE_WITH_OPENAI_ADS_PIXEL_ID";
  var CONVERSION_ID_KEY = "spur_auto_lead_conversion_id";
  var CONVERSION_SENT_KEY = "spur_auto_lead_conversion_sent";

  var pixelConfigured = Boolean(
    OPENAI_ADS_PIXEL_ID && OPENAI_ADS_PIXEL_ID !== PIXEL_PLACEHOLDER
  );

  if (pixelConfigured) {
    // Keep the documented loader behavior in the head so attribution is captured early.
    (function (w, d, s, u) {
      if (w.oaiq) return;
      var q = function () {
        q.q.push(arguments);
      };
      q.q = [];
      w.oaiq = q;
      var js = d.createElement(s);
      js.async = true;
      js.src = u;
      var firstScript = d.getElementsByTagName(s)[0];
      firstScript.parentNode.insertBefore(js, firstScript);
    })(window, document, "script", "https://bzrcdn.openai.com/sdk/oaiq.min.js");

    window.oaiq("init", {
      pixelId: OPENAI_ADS_PIXEL_ID
    });
  }

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

  function removeSessionValue(key) {
    try {
      window.sessionStorage.removeItem(key);
    } catch (error) {
      // Private browsing modes can deny storage access; the conversion still remains non-blocking.
    }
  }

  function createConversionId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }

    return "lead-" + Date.now() + "-" + Math.random().toString(16).slice(2);
  }

  function rememberLeadSubmission(form) {
    if (!form || !pixelConfigured) return;

    form.addEventListener("submit", function () {
      setSessionValue(CONVERSION_ID_KEY, createConversionId());
      removeSessionValue(CONVERSION_SENT_KEY);
    });
  }

  function measureConfirmedLead() {
    if (!pixelConfigured || !window.oaiq) return;

    var conversionId = getSessionValue(CONVERSION_ID_KEY);
    if (!conversionId || getSessionValue(CONVERSION_SENT_KEY) === conversionId) return;

    // Mark before sending so a refresh cannot count the same success twice.
    if (!setSessionValue(CONVERSION_SENT_KEY, conversionId)) return;

    try {
      window.oaiq(
        "measure",
        "lead_created",
        { type: "customer_action" },
        { event_id: conversionId }
      );
      removeSessionValue(CONVERSION_ID_KEY);
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
