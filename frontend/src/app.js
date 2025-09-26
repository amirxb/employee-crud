import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import EmployeeView from './components/EmployeeView';

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <header>
        <h1>Employee Manager</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/create">Add</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/create" element={<EmployeeForm mode="create" />} />
          <Route path="/edit/:id" element={<EmployeeForm mode="edit" />} />
          <Route path="/view/:id" element={<EmployeeView />} />
        </Routes>
      </main>
    </div>
  );
}
