const express = require("express");
const router = express.Router();
const { currentDateOnly } = require("../../util/currentaDate");
const { where1and2WeeksAway } = require("../../lib/queries/where");
const closeConnection = require("../../scripts/closeConnection");
const createConnection = require("../../scripts/connectToDatabase");

router.get("/today-expiration-emails", async (req, res) => {
  console.log(
    "🚀 ~ file: todayExpirationEmails.js:19 ~ router.get ~ get: /today-expiration-emails"
  );
  const connection = createConnection();

  try {
    const [scubscriptionExpiresReminder] = await connection.query(
      where1and2WeeksAway,
      [currentDateOnly, currentDateOnly]
    );

    res.json({ scubscriptionExpiresReminder });
  } catch (error) {
    console.error("Error executing cron job:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await closeConnection(connection);
  }
});

module.exports = router;
