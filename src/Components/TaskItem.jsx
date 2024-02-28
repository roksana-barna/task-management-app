import React, { useState } from "react";

const TaskItem = ({ task, editTask, toggleTaskStatus, deleteTask }) => {
  const [editing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    editTask(task.id, editedTask);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditedTask({ ...task });
    setEditing(false);
  };

  return (
    <div className="mb-2 p-2 border rounded flex items-center justify-between bg-lime-200">
      {editing ? (
        <>
          <input
            type="text"
            value={editedTask.text}
            onChange={(e) => setEditedTask({ ...editedTask, text: e.target.value })}
            className="border p-1 mr-2"
          />
          <input
            type="text"
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            className="border p-1 mr-2"
          />
          <button onClick={handleSave} className="mr-2 bg-blue-500 text-white px-2 py-1 rounded">
            Save
          </button>
          <button onClick={handleCancel} className="bg-gray-500 text-white px-2 py-1 rounded">
            Cancel
          </button>
        </>
      ) : (
        <>
          <div className="flex">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskStatus(task.id)}
              className="mr-2"
            />
            <p className="font-serif">Status: {task.completed ? "Completed" : "Incomplete"}</p>
          </div>
          <div>
            <p className="font-serif">Priority: {task.priority}</p>
            <button className="mr-2 text-blue-500 font-serif" onClick={handleEdit}>
              Edit
            </button>
            <button className="text-red-500 font-serif" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
