const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()

const mysql = require('mysql2')

// Create the connection to the database
const connection = mysql.createConnection(process.env.DATABASE_URL)


// Create a table
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS my_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT
  )
`;

connection.query(createTableQuery, (err, results) => {
  if (err) {
    console.error('Error creating table:', err);
  } else {
    console.log('Table created successfully');

    // Insert data into the table
    const insertDataQuery = `
      INSERT INTO my_table (name, age) VALUES
      ('John Doe', 25),
      ('Jane Doe', 30)
    `;

    connection.query(insertDataQuery, (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
      } else {
        console.log('Data inserted successfully');
      }

      // Close the connection
      connection.end();
    });
  }
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');

  // Select all rows from the table
  const selectAllQuery = 'SELECT * FROM my_table';

  connection.query(selectAllQuery, (err, results) => {
    if (err) {
      console.error('Error selecting data:', err);
    } else {
      console.log('Selected data:', results);
    }

    // Close the connection
    connection.end();
  });
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})