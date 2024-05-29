require("dotenv").config();
const express = require("express");
const router = express.Router();
const { isProd } = require("../../util/config");
const oxxoCompletedWelcomeEmail = require("../../emails/oxxo/oxxoSuccesfulCheckoutEmail");
const oxxoSuccesfulCheckoutEmail = require("../../emails/oxxo/oxxoSuccesfulCheckoutEmail");
const { fetchOxxoUsersFromGroup } = require("../../services/oxxoServices");
const oxxoRepayingSubscriptionEmail = require("../../emails/oxxo/oxxoRepayingSubscriptionEmail");
const { TEST_EMAIL } = require("../../constants/email");
const stripe = require("stripe")(
  isProd
    ? process.env.STRIPE_SECRET_KEY_PROD
    : process.env.STRIPE_SECRET_KEY_DEV
);
const {
  OXXO_GROUP_ID,
  OXXO_TEST_GROUP_ID,
} = require("../../constants/oxxoConstants");
console.log("🚀 ~ OXXO_GROUP_ID:", OXXO_GROUP_ID);

async function isRepayingOxxoSubscription(email) {
  try {
    const allOxxoUsers = await fetchOxxoUsersFromGroup(
      isProd ? OXXO_GROUP_ID : OXXO_TEST_GROUP_ID
    );
    for (const oxxoUser of allOxxoUsers) {
      if (oxxoUser.email.trim() === email.trim()) {
        return true;
      }
    }
    console.log(
      "🚀 ~ isRepayingOxxoSubscription ~ allOxxoUsers:",
      allOxxoUsers
    );

    return false; // No matching email found
  } catch (error) {
    console.error("Error processing isRepayingOxxoSubscription:", error);
  }
}

router.post("/oxxo-webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      isProd
        ? process.env.STRIPE_WEBHOOK_SECRET
        : process.env.STRIPE_TEST_WEBHOOK_SECRET
    );
  } catch (err) {
    // On error, log and return the error message
    console.log(`Error message: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Successfully constructed event
  console.log("✅ Success:", event.id);

  //Jenny Rosen
  // jr.succeed_immediately@example.com
  switch (event.type) {
    case "checkout.session.completed":
      const { customer_details, payment_intent } = event.data.object;
      const email = customer_details?.email;
      const name = customer_details?.name;
      const paymentIntent = await stripe.paymentIntents.retrieve(
        payment_intent
      );
      const nextAction = paymentIntent?.next_action ?? {};
      const amount = paymentIntent?.amount ?? 0;

      const oxxoDisplayDetails = nextAction?.oxxo_display_details ?? {};
      const expires_after = oxxoDisplayDetails?.expires_after ?? 0;
      const hosted_voucher_url = oxxoDisplayDetails?.hosted_voucher_url;
      const number = oxxoDisplayDetails?.number;

      oxxoSuccesfulCheckoutEmail(
        email,
        name,
        amount,
        expires_after,
        hosted_voucher_url,
        number
      );

      break;
    case "checkout.session.async_payment_succeeded":
      console.log("🚀 CASE checkout.session.async_payment_succeeded:")

      const checkoutSession = event.data.object;
      const customerDetails = checkoutSession?.customer_details;
      const customerEmail = customerDetails?.email;
      const customerName = customerDetails?.name;

      const returningCustomer = await isRepayingOxxoSubscription(customerEmail);
      console.log("🚀 ~ router.post ~ returningCustomer:", returningCustomer);
      if (returningCustomer) {
        oxxoRepayingSubscriptionEmail(customerEmail, customerName);
        console.log("🚀 ~ router.post ~ oxxoRepayingSubscriptionEmail:");
      } else {
        oxxoCompletedWelcomeEmail(customerEmail, customerName);
        console.log("🚀 ~ router.post ~ oxxoCompletedWelcomeEmail:");
      }

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
