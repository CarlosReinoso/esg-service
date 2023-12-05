require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
// const createUsersCouponsTable = require("./database/createUsersCouponsTable");
// const selectTable = require("./database/selectTable");
// const deleteTable = require("./database/deleteTable");
// const createUsersCouponsTable = require("./database/createUsersCouponsTable");

// selectTable("users_coupons")
// createUsersCouponsTable()
// deleteTable("users_coupons")





app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
