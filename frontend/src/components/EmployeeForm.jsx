// frontend/src/components/EmployeeForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { validateEmployee } from '../util/validators';
import * as api from '../api/employeeApi';
import { useDispatch } from 'react-redux';
import { fetchEmployees } from '../store/employees/employeesActions';
import './EmployeeForm.css';

export default function EmployeeForm({ mode = 'create' }) {
  const { id } = useParams();
  const [model, setModel] = useState({
    firstname: '',
    lastname: '',
    dept: '',
    title: 'Mr',
    birthDate: '',
    salary: '',
    email: ''
  });
  const [errors, setErrors] = useState([]);
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (mode === 'edit' && id) {
      api.getById(id)
        .then((r) => {
          setModel({
            firstname: r.firstname,
            lastname: r.lastname,
            dept: r.dept,
            title: r.title,
            birthDate: r.birthdate || r.birthDate,
            salary: r.salary,
            email: r.email
          });
        })
        .catch((e) => setServerError(e.message || 'Error fetching employee'));
    }
  }, [mode, id]);

  const handleChange = (e) => {
    setModel({ ...model, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validateEmployee(model);
    if (v.length) { setErrors(v); return; }
    try {
      setServerError(null);
      if (mode === 'create') {
        await api.create(model);
      } else {
        await api.update(id, model);
      }
      dispatch(fetchEmployees());
      navigate('/');
    } catch (err) {
      if (err.details) setErrors(err.details);
      else setServerError(err.message || 'Server error');
    }
  };

  return (
    <div className="form-wrap">
      <div className="form-header">
        <h2>{mode === 'create' ? 'Create' : 'Edit'} Employee</h2>
      </div>

      {serverError && <div className="field-errors">{serverError}</div>}
      {errors.length > 0 && (
        <div className="field-errors">
          <ul style={{ margin: 0, paddingLeft: 16 }}>
            {errors.map((er, idx) => <li key={idx}>{er.field ? `${er.field}: ` : ''}{er.msg || er}</li>)}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-row">
            <label htmlFor="firstname">First name</label>
            <input id="firstname" name="firstname" value={model.firstname} onChange={handleChange} />
          </div>

          <div className="form-row">
            <label htmlFor="lastname">Last name</label>
            <input id="lastname" name="lastname" value={model.lastname} onChange={handleChange} />
          </div>

          <div className="form-row">
            <label htmlFor="dept">Dept</label>
            <input id="dept" name="dept" value={model.dept} onChange={handleChange} />
          </div>

          <div className="form-row">
            <label htmlFor="title">Title</label>
            <select id="title" name="title" value={model.title} onChange={handleChange}>
              <option>Mr</option><option>Miss</option><option>Mrs</option><option>Dr</option>
            </select>
          </div>

          <div className="form-row">
            <label htmlFor="birthDate">Birth Date</label>
            <input id="birthDate" type="date" name="birthDate" value={model.birthDate} onChange={handleChange} />
          </div>

          <div className="form-row">
            <label htmlFor="salary">Salary</label>
            <input id="salary" name="salary" type="number" step="0.01" value={model.salary} onChange={handleChange} />
          </div>

          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={model.email} onChange={handleChange} />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn ghost" onClick={() => navigate('/')}>Cancel</button>
          <button type="submit" className="btn primary">{mode === 'create' ? 'Create' : 'Save'}</button>
        </div>

        <div className="form-note">All fields are required. Birth date must be ISO (YYYY-MM-DD) and employee must be at least 18 years old.</div>
      </form>
    </div>
  );
}
