CREATE TABLE form_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  phone VARCHAR(255),
  from_location VARCHAR(255),
  to_location VARCHAR(255),
  email VARCHAR(255),
  description TEXT
);