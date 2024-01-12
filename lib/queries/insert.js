const { ENV } = require("../../util/config");

module.exports = {
  orders: `
  INSERT INTO ${ENV.database.usersCoupons} (
    full_name, 
    email, 
    coupon_code, 
    created_at, 
    expiration_date,
    reminder_2_weeks,
    reminder_1_week
  ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
  emailTemplate:
  `
  INSERT INTO ${ENV.database.emailTemplates} (
    template_name,
    subject,
    body
  ) VALUES (?, ?, ?)`,
};
