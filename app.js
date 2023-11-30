require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
// const importScript = require("./scripts/importScript");
// const createUsersTable = require("./database/createUsersTable");
// const deleteTable = require("./database/deleteTable");
// const createUsersCouponsTable = require("./database/createUsersCouponsTable");
// const selectTable = require("./database/selectTable");

// deleteTable()

// createUsersCouponsTable()

// createUsersTable();
// selectTable()


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
