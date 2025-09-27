const request = require('supertest');
const app = require('../src/app');
const db = require('../src/models/db');

beforeEach(async () => {
  await db.query('DELETE FROM employee');
});

afterAll(async () => {
  await db.pool.end();
});

describe('Employee CRUD API', () => {
  test('create → get → list → update → delete', async () => {
    // Create
    const createPayload = {
      firstname: 'Testy',
      lastname: 'McTester',
      dept: 'QA',
      title: 'Mr',
      birthDate: '1990-01-01',
      salary: 55000,
      email: 'testy@example.com',
    };
    const created = await request(app).post('/api/employee').send(createPayload);
    expect(created.status).toBe(201);
    expect(created.body).toHaveProperty('id');
    const id = created.body.id;

    // Get by id
    const got = await request(app).get(`/api/employee/${id}`);
    expect(got.status).toBe(200);
    expect(got.body.email).toBe('testy@example.com');

    // List
    const list = await request(app).get('/api/employee');
    expect(list.status).toBe(200);
    expect(Array.isArray(list.body)).toBe(true);
    expect(list.body.length).toBe(1);

    // Update
    const updatePayload = { ...createPayload, dept: 'Eng', salary: 60000 };
    const updated = await request(app).put(`/api/employee/${id}`).send(updatePayload);
    expect(updated.status).toBe(200);
    expect(updated.body.dept).toBe('Eng');
    expect(Number(updated.body.salary)).toBe(60000);

    // Delete
    const del = await request(app).delete(`/api/employee/${id}`);
    expect(del.status).toBe(200);

    // Verify empty
    const after = await request(app).get('/api/employee');
    expect(after.status).toBe(200);
    expect(after.body.length).toBe(0);
  });
});
