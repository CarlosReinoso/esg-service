async function closeConnection(connection) {
  try {
    if (connection) {
      await connection.end();
      console.log("MySQL connection closed.");
    } else {
      console.log("Connection is undefined; cannot close.");
    }
  } catch (error) {
    console.error("Error closing MySQL connection:", error);
  }
}

module.exports = closeConnection;
