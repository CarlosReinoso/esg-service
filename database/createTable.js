const { emailTemplatesTableQuery } = require("../lib/queries/queries");
const createConnection = require("../scripts/connectToDatabase");
const config = require("../util/config");

async function createTable(createQuery) {
  const connection = createConnection();
  try {
    await connection.query(createQuery);
    console.log("Created table");
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

// createTable(emailTemplatesTableQuery);
module.exports = createTable;
