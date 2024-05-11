const cron = require("node-cron");
const axios = require("axios");

// Function to send email (assuming implementation is provided)
async function sendEmail(message) {
  console.log("Sending email with message:", message);
  // Implement email sending logic here
}

var valid = cron.validate("59 * * * *");
console.log("🚀 ~ valid:", valid);
var invalid = cron.validate("60 * * * *");

function isSecondOrThirdMondayCronJob() {
  cron.schedule("*/3 * * * * *", async () => {
    console.log("Running a task every second");
    if (isSecondOrThirdMonday()) {
      console.log(
        "Running task because today is the 2nd or 3rd Monday of the month"
      );
      try {
        const response = await axios.get("https://api.example.com/data");
        if (response.data) {
          await sendEmail(`API data: ${JSON.stringify(response.data)}`);
        }
      } catch (error) {
        console.error("Failed to fetch data or send email:", error);
      }
    } else {
      console.log(
        "Not running task, today is not the 2nd or 3rd Monday of the month"
      );
    }
  });
}

module.exports = isSecondOrThirdMondayCronJob;
