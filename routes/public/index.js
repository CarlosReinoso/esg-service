const express = require("express");
const router = express.Router();

const status = require("./status");
const addOrders = require("./addOrders");

router.use("/", status);
router.use("/", addOrders);

module.exports = router;
