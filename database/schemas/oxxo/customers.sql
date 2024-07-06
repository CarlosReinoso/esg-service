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

-- UAT: dev_oxxo_repayment_emails_log
CREATE TABLE IF NOT EXISTS oxxo_repayment_email_log (
  id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  emails_sent INT NOT NULL,
  PRIMARY KEY (id)
);

