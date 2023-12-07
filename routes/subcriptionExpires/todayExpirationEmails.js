const express = require("express");
const router = express.Router();
const connection = require("../../scripts/connectToDatabase");
const { currentDateOnly } = require("../../util/currentaDate");

router.get("/today-expiration-emails", async (req, res) => {
  try {
    const [scubscriptionExpiresReminder] = await connection.query(
        "SELECT * FROM dev_users_coupons WHERE DATE(reminder_1_week) = ? OR DATE(reminder_2_weeks) = ?",
        [currentDateOnly, currentDateOnly]
      );

    res.json({ scubscriptionExpiresReminder });
  } catch (error) {
    console.error("Error executing cron job:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
