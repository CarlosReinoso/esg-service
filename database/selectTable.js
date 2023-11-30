require('dotenv').config()
const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)

async function importScript() {
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to database:", err);
      return;
    }
    console.log("Connected to database");

    const selectAllQuery = "SELECT * FROM users";

    connection.query(selectAllQuery, (err, results) => {
      if (err) {
        console.error("Error selecting data:", err);
      } else {
        console.log("Selected data:", results);
      }

      connection.end();
    });
  });
}

module.exports = importScript;
