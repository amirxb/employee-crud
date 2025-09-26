import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from '../api/employeeApi';

export default function EmployeeView() {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.getById(id).then(setEmp).catch(e => setError(e.message || 'Error'));
  }, [id]);

  if (error) return <div style={{color:'red'}}>Error: {error}</div>;
  if (!emp) return <div>Loading...</div>;

  return (
    <div>
      <h2>Employee {emp.id}</h2>
      <dl>
        <dt>First name</dt><dd>{emp.firstname}</dd>
        <dt>Last name</dt><dd>{emp.lastname}</dd>
        <dt>Department</dt><dd>{emp.dept}</dd>
        <dt>Title</dt><dd>{emp.title}</dd>
        <dt>Birthdate</dt><dd>{emp.birthdate}</dd>
        <dt>Salary</dt><dd>{emp.salary}</dd>
        <dt>Email</dt><dd>{emp.email}</dd>
      </dl>
      <button onClick={() => navigate('/')}>Back</button>
    </div>
  );
}