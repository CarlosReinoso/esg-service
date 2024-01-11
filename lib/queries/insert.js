const { ENV } = require("../../util/config");

module.exports = {
  orders: `INSERT INTO ${ENV.usersCoupons} (
           full_name, 
           email, 
           coupon_code, 
           created_at, 
           expiration_date,
           reminder_2_weeks,
           reminder_1_week)
           VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
};
