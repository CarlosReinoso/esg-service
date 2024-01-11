const connection = require("../scripts/connectToDatabase");
const { ENV } = require("../util/config");

async function selectTable(table) {
  try {
    const select = `SELECT * FROM ??`;
    const [rows, fields] = await connection(select, [table]);
    console.log("🚀 ~ file: selectTable.js:8 ~ selectTable ~ fields:", fields)
    console.log("🚀 ~ file: selectTable.js:8 ~ selectTable ~ rows:", rows)
    return rows;
  } catch (error) {
    console.error("Error executing select query:", error);
    throw error; // Re-throw the error to propagate it to the caller
  }
}

// selectTable(ENV.usersCoupons)
module.exports = selectTable;
