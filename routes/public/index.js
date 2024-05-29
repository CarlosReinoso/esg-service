const express = require("express");
const router = express.Router();

const status = require("./status");
const oxxoWebhook = require("../stripe/oxxo.js");

router.use("/", status);
router.use("/stripe", oxxoWebhook);

module.exports = router;
