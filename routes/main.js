const express = require("express");
const router = express.Router();

router.get("/hello", (req, res) => {
  res.send("Hello, you are using the correct API key!");
});

module.exports = router;
