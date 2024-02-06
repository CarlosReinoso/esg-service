require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const port = 3000;
const mainRoutes = require("./routes");
const publicRoutes = require("./routes/public/index");
const apiKeyMiddleware = require("./middleware/apiKey");
const apiLimiter = require("./middleware/rateLimit");
const bodyParser = require("body-parser");
const cors = require("cors");
const { resolve } = require("path");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(bodyParser.json());

app.use(express.static(process.env.STATIC_DIR));


app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith("/webhook")) {
        req.rawBody = buf.toString();
      }
    },
  })
);
app.use(
  cors({
    origin: "http://localhost:4000",
  })
);

app.get("/oxxo", (req, res) => {
  res.sendFile(__dirname + "/client/pages/oxxo.html");
});

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-payment-intent", async (req, res) => {
  const { paymentMethodType, currency, paymentMethodOptions } = req.body;

  const params = {
    payment_method_types:
      paymentMethodType === "link" ? ["link", "card"] : [paymentMethodType],
    amount: 5999,
    currency: currency,
  };

  // [0] https://stripe.com/docs/api/payment_intents/create
  try {
    const paymentIntent = await stripe.paymentIntents.create(params);

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
      nextAction: paymentIntent.next_action,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

app.get("/payment/next", async (req, res) => {
  const intent = await stripe.paymentIntents.retrieve(
    req.query.payment_intent,
    {
      expand: ["payment_method"],
    }
  );

  res.redirect(`/success?payment_intent_client_secret=${intent.client_secret}`);
});

app.get("/success", async (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/success.html");
  res.sendFile(path);
});

// Expose a endpoint as a webhook handler for asynchronous events.
// Configure your webhook in the stripe developer dashboard
// https://dashboard.stripe.com/test/webhooks
app.post("/webhook", async (req, res) => {
  let data, eventType;

  // Check if webhook signing is configured.
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // we can retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  if (eventType === "payment_intent.succeeded") {
    // Funds have been captured
    // Fulfill any orders, e-mail receipts, etc
    // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
    console.log("💰 Payment captured!");
  } else if (eventType === "payment_intent.payment_failed") {
    console.log("❌ Payment failed.");
  }
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
