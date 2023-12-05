const connection = require("../scripts/connectToDatabase");

async function deleteTable(table) {
  try {
    const query = `DROP TABLE IF EXISTS ??`;
    await connection.query(query, [table]);
    console.log(`Table ${table} dropped successfully.`);
  } catch (error) {
    console.error("Error executing drop table query:", error);
    throw error; // Re-throw the error to propagate it to the caller
  }
}

module.exports = deleteTable;
