const cron = require("node-cron");
const oxxoMonthlyPaymentEmailReminder = require("../emails/oxxo/oxxoMonthlyPaymentEmailReminder");
const { isProd } = require("./config");
const { TEST_EMAIL } = require("../constants/email");
const {
  fetchOxxoUsersFromGroup,
} = require("../services/oxxoServices");
const isSecondOrThirdMonday = require("./isSecondOrThirdMonday");
const { OXXO_TEST_GROUP_ID } = require("../constants/oxxoConstants");

async function oxxoEmailReminderCronJob() {
  console.log(
    "🚀 ~ oxxoEmailReminderCronJob ~ oxxoEmailReminderCronJob: START FUNCTION"
  );
  console.log("🚀 ~ cron.schedule ~ isSecondOrThirdMonday():", isSecondOrThirdMonday())
  
  //"*/3 * * * * *" every 3 seconds
  //"0 0 9 * * *"  9am everyday
  cron.schedule("0 0 9 * * *", async () => {
    console.log("🚀 ~ cron.schedule ~ 9am :");
    try {
      const allOxxoUsers = await fetchOxxoUsersFromGroup(OXXO_TEST_GROUP_ID); //OXXOTest
      for (const oxxoUser of allOxxoUsers) {
        oxxoMonthlyPaymentEmailReminder(
          isProd ? oxxoUser.email : TEST_EMAIL,
          oxxoUser.first_name
        );
      }
    } catch (error) {
      console.log("🚀 ~ cron.schedule ~ error:", error);
    }
  });

  cron.schedule("0 0 9 * * *", async () => {
    if (isSecondOrThirdMonday()) {
      console.log("Running task, it is the 2nd or 3rd Monday of the month");

      try {
        const allOxxoUsers = await fetchOxxoUsersFromGroup(OXXO_GROUP_ID); //OXXO
        for (const oxxoUser of allOxxoUsers) {
          oxxoMonthlyPaymentEmailReminder(
            isProd ? oxxoUser.email : TEST_EMAIL,
            oxxoUser.first_name
          );
        }
      } catch (error) {
        console.error("Error processing OXXO users:", error);
      }
    } else {
      console.log(
        "Not running task, today is not the 2nd or 3rd Monday of the month"
      );
    }
  });
}

module.exports = oxxoEmailReminderCronJob;
