require("dotenv").config();
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
const oxxoCompletedWelcomeEmail = require("./emails/oxxoCompletedWelcomeEmail");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(
  bodyParser.json({
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith("/webhook")) {
        // Create rawBody object with buf
        req.rawBody = buf.toString();
      }
    },
  })
);

app.post("/webhook", (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
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
    case "checkout.session.async_payment_succeeded":
      const checkoutSession = event.data.object;
      const customerDetails = checkoutSession.customer_details;
      const customerEmail = customerDetails.email;
      const customerName = customerDetails.name;
      oxxoCompletedWelcomeEmail(customerEmail, customerName);
      break;

    default:
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
