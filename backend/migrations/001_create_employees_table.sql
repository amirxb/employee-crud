CREATE TABLE IF NOT EXISTS employee (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  dept VARCHAR(100) NOT NULL,
  title VARCHAR(10) NOT NULL CHECK (title IN ('Mr','Miss','Mrs','Dr')),
  birthdate DATE NOT NULL CHECK (birthdate >= DATE '1900-01-01' AND birthdate <= (CURRENT_DATE - INTERVAL '18 years')),
  salary NUMERIC(12,2) NOT NULL CHECK (salary > 0),
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add basic alphabetic checks for firstname/lastname/dept using regex
ALTER TABLE employee ADD CONSTRAINT firstname_alpha CHECK (firstname ~ '^[A-Za-z]+$');
ALTER TABLE employee ADD CONSTRAINT lastname_alpha CHECK (lastname ~ '^[A-Za-z]+$');
ALTER TABLE employee ADD CONSTRAINT dept_alpha CHECK (dept ~ '^[A-Za-z]+$');