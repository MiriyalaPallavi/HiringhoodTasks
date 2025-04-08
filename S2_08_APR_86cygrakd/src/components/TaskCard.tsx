// src/components/TaskCard.tsx
import React from 'react';
import { Task } from '../types/task';
import { Link } from 'react-router-dom';

import '../styles/TaskCard.css';

interface Props {
  task: Task;
}

const TaskCard: React.FC<Props> = ({ task }) => (
  <div className="task-card border p-4 rounded shadow">
    <h3 className="font-bold text-lg">{task.title}</h3>
    <p>Status: {task.status}</p>
    <p>Priority: {task.priority}</p>
    <p>Due: {task.dueDate}</p>
    <Link to={`/task/${task.id}`} className="text-blue-500 underline mt-2 inline-block">View Details</Link>
  </div>
);

export default TaskCard; 
