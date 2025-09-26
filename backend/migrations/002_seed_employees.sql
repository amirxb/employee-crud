-- Clear table first to avoid duplicates
DELETE FROM employee;

-- Insert seed data
INSERT INTO employee (firstname, lastname, dept, title, birthdate, salary, email)
VALUES
('Alice','Smith','Sales','Mrs','1990-05-01',45000.00,'alice.smith@example.com'),
('Bob','Jones','Engineering','Mr','1985-03-12',65000.00,'bob.jones@example.com');
