const express = require("express");
const router = express.Router();

const status = require("./status");
const oxxoWebhook = require("../stripe/oxxo.js");
const keepAlive = require("./keep-alive.js");

router.use("/", status);
router.use("/keep-alive", keepAlive);
router.use("/stripe", oxxoWebhook);

module.exports = router;
