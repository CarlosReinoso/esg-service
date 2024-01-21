const query = require("../lib/queries/delete");
const { ENV } = require("../util/config");
const createConnection = require("../scripts/connectToDatabase");

async function clearTable(table) {
  const connection = createConnection();
  try {
    await connection.query(query.clearTable, [table]);
    console.log("cleared table");
  } catch (error) {
    console.error("Error creating table:", error);
  }
}
// clearTable(ENV.database.usersCoupons);
module.exports = clearTable;
