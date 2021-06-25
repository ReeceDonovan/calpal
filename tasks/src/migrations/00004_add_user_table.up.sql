CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY,
  email VARCHAR NOT NULL
);
ALTER TABLE
  tasks RENAME COLUMN userid TO user_id;
ALTER TABLE
  tasks
ADD
  CONSTRAINT constraint_user_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;