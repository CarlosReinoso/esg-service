const express = require("express");
const router = express.Router();

router.get("/hello", (req, res) => {
  res.send("Hello, this is the main route!");
});

module.exports = router;
