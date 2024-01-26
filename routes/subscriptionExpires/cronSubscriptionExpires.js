const express = require("express");
const router = express.Router();
const createConnection = require("../../scripts/connectToDatabase");
const { currentDateOnly } = require("../../util/currentaDate");
const { where1and2WeeksAway } = require("../../lib/queries/where");
const {
  subscriptionWillExpireEmail,
} = require("../../emails/subscriptionWillExpireEmail");
const closeConnection = require("../../scripts/closeConnection");
const { ENV } = require("../../util/config");

router.get("/cron-subscription-expires", async (req, res) => {
  console.log(
    "🚀 ~ file: cronSubscriptionExpires.js:53 ~ router.get ~ /cron-subscription-expires:"
  );

  const connection = createConnection();
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
      `SELECT * FROM ${ENV.database.cronExecutionStatus} WHERE executed_date = ?`,
      [currentDateOnly]
    );
    
    //to test > 0 vs === 0
    if (statusRows.length === 0 && scubscriptionExpiresReminder.length != 0) {

      for (const student of scubscriptionExpiresReminder) {
        subscriptionWillExpireEmail(student.email, student.full_name);
      }

      //Update the execution status in the table
      await connection.query(
        `INSERT INTO ${ENV.database.cronExecutionStatus} (executed_date, executed_count, emails_sent) VALUES (?, 1, ?)`,
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
    await closeConnection(connection);
  }
});

module.exports = router;