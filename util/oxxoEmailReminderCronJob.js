const cron = require("node-cron");
const axios = require("axios");
const { thinkificAPI } = require("../lib/axiosConfig");
const oxxoMonthlyPaymentEmailReminder = require("../emails/oxxoMonthlyPaymentEmailReminder");
const { isProd } = require("./config");
const { TEST_EMAIL } = require("../constants/email");

async function oxxoEmailReminderCronJob() {
  //"*/3 * * * * *" every 3 seconds
  //"0 0 9 * * *"  9am everyday
  cron.schedule("0 */10 * * * *", async () => {
    console.log("🚀 ~ cron.schedule every ten minutes: 0 */10 * * * *");
  });
  cron.schedule("0 0 9 * * *", async () => {
    oxxoMonthlyPaymentEmailReminder(TEST_EMAIL, "TEST CRON")
  });

  cron.schedule("0 0 9 * * *", async () => {
    if (isSecondOrThirdMonday()) {
      console.log("Running task, it is the 2nd or 3rd Monday of the month");

      try {
        let allOxxoUsers = [];
        let currentPage = 1;

        do {
          const response = await thinkificAPI.get(
            `/users?page=1&limit=25&query%5Bgroup_id%5D=328092'`
          ); //id for oxxo group

          const oxxoUser = response.data.items;
          allOxxoUsers = allOxxoUsers.concat(oxxoUser);

          currentPage = response.data.meta.pagination.next_page;
        } while (currentPage);

        for (const oxxoUser of allOxxoUsers) {
          oxxoMonthlyPaymentEmailReminder(
            isProd ? oxxoUser.email : TEST_EMAIL,
            oxxoUser.first_name
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.log(
        "Not running task, today is not the 2nd or 3rd Monday of the month"
      );
    }
  });
}

module.exports = oxxoEmailReminderCronJob;
