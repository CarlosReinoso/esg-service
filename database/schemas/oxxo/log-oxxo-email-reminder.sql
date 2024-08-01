-- UAT: dev_oxxo_repayment_emails_log
CREATE TABLE IF NOT EXISTS oxxo_repayment_email_log (
  id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  emails_sent INT NOT NULL,
  PRIMARY KEY (id)
);

-- First, drop the existing id column constraint if any
ALTER TABLE public.oxxo_repayment_email_log
DROP CONSTRAINT IF EXISTS oxxo_repayment_email_log_pkey;

-- Alter the table to change the id column to a bigint type (auto-incrementing)
ALTER TABLE public.oxxo_repayment_email_log
ALTER COLUMN id SET DATA TYPE bigint USING id::bigint,
ALTER COLUMN id SET NOT NULL;

-- Set the id column as the primary key
ALTER TABLE public.oxxo_repayment_email_log
ADD PRIMARY KEY (id);

-- Set the id column to auto increment
CREATE SEQUENCE public.oxxo_repayment_email_log_id_seq;

ALTER TABLE public.oxxo_repayment_email_log
ALTER COLUMN id SET DEFAULT nextval('public.oxxo_repayment_email_log_id_seq');


