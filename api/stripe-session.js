function sendJson(response, statusCode, body) {
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.status(statusCode).json(body);
}

module.exports = async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return sendJson(response, 405, { error: "Method not allowed" });
  }

  const sessionId = String(request.query.session_id || "");
  if (!/^cs_(test_|live_)[A-Za-z0-9]+$/.test(sessionId)) {
    return sendJson(response, 400, { error: "Invalid Checkout Session ID" });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return sendJson(response, 500, { error: "Stripe is not configured" });
  }

  const query = new URLSearchParams();
  query.append("expand[]", "payment_intent.latest_charge.refunds");

  try {
    const stripeResponse = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}?${query}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`
        }
      }
    );
    const session = await stripeResponse.json();

    if (!stripeResponse.ok) {
      return sendJson(response, stripeResponse.status, {
        error: session.error && session.error.message
          ? session.error.message
          : "Unable to verify payment"
      });
    }

    const paymentIntent = session.payment_intent && typeof session.payment_intent === "object"
      ? session.payment_intent
      : null;
    const charge = paymentIntent && paymentIntent.latest_charge && typeof paymentIntent.latest_charge === "object"
      ? paymentIntent.latest_charge
      : null;
    const amountRefunded = charge && Number.isFinite(charge.amount_refunded)
      ? charge.amount_refunded
      : 0;
    const amountTotal = Number.isFinite(session.amount_total) ? session.amount_total : 0;
    const confirmedPaid = session.status === "complete" && session.payment_status === "paid";

    let orderStatus = confirmedPaid ? "paid" : session.payment_status || session.status || "unknown";
    if (amountRefunded > 0 && amountRefunded >= amountTotal) orderStatus = "refunded";
    else if (amountRefunded > 0) orderStatus = "partially_refunded";

    return sendJson(response, 200, {
      confirmedPaid,
      checkoutSessionId: session.id,
      orderId: session.client_reference_id || session.id,
      paymentIntentId: paymentIntent ? paymentIntent.id : session.payment_intent || null,
      amount: amountTotal / 100,
      amountRefunded: amountRefunded / 100,
      currency: String(session.currency || "usd").toUpperCase(),
      paymentStatus: session.payment_status,
      orderStatus
    });
  } catch (error) {
    return sendJson(response, 502, { error: "Unable to verify payment" });
  }
};
