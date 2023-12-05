const connection = require("../scripts/connectToDatabase");

async function selectTable(table) {
  try {
    const select = `SELECT * FROM ??`;
    const [rows, fields] = await connection.query(select, [table]);
    console.log("🚀 ~ file: selectTable.js:8 ~ selectTable ~ fields:", fields)
    console.log("🚀 ~ file: selectTable.js:8 ~ selectTable ~ rows:", rows)
    return rows;
  } catch (error) {
    console.error("Error executing select query:", error);
    throw error; // Re-throw the error to propagate it to the caller
  }
}

module.exports = selectTable;
