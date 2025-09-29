import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, deleteEmployee } from '../store/employees/employeesActions';
import { useNavigate } from 'react-router-dom';
import './EmployeeList.css';

function IconButton({ title, onClick, children, className = '' }) {
  return (
    <button
      type="button"
      className={`icon-btn ${className}`}
      onClick={onClick}
      aria-label={title}
      title={title}
    >
      {children}
    </button>
  );
}

/* Inline SVG icons so there are no external dependencies */
function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="currentColor" d="M11 11V5a1 1 0 112 0v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H5a1 1 0 110-2h6z" />
    </svg>
  );
}
function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="currentColor" d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z" />
    </svg>
  );
}
function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="currentColor" d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </svg>
  );
}

export default function EmployeeList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading, error } = useSelector((s) => s.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleAdd = () => navigate('/create');

  const handleView = (id) => navigate(`/view/${id}`);

  const handleEdit = (id) => navigate(`/edit/${id}`);

  const handleDelete = async (id) => {
    // small confirm to prevent accidental deletes
    const ok = window.confirm('Delete this employee? This action cannot be undone.');
    if (!ok) return;
    try {
      await dispatch(deleteEmployee(id));
    } catch (e) {
      // deleteEmployee sets error in store; show fallback alert
      alert(e.message || 'Failed to delete employee');
    }
  };

  return (
    <div className="emp-wrap">
      <header className="emp-header">
        <h2>Employees</h2>
        <div className="emp-actions">
          <IconButton title="Add new employee" onClick={handleAdd} className="add">
            <PlusIcon />
          </IconButton>
          <button
            type="button"
            className="refresh-btn"
            onClick={() => dispatch(fetchEmployees())}
            title="Refresh list"
          >
            ↻
          </button>
        </div>
      </header>

      {loading && <p className="emp-note">Loading…</p>}
      {error && <div className="emp-error">Error: {error}</div>}

      {!loading && list.length === 0 && <p className="emp-note">No employees yet. Add one using the + button.</p>}

      {list.length > 0 && (
        <div className="table-wrap">
          <table className="emp-table" role="table" aria-label="Employee list">
            <thead>
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Department</th>
                <th className="actions-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((e) => (
                <tr key={e.id}>
                  <td data-label="Id">{e.id}</td>
                  <td data-label="First Name">{e.firstname}</td>
                  <td data-label="Last Name">{e.lastname}</td>
                  <td data-label="Department">{e.dept}</td>
                  <td className="actions-col">
                    <IconButton title="View" onClick={() => handleView(e.id)} className="view">
                      <EyeIcon />
                    </IconButton>
                    <IconButton title="Edit" onClick={() => handleEdit(e.id)} className="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton title="Delete" onClick={() => handleDelete(e.id)} className="delete">
                      <TrashIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
