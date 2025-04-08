
// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import TaskCard from '../components/TaskCard';
// import FilterBar from '../components/FilterBar';
// import { Link } from 'react-router-dom';

// const Home: React.FC = () => {
//   const tasks = useSelector((state: RootState) => state.tasks.tasks);
//   const [status, setStatus] = useState('');
//   const [priority, setPriority] = useState('');

//   const filtered = tasks.filter(task =>
//     (status ? task.status === status : true) &&
//     (priority ? task.priority === priority : true)
//   );

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-xl font-bold">Task List</h1>
//         <Link to="/add" className="bg-green-500 text-white p-2 rounded">Add Task</Link>
//       </div>
//       <FilterBar status={status} setStatus={setStatus} priority={priority} setPriority={setPriority} />
//       <div className="grid gap-4">
//         {filtered.map(task => <TaskCard key={task.id} task={task} />)}
//       </div>
//     </div>
    
//   );
// };

// export default Home;


import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import TaskCard from '../components/TaskCard';
import FilterBar from '../components/FilterBar';
import { Link } from 'react-router-dom';
import '../styles/Home.css'; // import the CSS file

const Home: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');

  const filtered = tasks.filter(task =>
    (status ? task.status === status : true) &&
    (priority ? task.priority === priority : true)
  );

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">Task List</h1>
        <Link to="/add" className="add-task-btn">Add Task</Link>
      </div>

      <FilterBar
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
      />

      {filtered.length === 0 ? (
        <p className="no-tasks-text">No tasks match the selected filters.</p>
      ) : (
        <div className="task-grid">
          {filtered.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
