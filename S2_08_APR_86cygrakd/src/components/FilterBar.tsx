 
// src/components/FilterBar.tsx
import React from 'react';

import '../styles/FilterBar.css';

interface Props {
  status: string;
  setStatus: (val: string) => void;
  priority: string;
  setPriority: (val: string) => void;
}

const FilterBar: React.FC<Props> = ({ status, setStatus, priority, setPriority }) => (
  <div className="flex gap-4 mb-4">
    <select value={status} onChange={e => setStatus(e.target.value)}>
      <option value="">All Statuses</option>
      <option value="To Do">To Do</option>
      <option value="In Progress">In Progress</option>
      <option value="Done">Done</option>
    </select>
    <select value={priority} onChange={e => setPriority(e.target.value)}>
      <option value="">All Priorities</option>
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>
  </div>
);

export default FilterBar;


