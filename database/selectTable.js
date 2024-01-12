const createConnection = require("../scripts/connectToDatabase");
const { ENV } = require("../util/config");

async function selectTable(table) {
  console.log("🚀 ~ selectTable ~ table:", table)
  const connection = createConnection();
  try {
    const select = `SELECT * FROM ??`;
    const [rows, fields] = await connection.query(select, [table]);
    console.log("🚀 ~ file: selectTable.js:8 ~ selectTable ~ rows:", rows);
    console.log("🚀 ~ file: selectTable.js:8 ~ selectTable ~ fields:", fields);
    return rows;
  } catch (error) {
    console.error("Error executing select query:", error);
    throw error; // Re-throw the error to propagate it to the caller
  }
}

// selectTable(ENV.database.emailTemplates);
module.exports = selectTable;
