const connection = require("../scripts/connectToDatabase");
const { createUsersCouponsTableQuery } = require("../lib/queries/queries");
const axios = require("../lib/axiosConfig");
const {
  formatDate,
  sixMonthsLater,
  oneWeekBeforeExpires,
  twoWeeksBeforeExpires,
} = require("../lib/formatDate");
const createTable = require("./createTable");
const { orders } = require("../lib/queries/insert");
const { isValidCoupon } = require("../util/db/validation");
const createConnection = require("../scripts/connectToDatabase");
const { isDev } = require("../util/config");

async function createUsersCouponsTable() {
  try {
    await createTable(createUsersCouponsTableQuery); // Ensure the table exists

    let allOrders = [];
    let currentPage = 1;

    const connection = createConnection();

    do {
      const response = await axios.get(`/orders?page=${currentPage}&limit=25`);

      const orders = response.data.items;

      allOrders = allOrders.concat(orders);

      currentPage = response.data.meta.pagination.next_page;
      console.log("Current Page:", currentPage);
    } while (currentPage);

    for (const order of allOrders) {
      if (isValidCoupon(order.coupon_code) && order.user_email != "(deleted)") {
        const date = order.created_at;

        const values = [
          order.user_name,
          isDev ? "jrp.carlos@hotmail.com" : order.user_email,
          order.coupon_code,
          formatDate(date),
          sixMonthsLater(date),
          twoWeeksBeforeExpires(date),
          oneWeekBeforeExpires(date),
        ];

        try {
          await connection.query(orders, values);
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

createUsersCouponsTable();
module.exports = createUsersCouponsTable;
