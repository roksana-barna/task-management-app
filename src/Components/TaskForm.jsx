
import React from "react";

const TaskForm = ({ task, onChange, onSave, onCancel }) => {
  return (
    <div>
      <div className="mb-2">
        <label htmlFor="text" className="block text-sm font-medium text-gray-600">
          Task Name:
        </label>
        <input
          type="text"
          name="text"
          value={task.text}
          onChange={onChange}
          placeholder="Task name"
          className="border p-1 w-full"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-600">
          Task Description:
        </label>
        <textarea
          name="description"
          value={task.description}
          onChange={onChange}
          placeholder="Task description"
          className="border p-1 w-full"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="priority" className="block text-sm font-medium text-gray-600">
          Priority:
        </label>
        <select
          name="priority"
          value={task.priority}
          onChange={onChange}
          className="border p-1 w-full"
        >
          <option className="font-serif" value="low">
            Low
          </option>
          <option className="font-serif" value="medium">
            Medium
          </option>
          <option className="font-serif" value="high">
            High
          </option>
        </select>
      </div>

    
    </div>
  );
};

export default TaskForm;
