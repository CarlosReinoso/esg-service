const express = require("express");
const router = express.Router();
const connection = require("../../scripts/connectToDatabase");
const { ENV } = require("../../util/config");

router.get("/list", async (req, res) => {
  try {
    const [cronExecutionStatus] = await connection.query(
      `SELECT * FROM ${ENV.database.usersCoupons}
       `
    );
    res.json({ cronExecutionStatus });
  } catch (error) {
    console.error("Error executing cron job:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
