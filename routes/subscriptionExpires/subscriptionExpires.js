const express = require("express");
const router = express.Router();
const createConnection = require("../../scripts/connectToDatabase");
const closeConnection = require("../../scripts/closeConnection");
const { ENV } = require("../../util/config");

router.get("/subscription-expires", async (req, res) => {
  console.log(
    "🚀 ~ file: subscriptionExpires.js:8 ~ router.get ~ /subscription-expires:"
  );
  const connection = createConnection();
  try {
    const [cronExecutionStatus] = await connection.query(
      `SELECT * FROM ${ENV.database.cronExecutionStatus}
       ORDER BY executed_date DESC
       LIMIT 20`
    );
    console.log("🚀 ~ router.get ~ cronExecutionStatus:", cronExecutionStatus)
    res.status(200).json({ cronExecutionStatus });
  } catch (error) {
    console.error("Error executing cron job:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await closeConnection(connection);
  }
});

module.exports = router;
