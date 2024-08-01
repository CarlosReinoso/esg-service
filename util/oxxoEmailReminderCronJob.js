const cron = require("node-cron");
const oxxoMonthlyPaymentEmailReminder = require("../emails/oxxo/oxxoMonthlyPaymentEmailReminder");
const { isProd } = require("./config");
const { TEST_EMAIL } = require("../constants/email");
const { fetchOxxoUsersFromGroup } = require("../services/oxxoServices");
const isThirdOrFourthMonday = require("./isThirdOrFourthMonday");
const {
  OXXO_TEST_GROUP_ID,
  OXXO_GROUP_ID,
} = require("../constants/oxxoConstants");
const isDayTest = require("./isDayTest");

async function oxxoEmailReminderCronJob() {
  //"*/3 * * * * *" every 3 seconds
  //"0 0 9 * * *"  9am everyday
  //"0 0 9 * * 1,4" every monday and thursday
  cron.schedule("0 0 9 * * 1,4", async () => {
    console.log("🚀 ~ oxxoEmailReminderCronJob - every monday and thursday :");
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
    console.log("🚀 ~ oxxoEmailReminderCronJob daily cron, running...");

    if (isDayTest()) {
      console.log("🚀 ~ cron.schedule ~ isDayTest():", isDayTest());

      try {
        const allOxxoUsers = await fetchOxxoUsersFromGroup(OXXO_TEST_GROUP_ID); //OXXO
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
      console.log("Not running task, it is not the first friday of the month");
    }
  });

  cron.schedule("0 0 9 * * *", async () => {
    console.log("🚀 ~ isThirdOrFourthMonday:", isThirdOrFourthMonday());
    if (isThirdOrFourthMonday()) {
      console.log("Running task, it is the 3rd or 4th Monday of the month");

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
        "Not running task, today is not the 3rd or 4th Monday of the month"
      );
    }
  });
}

module.exports = oxxoEmailReminderCronJob;
