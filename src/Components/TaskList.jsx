// TaskList.jsx

import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://task-management-server-iif6gv4cm-roksana-barna.vercel.app/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const editTask = async (taskId, updatedTaskData) => {
    try {
      const response = await fetch(`https://task-management-server-iif6gv4cm-roksana-barna.vercel.app/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTaskData),
      });

      if (response.ok) {
        // Update tasks after successful edit
        fetchTasks();
        console.log('Task updated successfully');
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const toggleTaskStatus = async (taskId) => {
    // Implement toggle task status logic if needed
    // ...
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`https://task-management-server-iif6gv4cm-roksana-barna.vercel.app/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update tasks after successful deletion
        fetchTasks();
        console.log('Task deleted successfully');
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="mt-4">
      {tasks.map((task) => (
        <div key={task._id} className="mb-2 p-2 border rounded">
          <p>Task Name: {task.text}</p>
          <p>Description: {task.description}</p>
          <TaskItem
            task={task}
            editTask={editTask}
            toggleTaskStatus={toggleTaskStatus}
            deleteTask={deleteTask}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
