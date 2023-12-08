const { cronExecutionTableQuery } = require("../lib/queries/queries");
const createTable = require("./createTable");

async function cronExecutionTable() {
  try {
    await createTable(cronExecutionTableQuery);
  } catch (error) {
    console.error("Error:", error);
  }
}

// cronExecutionTable();
module.exports = cronExecutionTable;
