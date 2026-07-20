(function (window, document) {
  "use strict";

  function setText(id, value) {
    var element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  function showError(message) {
    setText("purchase-title", "We’re confirming your payment.");
    setText("purchase-message", message || "Your payment details are not available yet. Please keep your Stripe receipt and contact us if you need help.");
    var details = document.getElementById("purchase-details");
    if (details) details.hidden = true;
  }

  async function initialize() {
    var sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (!sessionId) {
      showError("This page needs a Stripe Checkout Session ID before it can confirm a purchase.");
      return;
    }

    try {
      var response = await window.fetch("/api/stripe-session?session_id=" + encodeURIComponent(sessionId), {
        credentials: "same-origin",
        headers: { Accept: "application/json" }
      });
      var purchase = await response.json();

      if (!response.ok || !purchase.confirmedPaid) {
        showError("Stripe has not confirmed this payment as complete. No purchase conversion was recorded.");
        return;
      }

      setText("purchase-title", "Payment confirmed. Thank you.");
      setText("purchase-message", "Stripe confirmed your purchase. Save the details below with your receipt.");
      setText("purchase-order-id", purchase.orderId || purchase.checkoutSessionId);
      setText("purchase-amount", new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: purchase.currency
      }).format(purchase.amount));
      setText("purchase-status", purchase.orderStatus);

      if (window.spurAutoGoogleAds && typeof window.spurAutoGoogleAds.trackStripePurchase === "function") {
        window.spurAutoGoogleAds.trackStripePurchase({
          transactionId: purchase.checkoutSessionId,
          value: purchase.amount,
          currency: purchase.currency,
          paymentStatus: purchase.paymentStatus,
          orderStatus: purchase.orderStatus
        });
      }
    } catch (error) {
      showError("We couldn’t load the confirmed payment details. No purchase conversion was recorded.");
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize);
  else initialize();
})(window, document);
