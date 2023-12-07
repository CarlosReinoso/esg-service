const express = require("express");
const router = express.Router();

// Import individual route files
const mainRoutes = require("./main");
const cronJobRoutes = require("./subcriptionExpires/cronSubscriptionExpires");
const subscriptionExpires = require("./subcriptionExpires/subscriptionExpires");
const todayExpirationEmails = require("./subcriptionExpires/todayExpirationEmails");

router.use("/", mainRoutes);
router.use("/", cronJobRoutes);
router.use("/", subscriptionExpires);
router.use("/", todayExpirationEmails);

module.exports = router;
