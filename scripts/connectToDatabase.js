require("dotenv").config();
const mysql = require("mysql2");

function createConnection() {
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  
  connection.on("error", (err) => {
    console.error("MySQL connection error:", err);
  });

  return connection.promise();
}

module.exports = createConnection;
