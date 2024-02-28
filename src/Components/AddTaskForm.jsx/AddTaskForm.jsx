import React, { useState } from "react";
import TaskForm from "../TaskForm";
import axios from "axios";

const AddTaskForm = ({ addTask }) => {
  const [newTask, setNewTask] = useState({
    text: "",
    priority: "low",
    completed: false,
    id: Date.now(),
  });

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://task-management-server-iif6gv4cm-roksana-barna.vercel.app/tasks", newTask);
      const addedTask = response.data;

      // Assuming your server responds with the added task
      addTask(addedTask);

      // Reset the form
      setNewTask({
        text: "",
        priority: "low",
        completed: false,
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <TaskForm
        task={newTask}
        onChange={handleChange}
        onSave={handleSubmit} // Adjust the onSave to use handleSubmit directly
        onCancel={() =>
          setNewTask({
            text: "",
            priority: "low",
            completed: false,
            id: Date.now(),
          })
        }
      />
    <div className="text-left">
    <button  type="submit" className="mt-2 bg-purple-400 font-serif text-white px-2 py-1 rounded">
        Add Task
      </button>
    </div>
    </form>
  );
};

export default AddTaskForm;