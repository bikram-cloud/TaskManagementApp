import React, { useState } from 'react';
import './TaskForm.css';

const TaskForm = ({ addTask, handleKeyDown }) => {
  const [taskText, setTaskText] = useState('');

  const handleAddTask = () => {
    addTask(taskText);
    setTaskText('');
  };

  return (
    <div className="task-form">
      <input
        type="text"
        value={taskText}
        placeholder="input the task"
        onChange={e => setTaskText(e.target.value)}
        onKeyDown={e => handleKeyDown(e, taskText, setTaskText)}
      />
      <button onClick={handleAddTask}>Add</button>
    </div>
  );
};

export default TaskForm;
