const {
  formatDate,
  sixMonthsLater,
  twoWeeksBeforeExpires,
  oneWeekBeforeExpires,
} = require("../lib/formatDate");
const connection = require("../scripts/connectToDatabase");

async function insertToTable() {
  const insertQuery = `
    INSERT INTO dev_users_coupons (
      full_name, 
      email, 
      coupon_code, 
      created_at, 
      expiration_date,
      reminder_2_weeks,
      reminder_1_week)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const date = "2023-06-14T00:00:00.000Z";

  const values = [
    "One Week",
    "jrp.carlos@hotmail.com",
    "besg202275",
    formatDate(date),
    sixMonthsLater(date),
    twoWeeksBeforeExpires(date),
    oneWeekBeforeExpires(date),
  ];

  try {
    await connection.query(insertQuery, values);
    console.log("Data inserted into users_coupons table:", values);
  } catch (error) {
    console.error("Error inserting data into users_coupons table:", error);
  }
}

insertToTable();
module.exports = insertToTable;
