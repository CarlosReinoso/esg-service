require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.on("error", (err) => {
  console.error("MySQL connection error:", err);
});

module.exports = connection.promise();
