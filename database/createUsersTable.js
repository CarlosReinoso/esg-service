require("dotenv").config();
const mysql = require("mysql2");
const fs = require("fs");
const csv = require("csv-parser");
const removeUTCFromRow = require("../scripts/formatCSVDate");

const csvFilePath = "./users_table.csv";

const connection = mysql.createConnection(process.env.DATABASE_URL);

// Handle connection errors
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    process.exit(1); // Exit the script with an error code
  }
  console.log("Connected to database");
});

// Create a table
const createUsersTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  amount_spent INT,
  date_created DATE,
  email VARCHAR(255) NOT NULL,
  enrollments INT,
  enrollments_list VARCHAR(2000) NOT NULL
)
`;

connection.query(createUsersTableQuery, (err, results) => {
  if (err) {
    console.error("Error creating table:", err);
  } else {
    console.log("Table created successfully");
    // Now, call the function to insert data
    createUsersTable()
      .then(() => {
        console.log("Data imported successfully");
        connection.end();
      })
      .catch((error) => {
        console.error("Error importing data:", error);
        connection.end();
      });
  }
});

async function createUsersTable() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (row) => {
        const insertDataQuery = `
          INSERT INTO users (
            first_name,
            last_name,
            amount_spent,
            date_created,
            email,
            enrollments,
            enrollments_list) VALUES
          (?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
          row["First Name"],
          row["Last Name"],
          row["Amount spent"],
          removeUTCFromRow(row["Date created"]),
          row["Email"],
          row["Enrollments"],
          row["Enrollments - list"],
        ];
       
        connection.query(insertDataQuery, values, (err) => {
          if (err) {
            console.error("Error inserting row:", err);
            reject(err);
          }
        });
      })
      .on("end", () => {
        resolve();
      })
      .on("error", (err) => {
        console.error("Error reading CSV file:", err);
        reject(err);
      });
  });
}

module.exports = createUsersTable;
