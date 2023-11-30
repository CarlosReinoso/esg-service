require("dotenv").config();
const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);

function createDatabaseConnection() {
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to database:", err);
      process.exit(1); // Exit the script with an error code
    }
    console.log("Connected to database");
  });

  // Ensure the connection is closed when the Node.js process is terminated
  process.on("SIGINT", () => {
    connection.end();
    console.log("Database connection closed due to app termination");
    process.exit(0);
  });

  return connection;
}


module.exports = createDatabaseConnection