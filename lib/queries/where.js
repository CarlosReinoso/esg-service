const { ENV } = require("../../util/config");
console.log("🚀 ~ ENV:", ENV)


module.exports = {
  where1and2WeeksAway: `
        SELECT * FROM ${ENV.database.usersCoupons}
        WHERE DATE(reminder_1_week) = ? OR DATE(reminder_2_weeks) = ?
      `,
};
