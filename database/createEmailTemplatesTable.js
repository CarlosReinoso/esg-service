const {
  createUsersCouponsTableQuery,
  cronExecutionTableQuery,
} = require("../lib/queries/queries");
const createConnection = require("../scripts/connectToDatabase");
const { ENV } = require("../util/config");
const createTable = require("./createTable");

async function createEmailTemplatesTable(createQuery) {
  const connection = createConnection();
  try {
    await createTable(createUsersCouponsTableQuery);
    console.log("Created table");
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

module.exports = createEmailTemplatesTable;
