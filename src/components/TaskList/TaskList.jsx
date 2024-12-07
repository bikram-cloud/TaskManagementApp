import React from 'react';
import './TaskList.css';

const TaskList = ({ tasks, deleteTask, toggleTaskCompletion }) => {
  return (
    <ul className="task-list">
      {tasks.map(task => {
        return (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleTaskCompletion(task.id)}>
              {task.text}
            </span>
            {!task.completed && (
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;
