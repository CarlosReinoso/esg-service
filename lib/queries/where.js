const config = require("../../util/config");

module.exports = {
  where1and2WeeksAway: `
        SELECT * FROM ${config.database.usersCoupons}
        WHERE DATE(reminder_1_week) = ? OR DATE(reminder_2_weeks) = ?
      `,
};
