module.exports = {
  createUsersCouponsTableQuery: `
    CREATE TABLE IF NOT EXISTS users_coupons (
      id INT AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      coupon_code VARCHAR(255) NOT NULL,
      created_at DATE
    )
    `,
};
