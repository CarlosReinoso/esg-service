const express = require("express");
const router = express.Router();
const connection = require("../../scripts/connectToDatabase");
const { currentDateOnly } = require("../../util/currentaDate");
const { where1and2WeeksAway } = require("../../lib/queries/where");

router.get("/today-expiration-emails", async (req, res) => {
  try {
    const [scubscriptionExpiresReminder] = await connection.query(where1and2WeeksAway,
        [currentDateOnly, currentDateOnly]
      );

    res.json({ scubscriptionExpiresReminder });
  } catch (error) {
    console.error("Error executing cron job:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
