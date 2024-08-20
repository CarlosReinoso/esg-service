
CREATE TABLE IF NOT EXISTS supabase_alive (
  id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- Alter the table to change the id column to a bigint type (auto-incrementing)
ALTER TABLE public.supabase_alive
ALTER COLUMN id SET DATA TYPE bigint USING id::bigint,
ALTER COLUMN id SET NOT NULL;

-- Set the id column as the primary key
ALTER TABLE public.supabase_alive
ADD PRIMARY KEY (id);

-- Set the id column to auto increment
CREATE SEQUENCE public.supabase_alive_id_seq;

ALTER TABLE public.supabase_alive
ALTER COLUMN id SET DEFAULT nextval('public.supabase_alive_id_seq');




