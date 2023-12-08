const connection = require("../scripts/connectToDatabase");
const query = require("../lib/queries/delete");
const config = require("../util/config");

async function clearTable() {
  try {
    await connection.query(query.clearTable, [
      config.database.cronExecutionStatus,
    ]);
    console.log("cleared table");
  } catch (error) {
    console.error("Error creating table:", error);
  }
}
clearTable();
module.exports = clearTable;
