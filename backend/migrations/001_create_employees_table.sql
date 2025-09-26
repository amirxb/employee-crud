CREATE TABLE IF NOT EXISTS employees (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL CHECK (firstname ~ '^[A-Za-z]+$'),
  lastname VARCHAR(100) NOT NULL CHECK (lastname ~ '^[A-Za-z]+$'),
  dept VARCHAR(100) NOT NULL CHECK (dept ~ '^[A-Za-z]+$'),
  title VARCHAR(10) NOT NULL CHECK (title IN ('Mr','Miss','Mrs','Dr')),
  birth_date DATE NOT NULL CHECK (birth_date >= DATE '1900-01-01' AND birth_date <= (CURRENT_DATE - INTERVAL '18 years')),
  salary NUMERIC(12,2) NOT NULL CHECK (salary > 0),
  email VARCHAR(255) UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);
