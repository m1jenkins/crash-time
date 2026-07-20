// Spur Auto Google Ads conversion events.
(function (window, document) {
  "use strict";

  var FREE_REVIEW_SEND_TO = "AW-18071301983/jk5bCOXEy9McEN_eiKlD";
  var STRIPE_PURCHASE_SEND_TO = "AW-18071301983/xUrsCOjEy9McEN_eiKlD";
  var FREE_REVIEW_PENDING_KEY = "spur_auto_google_ads_free_review_pending";
  var FREE_REVIEW_SENT_KEY = "spur_auto_google_ads_free_review_sent";
  var STRIPE_PURCHASE_SENT_KEY = "spur_auto_google_ads_stripe_purchase_sent";

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
      // Storage failures must never block a confirmed lead experience.
    }
  }

  function createConversionId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }

    return "lead-" + Date.now() + "-" + Math.random().toString(16).slice(2);
  }

  function sendConversion(payload) {
    if (typeof window.gtag !== "function") return false;

    window.gtag("event", "conversion", payload);
    return true;
  }

  function trackFreeReviewSubmitted() {
    var conversionId = getSessionValue(FREE_REVIEW_PENDING_KEY);

    // A direct visit to the thank-you page is not a lead.
    if (!conversionId || getSessionValue(FREE_REVIEW_SENT_KEY) === conversionId) {
      return false;
    }

    if (!sendConversion({
      send_to: FREE_REVIEW_SEND_TO,
      transaction_id: conversionId
    })) return false;

    setSessionValue(FREE_REVIEW_SENT_KEY, conversionId);
    removeSessionValue(FREE_REVIEW_PENDING_KEY);
    return true;
  }

  function rememberFreeReviewSubmission(form) {
    if (!form) return;

    form.addEventListener("submit", function () {
      setSessionValue(FREE_REVIEW_PENDING_KEY, createConversionId());
    });
  }

  // Call this only after Stripe confirms payment. Never attach it to a checkout-link click.
  function trackStripePurchase(details) {
    details = details || {};
    var transactionId = String(details.transactionId || "");
    var value = Number(details.value);
    var currency = String(details.currency || "USD");
    var paymentStatus = String(details.paymentStatus || "");

    if (paymentStatus !== "paid") return false;
    if (!transactionId || !isFinite(value) || value <= 0) return false;
    if (getSessionValue(STRIPE_PURCHASE_SENT_KEY) === transactionId) return false;

    if (!sendConversion({
      send_to: STRIPE_PURCHASE_SEND_TO,
      value: value,
      currency: currency,
      transaction_id: transactionId
    })) {
      return false;
    }

    setSessionValue(STRIPE_PURCHASE_SENT_KEY, transactionId);
    return true;
  }

  window.spurAutoGoogleAds = window.spurAutoGoogleAds || {};
  window.spurAutoGoogleAds.trackStripePurchase = trackStripePurchase;

  function initialize() {
    rememberFreeReviewSubmission(document.querySelector("#hero-contact-form"));
    rememberFreeReviewSubmission(document.querySelector("#free-review-form"));

    if (document.body && document.body.hasAttribute("data-lead-success")) {
      trackFreeReviewSubmitted();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
})(window, document);
