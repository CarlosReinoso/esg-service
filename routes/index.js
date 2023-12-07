const express = require("express");
const router = express.Router();

// Import individual route files
const mainRoutes = require("./main");
const cronJobRoutes = require("./cronSubscriptionExpires");
const apiKeyMiddleware = require("../middleware/apiKey");
const apiLimiter = require("../middleware/rateLimit");

// Use individual routes
router.use("/", mainRoutes);
router.use("/", apiKeyMiddleware, cronJobRoutes);

module.exports = router;
