// // src/pages/TaskDetails.tsx
// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../redux/store';
// import { deleteTask } from '../redux/tasksSlice';

// const TaskDetails: React.FC = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const task = useSelector((state: RootState) => state.tasks.tasks.find(t => t.id === id));

//   if (!task) return <p>Task not found</p>;

//   const handleDelete = () => {
//     if (window.confirm('Are you sure you want to delete this task?')) {
//       dispatch(deleteTask(task.id));
//       navigate('/');
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-2">{task.title}</h1>
//       <p>Description: {task.description}</p>
//       <p>Due Date: {task.dueDate}</p>
//       <p>Priority: {task.priority}</p>
//       <p>Status: {task.status}</p>
//       <p>Tags: {task.tags?.join(', ')}</p>
//       <div className="flex gap-4 mt-4">
//         <button onClick={() => navigate(`/edit/${task.id}`)} className="bg-yellow-500 text-white p-2 rounded">Edit</button>
//         <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">Delete</button>
//       </div>
//     </div>
//   );
// };

// export default TaskDetails; 

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { deleteTask } from '../redux/tasksSlice';

import '../styles/TaskDetails.css';

const TaskDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const task = useSelector((state: RootState) => state.tasks.tasks.find(t => t.id === id));

  if (!task) return <p className="not-found">Task not found</p>;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
      navigate('/');
    }
  };

  return (
    <div className="details-container">
      <h1 className="details-title">{task.title}</h1>
      <div className="details-info">
        <p><strong>Description:</strong> {task.description || 'N/A'}</p>
        <p><strong>Due Date:</strong> {task.dueDate}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Tags:</strong> {task.tags?.join(', ') || 'None'}</p>
      </div>
      <div className="details-actions">
        <button onClick={() => navigate(`/edit/${task.id}`)} className="btn btn-warning">Edit</button>
        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
};

export default TaskDetails;
