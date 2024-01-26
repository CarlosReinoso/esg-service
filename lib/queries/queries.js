const { ENV } = require("../../util/config");

module.exports = {
  createUsersCouponsTableQuery: `
    CREATE TABLE IF NOT EXISTS ${ENV.database.usersCoupons} (
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
  cronExecutionTableQuery: `
    CREATE TABLE IF NOT EXISTS ${ENV.database.cronExecutionStatus} (
      id INT AUTO_INCREMENT PRIMARY KEY,
      executed_date DATE,
      executed_count INT DEFAULT 0,
      emails_sent INT
    )
    `,
  emailTemplatesTableQuery: `
      CREATE TABLE IF NOT EXISTS ${ENV.database.emailTemplates} (
        template_id INT PRIMARY KEY AUTO_INCREMENT,
        template_name VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        body TEXT NOT NULL
    )
    `,
};
