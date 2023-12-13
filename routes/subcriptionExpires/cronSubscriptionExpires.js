const express = require("express");
const router = express.Router();
const connection = require("../../scripts/connectToDatabase");
const { currentDateOnly } = require("../../util/currentaDate");
const { where1and2WeeksAway } = require("../../lib/queries/where");
const subscriptionWillExpireEmail = require("../../emails/subscriptionWillExpireEmail");

router.get("/cron-subscription-expires", async (req, res) => {
  console.log("🚀 ~ file: cronSubscriptionExpires.js:9 ~ router.get ~ req:");
  try {
    //Check if there are emails to send today
    const [scubscriptionExpiresReminder] = await connection.query(
      where1and2WeeksAway,
      [currentDateOnly, currentDateOnly]
    );

    if (scubscriptionExpiresReminder.length == 0) {
      return res.status(200).send("No emails to send today");
    }

    // Check if the cron job has already been executed today
    const [statusRows] = await connection.query(
      "SELECT * FROM cron_execution_status WHERE executed_date = ?",
      [currentDateOnly]
    );

    if (statusRows.length === 0 && scubscriptionExpiresReminder.length != 0) {
      for (const student of scubscriptionExpiresReminder) {
        subscriptionWillExpireEmail(student.full_name, student.email);
      }

      // Update the execution status in the table
      await connection.query(
        "INSERT INTO cron_execution_status (executed_date, executed_count, emails_sent) VALUES (?, 1, ?)",
        [currentDateOnly, scubscriptionExpiresReminder.length]
      );
    } else {
      return res.send("Cron job already executed today.");
    }

    res.send("Cron job executed successfully.");
  } catch (error) {
    console.error("Error executing cron job:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await connection.end();
    console.log("MySQL connection closed.");
  }
});

module.exports = router;
