const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql2");
require("dotenv").config();
// const importScript = require("./scripts/importScript");
const createUsersTable = require("./database/createUsersTable");
const selectTable = require("./database/selectTable");

const deleteTable = require("./database/deleteTable");

// deleteTable()

// createUsersTable();
selectTable()


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
