// frontend/src/components/EmployeeView.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from '../api/employeeApi';
import './EmployeeView.css';

export default function EmployeeView() {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.getById(id).then(setEmp).catch(e => setError(e.message || 'Error'));
  }, [id]);

  if (error) return <div className="view-wrap"><div className="field-errors">Error: {error}</div></div>;
  if (!emp) return <div className="view-wrap"><p className="form-note">Loading…</p></div>;

  return (
    <div className="view-wrap">
      <div className="view-header">
        <h2>Employee {emp.id}</h2>
        <div className="view-actions">
          <button className="btn ghost" onClick={() => navigate(`/edit/${emp.id}`)}>Edit</button>
          <button className="btn" onClick={() => navigate('/')}>Back</button>
        </div>
      </div>

      <div className="view-grid" role="list">
        <div>
          <dt>First name</dt>
          <dd>{emp.firstname}</dd>
        </div>
        <div>
          <dt>Last name</dt>
          <dd>{emp.lastname}</dd>
        </div>
        <div>
          <dt>Department</dt>
          <dd>{emp.dept}</dd>
        </div>
        <div>
          <dt>Title</dt>
          <dd>{emp.title}</dd>
        </div>
        <div>
          <dt>Birthdate</dt>
          <dd>{emp.birthdate || emp.birthDate}</dd>
        </div>
        <div>
          <dt>Salary</dt>
          <dd>{emp.salary}</dd>
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <dt>Email</dt>
          <dd>{emp.email}</dd>
        </div>
      </div>
    </div>
  );
}
