import React, { useEffect, useState } from 'react';
import AddTaskForm from '../../Components/AddTaskForm.jsx/AddTaskForm';
import TaskList from '../../Components/TaskList';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks((prevTasks) => [...prevTasks, ...storedTasks]);

    // setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const editTask = (taskId, updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
  };

  const toggleTaskStatus = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.priority === filter;
  });

  const completedTasksCount = tasks.filter((task) => task.completed).length;

  return (
    <div className='md-flex'>

    <div className="max-w-5xl mx-auto mt-8 p-4">
     
      <h1 className="text-2xl font-bold mb-4 lg:text-center font-serif bg-purple-200">Task List</h1>
     

     <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
     <div>
     <AddTaskForm addTask={addTask} />
     </div>
      <div>
      <div className="mt-4 text-right">
        <label className="mr-2 lg:ml-48 mt-5 ">Filter by Priority:</label>
        <select
          className="border p-1"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <TaskList
        tasks={filteredTasks}
        editTask={editTask}
        toggleTaskStatus={toggleTaskStatus}
        deleteTask={deleteTask}
      />

     <p className="mt-2 text-right">
        Total Tasks: {tasks.length} | Completed Tasks: {completedTasksCount}
      </p>
      </div>
     </div>
    </div>
    </div> 
  );
};



export default Home;