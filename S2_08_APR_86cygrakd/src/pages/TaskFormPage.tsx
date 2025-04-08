// src/pages/TaskFormPage.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addTask, updateTask } from '../redux/tasksSlice';
import TaskForm from '../components/TaskForm';
import { Task } from '../types/task';

import '../styles/TaskFormPage.css';

const TaskFormPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const isEdit = Boolean(id);
  const task = tasks.find(t => t.id === id);

  const initialValues: Task = task || {
    id: '',
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    status: 'To Do',
    tags: [],
  };

  const handleSubmit = (values: Task) => {
    if (isEdit) {
      dispatch(updateTask(values));
    } else {
      dispatch(addTask(values));
    }
    navigate('/');
  };

  return (
    <div className="task-form-container">
      <h1>{isEdit ? 'Edit Task' : 'Add Task'}</h1>
      <TaskForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
};

export default TaskFormPage;
