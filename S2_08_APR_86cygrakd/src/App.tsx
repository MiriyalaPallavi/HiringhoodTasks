// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TaskDetails from './pages/TaskDetails';
import TaskFormPage from './pages/TaskFormPage';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/task/:id" element={<TaskDetails />} />
      <Route path="/add" element={<TaskFormPage />} />
      <Route path="/edit/:id" element={<TaskFormPage />} />
    </Routes>
  </Router>
);

export default App;