const fs = require("fs");
const csv = require("csv-parser");
const mysql = require("mysql2");

async function importScript() {
  console.log(
    "🚀 ~ file: importScripts.js:6 ~ importScript ~ importScript:",
    importScript
  );
  //   const connection = mysql.createConnection({
  //     host: 'localhost',
  //     user: 'your_user',
  //     password: 'your_password',
  //     database: 'your_database'
  //   });

  //   connection.connect();

  //   // Read the CSV file and insert values into the database
  //   const csvFilePath = 'path/to/your/file.csv';

  //   return new Promise((resolve, reject) => {
  //     fs.createReadStream(csvFilePath)
  //       .pipe(csv())
  //       .on('data', (row) => {
  //         const insertDataQuery = `
  //           INSERT INTO your_table (column1, column2, column3) VALUES
  //           (?, ?, ?)
  //         `;

  //         const values = [row.column1, row.column2, row.column3];

  //         connection.query(insertDataQuery, values, (err) => {
  //           if (err) {
  //             console.error('Error inserting row:', err);
  //             reject(err);
  //           }
  //         });
  //       })
  //       .on('end', () => {
  //         connection.end();
  //         resolve();
  //       })
  //       .on('error', (err) => {
  //         console.error('Error reading CSV file:', err);
  //         reject(err);
  //       });
  //   });
}

module.exports = importScript;
