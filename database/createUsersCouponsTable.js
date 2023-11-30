const createDatabaseConnection = require("../scripts/connectToDatabase");

const connection = createDatabaseConnection();

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

async function createUsersCouponsTable() {
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

module.exports = createUsersCouponsTable;
