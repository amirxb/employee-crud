import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, deleteEmployee } from '../store/employees/employeesActions';
import { Link, useNavigate } from 'react-router-dom';

export default function EmployeeList() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector(s => s.employees);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <div>
      <h2>Employees</h2>
      <div>
        <button onClick={() => navigate('/create')}>Add Employee</button>
        <button onClick={() => dispatch(fetchEmployees())}>Refresh</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <div style={{color:'red'}}>Error: {error}</div>}

      {!loading && !list.length && <p>No employees. Add one.</p>}

      {list.length > 0 && (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Id</th><th>First Name</th><th>Last Name</th><th>Department</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map(e => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.firstname}</td>
                <td>{e.lastname}</td>
                <td>{e.dept}</td>
                <td>
                  <Link to={`/view/${e.id}`}>View</Link> {' | '}
                  <Link to={`/edit/${e.id}`}>Edit</Link> {' | '}
                  <button onClick={() => dispatch(deleteEmployee(e.id))}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}