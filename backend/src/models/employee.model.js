const db = require('./db');

const FIELDS = [
  'id', 'firstname', 'lastname', 'dept', 'title', 'birthdate', 'salary', 'email'
];

exports.findAll = async () => {
  const { rows } = await db.query(`SELECT ${FIELDS.join(', ')} FROM employee ORDER BY id`);
  return rows;
};

exports.findById = async (id) => {
  const { rows } = await db.query(`SELECT ${FIELDS.join(', ')} FROM employee WHERE id = $1`, [id]);
  return rows[0];
};

exports.create = async (payload) => {
  const q = `INSERT INTO employee (firstname, lastname, dept, title, birthdate, salary, email)
            VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING ${FIELDS.join(', ')}`;
  const params = [
    payload.firstname,
    payload.lastname,
    payload.dept,
    payload.title,
    payload.birthDate,
    payload.salary,
    payload.email
  ];
  const { rows } = await db.query(q, params);
  return rows[0];
};

exports.update = async (id, payload) => {
  const q = `UPDATE employee SET
    firstname = $1,
    lastname = $2,
    dept = $3,
    title = $4,
    birthdate = $5,
    salary = $6,
    email = $7
    WHERE id = $8 RETURNING ${FIELDS.join(', ')}`;
  const params = [
    payload.firstname,
    payload.lastname,
    payload.dept,
    payload.title,
    payload.birthDate,
    payload.salary,
    payload.email,
    id
  ];
  const { rows } = await db.query(q, params);
  return rows[0];
};

exports.remove = async (id) => {
  const { rows } = await db.query('DELETE FROM employee WHERE id=$1 RETURNING id', [id]);
  return rows.length ? true : false;
};

exports.removeAll = async () => {
  await db.query('DELETE FROM employee');
};