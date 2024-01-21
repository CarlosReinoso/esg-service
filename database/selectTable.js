const createConnection = require("../scripts/connectToDatabase");
const { ENV } = require("../util/config");

async function selectTable(table) {
  const connection = createConnection();
  try {
    const select = `SELECT * FROM ??`;
    const [rows] = await connection.query(select, [table]);
    console.log("🚀 ~ file: selectTable.js:8 ~ selectTable ~ rows:", rows);
    return rows;
  } catch (error) {
    console.error("Error executing select query:", error);
    throw error; // Re-throw the error to propagate it to the caller
  }
}

// selectTable(ENV.database.usersCoupons);
module.exports = selectTable;
