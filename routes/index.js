const express = require("express");
const router = express.Router();

// Import individual route files
const mainRoutes = require("./main");
const cronJobRoutes = require("./subscriptionExpires/cronSubscriptionExpires");
const subscriptionExpires = require("./subscriptionExpires/subscriptionExpires");
const todayExpirationEmails = require("./subscriptionExpires/todayExpirationEmails");
const ordersList = require("./orders/index");
const emailTemplates = require("./emailTemplates");
const emailTemplatesUpdate = require("./emailTemplates/update");

router.use("/", mainRoutes);
router.use("/", cronJobRoutes);
router.use("/", subscriptionExpires);
router.use("/", todayExpirationEmails);
router.use("/orders", ordersList);
router.use("/email/templates", emailTemplates);
router.use("/email/templates", emailTemplatesUpdate);

module.exports = router;
