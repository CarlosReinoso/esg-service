const express = require("express");
const router = express.Router();

const status = require("./status");
const addOrders = require("./addOrders");
const oxxoWebhook = require("../stripe/oxxo.js");

router.use("/stripe/oxxo-webhook", express.raw({ type: "application/json" }));

router.use("/", status);
router.use("/", addOrders);
router.use("/stripe", oxxoWebhook);

module.exports = router;
