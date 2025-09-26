import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { validateEmployee } from '../util/validators';
import * as api from '../api/employeeApi';
import { useDispatch } from 'react-redux';
import { fetchEmployees } from '../store/employees/employeesActions';

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
      api.getById(id).then(r => {
        setModel({
          firstname: r.firstname,
          lastname: r.lastname,
          dept: r.dept,
          title: r.title,
          birthDate: r.birthdate || r.birthDate,
          salary: r.salary,
          email: r.email
        });
      }).catch(e => setServerError(e.message || 'Error fetching employee'));
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
      else setServerError(err.message);
    }
  };

  return (
    <div>
      <h2>{mode === 'create' ? 'Create' : 'Edit'} Employee</h2>
      {serverError && <div style={{color: 'red'}}>{serverError}</div>}
      {errors.length > 0 && (
        <ul style={{color:'red'}}>
          {errors.map((er, idx) => <li key={idx}>{er.field ? `${er.field}: `: ''}{er.msg || er}</li>)}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>First name</label>
          <input name="firstname" value={model.firstname} onChange={handleChange} />
        </div>
        <div>
          <label>Last name</label>
          <input name="lastname" value={model.lastname} onChange={handleChange} />
        </div>
        <div>
          <label>Dept</label>
          <input name="dept" value={model.dept} onChange={handleChange} />
        </div>
        <div>
          <label>Title</label>
          <select name="title" value={model.title} onChange={handleChange}>
            <option>Mr</option><option>Miss</option><option>Mrs</option><option>Dr</option>
          </select>
        </div>
        <div>
          <label>Birth Date</label>
          <input type="date" name="birthDate" value={model.birthDate} onChange={handleChange} />
        </div>
        <div>
          <label>Salary</label>
          <input name="salary" value={model.salary} onChange={handleChange} type="number" step="0.01"/>
        </div>
        <div>
          <label>Email</label>
          <input name="email" value={model.email} onChange={handleChange} />
        </div>
        <button type="submit">{mode === 'create' ? 'Create' : 'Save'}</button>
        <button type="button" onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  );
}