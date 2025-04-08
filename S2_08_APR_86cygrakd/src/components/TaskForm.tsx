// src/components/TaskForm.tsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Task } from '../types/task';

interface Props {
  initialValues: Task;
  onSubmit: (task: Task) => void;
}

const TaskForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    dueDate: Yup.date().min(new Date(), 'Due date must be in the future').required('Due date required'),
    priority: Yup.string().required('Priority is required'),
    status: Yup.string().required('Status is required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="flex flex-col gap-4">
        <label>Title</label>
        <Field name="title" className="border p-2" />
        <ErrorMessage name="title" component="div" className="text-red-500" />

        <label>Description</label>
        <Field name="description"  className="border p-2" />

        <label>Due Date</label>
        <Field name="dueDate" type="date" className="border p-2" />
        <ErrorMessage name="dueDate" component="div" className="text-red-500" />

        <label>Priority</label>
        <Field name="priority" as="select" className="border p-2">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </Field>

        <label>Status</label>
        <Field name="status" as="select" className="border p-2">
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </Field>

        <label>Tags</label>
        <Field name="tags" className="border p-2" placeholder="Comma-separated tags" />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
      </Form>
    </Formik>
  );
};

export default TaskForm;
