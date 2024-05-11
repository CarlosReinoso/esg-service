-- UAT: dev_customers
CREATE TABLE IF NOT EXISTS customers (
  id VARCHAR(255) NOT NULL,
  account_number VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  created_at TIMESTAMP
);
