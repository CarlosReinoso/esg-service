//WIP
require("dotenv").config();
const express = require("express");
const router = express.Router();
const { isProd } = require("../../util/config");
const { fetchOxxoUsersFromGroup } = require("../../services/oxxoServices");
const { TEST_EMAIL } = require("../../constants/email");
const {
  OXXO_GROUP_ID,
  OXXO_TEST_GROUP_ID,
} = require("../../constants/oxxoConstants");
const oxxoMonthlyPaymentEmailReminder = require("../../emails/oxxo/oxxoMonthlyPaymentEmailReminder");
const supabase = require("../../lib/supabase");

router.get("/monthly-repayment", async (req, res) => {
  console.log("🚀 ~ router.get ~ monthly-repayment:");
  try {
    try {
      const allOxxoUsers = await fetchOxxoUsersFromGroup(OXXO_GROUP_ID); //OXXO
      for (const oxxoUser of allOxxoUsers) {
        oxxoMonthlyPaymentEmailReminder(
          isProd ? oxxoUser.email : TEST_EMAIL,
          oxxoUser.first_name
        );
      }

      const logResult = await supabase.from("oxxo_repayment_email_log").insert([
        {
          emails_sent: allOxxoUsers.length,
        },
      ]);

      if (logResult.error) {
        console.error("Error logging email action:", logResult.error);
      }
    } catch (error) {
      console.error("Error processing OXXO users:", error);
    }

    console.log("Have sent emails reminders");
    res.status(200).send("Have sent emails reminders");
  } catch (error) {
    console.error("Error processing OXXO users:", error);
  }
});

module.exports = router;
