module.exports = {
  createUsersCouponsTableQuery: `
    CREATE TABLE IF NOT EXISTS dev_users_coupons (
      id INT AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      coupon_code VARCHAR(255) NOT NULL,
      created_at DATE,
      expiration_date DATE,
      reminder_2_weeks DATE,
      reminder_1_week DATE
    )
    `,
};
