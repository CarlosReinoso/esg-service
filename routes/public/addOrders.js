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
const { isValidCoupon } = require("../../util/db/validation");
const { addMessage } = require("../../util/db/addMessage");
const { ENV } = require("../../util/config");

router.post("/add-orders", async (req, res) => {
  if (req?.query?.api == process.env.PUBLIC_API_KEY) {
    const body = req.body;
    const payload = req.body?.payload;
    const user = payload?.user;
    const created_at = body?.created_at;
    const couponCode = payload?.coupon?.code;
    const date = created_at;
    const email = user?.email;

    if (!isValidCoupon(couponCode)) {
      return addMessage(res, "coupon was not used");
    } else {
      const fullName = `${user?.first_name} ${user?.last_name}`;

      const values = [
        fullName,
        email,
        couponCode,
        formatDate(date),
        sixMonthsLater(date),
        twoWeeksBeforeExpires(date),
        oneWeekBeforeExpires(date),
      ];
      try {
        await connection.query(orders, values);
        console.log(
          `Data inserted into ${ENV.database.usersCoupons} table:`,
          values
        );
        return res.status(200).send("order added to db");
      } catch (error) {
        console.error(
          `Error inserting data into ${ENV.database.usersCoupons} table:`,
          error
        );
        return res.status(500).send("Internal Server Error");
      }
    }
  } else {
    return res.status(401).json({ message: "Invalid API Key" });
  }
});

module.exports = router;
