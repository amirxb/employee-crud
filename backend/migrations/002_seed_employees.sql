INSERT INTO employee (firstname, lastname, dept, title, birthdate, salary, email)
VALUES
('Alice','Smith','Sales','Ms'::text, '1990-05-01', 45000.00, 'alice.smith@example.com');

-- Note: 'Ms' is NOT allowed by server rules. Replace with Mr/Miss/Mrs/Dr; correct seed:
DELETE FROM employee;
INSERT INTO employee (firstname, lastname, dept, title, birthdate, salary, email)
VALUES
('Alice','Smith','Sales','Mrs', '1990-05-01', 45000.00, 'alice.smith@example.com'),
('Bob','Jones','Engineering','Mr', '1985-03-12', 65000.00, 'bob.jones@example.com');