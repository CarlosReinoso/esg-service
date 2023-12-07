const connection = require("../scripts/connectToDatabase");
const { createUsersCouponsTableQuery } = require("../lib/queries");
const axios = require("../lib/axiosConfig");
const {
  formatDate,
  sixMonthsLater,
  oneWeekBeforeExpires,
  twoWeeksBeforeExpires,
} = require("../lib/formatDate");
const createTable = require("./createTable");

const isValidCoupon = (couponCode) => {
  const validCoupons = ["besg202275", "90esgbeca", "besg20211125"];
  return validCoupons.includes(couponCode);
};

async function createUsersCouponsTable() {
  try {
    await createTable(createUsersCouponsTableQuery); // Ensure the table exists

    let allOrders = [];
    let currentPage = 1;

    do {
      const response = await axios.get(`/orders?page=${currentPage}&limit=25`);

      const orders = response.data.items;

      allOrders = allOrders.concat(orders);

      // currentPage = response.data.meta.pagination.next_page;
      currentPage = null;
      console.log("Current Page:", currentPage);
    } while (currentPage);

    for (const order of allOrders) {
      if (isValidCoupon(order.coupon_code) && order.user_email != "(deleted)") {
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

        const date = order.created_at;

        const values = [
          order.user_name,
          "jrp.carlos@hotmail.com",
          order.coupon_code,
          formatDate(date),
          sixMonthsLater(date),
          twoWeeksBeforeExpires(date),
          oneWeekBeforeExpires(date),
        ];

        try {
          await connection.query(insertQuery, values);
          console.log("Data inserted into users_coupons table:", values);
        } catch (error) {
          console.error(
            "Error inserting data into users_coupons table:",
            error
          );
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = createUsersCouponsTable;
