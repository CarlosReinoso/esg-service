require("dotenv").config();
const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);

async function deleteTable() {
  const tableName = "users"; 
  connection.connect();

  const dropTableQuery = `DROP TABLE IF EXISTS ${tableName}`;

  connection.query(dropTableQuery, (err, results) => {
    if (err) {
      console.error("Error dropping table:", err);
    } else {
      console.log("Table dropped successfully");
    }

    connection.end();
  });
}

module.exports = deleteTable;
