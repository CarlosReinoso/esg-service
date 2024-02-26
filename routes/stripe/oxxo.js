require("dotenv").config();
const express = require("express");
const router = express.Router();
const { isProd } = require("../../util/config");
const oxxoCompletedWelcomeEmail = require("../../emails/oxxoCompletedWelcomeEmail");
const stripe = require("stripe")(
  isProd
    ? process.env.STRIPE_SECRET_KEY_PROD
    : process.env.STRIPE_SECRET_KEY_DEV
);

router.post("/oxxo-webhook", (req, res) => {
  const sig = req.headers["stripe-signature"];
  const payload = req.rawBody;
  console.log("🚀 ~ router.post ~ payload:", payload);
  console.log(`Type of req.rawBody: ${typeof req.rawBody}`); // Should log 'object'
  console.log(`Is Buffer: ${Buffer.isBuffer(req.rawBody)}`); // Should log 'true' for raw bodies

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    // On error, log and return the error message
    console.log(`Error message: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  //Jenny Rosen
  // jr.succeed_immediately@example.com
  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;
      break;
    case "checkout.session.async_payment_succeeded":
      const checkoutSession = event.data.object;
      const customerDetails = checkoutSession.customer_details;
      const customerEmail = customerDetails.email;
      const customerName = customerDetails.name;
      oxxoCompletedWelcomeEmail(customerEmail, customerName);
      break;
    case "checkout.session.async_payment_failed":
      // TODO email to admin and student of expired code
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      console.log(
        "🚀 ~ app.post ~ checkoutSessionAsyncPaymentFailed:",
        checkoutSessionAsyncPaymentFailed
      );
      // Then define and call a function to handle the event checkout.session.async_payment_failed
      break;

    default:
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
});

module.exports = router;
