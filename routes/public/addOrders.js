const express = require("express");
const router = express.Router();
const connection = require("../../scripts/connectToDatabase");
const {
  formatDate,
  sixMonthsLater,
  twoWeeksBeforeExpires,
  oneWeekBeforeExpires,
} = require("../../lib/formatDate");
const { orders } = require("../../lib/queries/insert");

router.post("/add-orders", async (req, res) => {
  console.log("🚀 ~ file: addOrders.js:13 ~ router.post ~ req:", req)
  if (req?.query?.api == process.env.PUBLIC_API_KEY) {
    const user = req.body?.user;
    const created_at = req.body?.created_at;
    const coupon = req.body?.coupon;
    console.log("🚀 ~ file: addOrders.js:13 ~ router.post ~ user:", user);
    const date = created_at;
    console.log("🚀 ~ file: addOrders.js:21 ~ router.post ~ date:", date);

    const fullName = `${user?.first_name} ${user?.last_name}`;

    const values = [
      fullName,
      "jrp.carlos@hotmail.com",
      coupon?.code,
      formatDate(date),
      sixMonthsLater(date),
      twoWeeksBeforeExpires(date),
      oneWeekBeforeExpires(date),
    ];

    try {
      await connection.query(orders, values);
      console.log("Data inserted into users_coupons table:", values);
    } catch (error) {
      console.error("Error inserting data into users_coupons table:", error);
      res.status(500).send("Internal Server Error");
    }
  }
});

module.exports = router;
