const connection = require("../scripts/connectToDatabase");

async function createTable(createQuery) {
  try {
    await connection.query(createQuery);
    console.log("Created table");
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

module.exports = createTable;
