const express = require("express");
const router = express.Router();
const connection = require("../../scripts/connectToDatabase");
const { currentDateOnly } = require("../../util/currentaDate");
const { where1and2WeeksAway } = require("../../lib/queries/where");

router.get("/cron-subscription-expires", async (req, res) => {
  try {
   

    // Check if the cron job has already been executed today
    const [statusRows] = await connection.query(
      "SELECT * FROM cron_execution_status WHERE executed_date = ?",
      [currentDateOnly]
    );

    if (statusRows.length === 0) {
      // The cron job hasn't been executed today, perform the job
      const [scubscriptionExpiresReminder] = await connection.query(where1and2WeeksAway,
        [currentDateOnly, currentDateOnly]
      );

      for (const student of scubscriptionExpiresReminder) {
        subscriptionWillExpireEmail(student.full_name, student.email);
      }

      // Update the execution status in the table
      await connection.query(
        "INSERT INTO cron_execution_status (executed_date, executed_count) VALUES (?, 1)",
        [currentDateOnly]
      );
    } else {
      return res.send("Cron job already executed today.");
    }

    res.send("Cron job executed successfully.");
  } catch (error) {
    console.error("Error executing cron job:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
