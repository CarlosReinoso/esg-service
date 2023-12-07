require("dotenv").config();
const express = require("express");
const app = express();
const cron = require("node-cron");
const connection = require("./scripts/connectToDatabase");
const subscriptionWillExpireEmail = require("./emails/subscriptionWillExpireEmail");
const port = 3000;

// createUsersCouponsTable()
// selectTable("dev_users_coupons")
// deleteTable("dev_users_coupons")

// cron.schedule("*/3 * * * * *", async () => {
//   console.log("Cron job started");
//   try {
//     const currentDate = new Date();

//     const currentDateOnly = new Date(currentDate.toISOString().split("T")[0]);

//     const students1WeekReminder = await connection.query(
//       "SELECT * FROM dev_users_coupons WHERE DATE(reminder_1_week) = ? OR DATE(reminder_2_weeks) = ?",
//       [currentDateOnly, currentDateOnly]
//     );

//     for (const student of students1WeekReminder[0]) {
//       subscriptionWillExpireEmail(student.full_name, student.email);
//     }
//   } catch (error) {
//     console.error("Error executing cron job:", error);
//   }
// });

app.get("/", (req, res) => {
  console.log("🚀 CRON JOB");
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
