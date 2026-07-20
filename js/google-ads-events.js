// Spur Auto Google Ads conversion events.
(function (window, document) {
  "use strict";

  var FREE_REVIEW_SEND_TO = "AW-18071301983/jk5bCOXEy9McEN_eiKlD";
  var STRIPE_PURCHASE_SEND_TO = "AW-18071301983/xUrsCOjEy9McEN_eiKlD";
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

  function sendConversion(payload) {
    if (typeof window.gtag !== "function") return false;

    window.gtag("event", "conversion", payload);
    return true;
  }

  function trackFreeReviewSubmitted() {
    if (getSessionValue(FREE_REVIEW_SENT_KEY) === "1") return false;
    if (!sendConversion({ send_to: FREE_REVIEW_SEND_TO })) return false;

    setSessionValue(FREE_REVIEW_SENT_KEY, "1");
    return true;
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
