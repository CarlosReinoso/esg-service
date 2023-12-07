const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // Allow 100 requests per 5-minute window
});

module.exports = apiLimiter