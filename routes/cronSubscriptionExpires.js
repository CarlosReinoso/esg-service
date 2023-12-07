const express = require("express");
const router = express.Router();
const connection = require("../scripts/connectToDatabase");

router.get("/cron-subsciption-expires", async (req, res) => {
  try {
    const currentDate = new Date();
    const currentDateOnly = new Date(currentDate.toISOString().split("T")[0]);

    // Check if the cron job has already been executed today
    const [statusRows] = await connection.query(
      "SELECT * FROM cron_execution_status WHERE executed_date = ?",
      [currentDateOnly]
    );

    if (statusRows.length === 0) {
      // The cron job hasn't been executed today, perform the job
      const [scubscriptionExpiresReminder] = await connection.query(
        "SELECT * FROM dev_users_coupons WHERE DATE(reminder_1_week) = ? OR DATE(reminder_2_weeks) = ?",
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
      res.status(200).send("Cron job already executed today.")
    }

    res.status(200).send("Cron job executed successfully.");
  } catch (error) {
    console.error("Error executing cron job:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
