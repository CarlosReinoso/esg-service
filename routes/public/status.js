const express = require("express");
const router = express.Router();

router.get("/status", async (req, res) => {
  try {
    console.log("🚀 /hello endpoint hit");
    res.status(200).send("App is running");
  } catch (error) {
    console.error("Error executing:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
