const express = require("express");
const router = express.Router();

// Import individual route files
const mainRoutes = require("./main");
const ordersList = require("./orders/index");
const emailTemplates = require("./emailTemplates");
const emailTemplatesUpdate = require("./emailTemplates/update");
const oxxoMonthlyPaymentEmailReminder = require("./stripe/oxxoMonthlyPaymentEmailReminder");

router.use("/", mainRoutes);
router.use("/orders", ordersList);
router.use("/email/templates", emailTemplates);
router.use("/email/templates", emailTemplatesUpdate);
router.use("/stripe/oxxo/email", oxxoMonthlyPaymentEmailReminder);

module.exports = router;
