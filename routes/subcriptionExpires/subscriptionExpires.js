const express = require("express");
const router = express.Router();
const connection = require("../../scripts/connectToDatabase");

router.get("/subscription-expires", async (req, res) => {
  try {
    const [cronExecutionStatus] = await connection.query(
      `SELECT * FROM cron_execution_status
       ORDER BY executed_date DESC
       LIMIT 20`
    );
    res.json({ cronExecutionStatus });
  } catch (error) {
    console.error("Error executing cron job:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
