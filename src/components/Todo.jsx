import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export const Todo = ({ task, toggleComplete, deleteToDo, openTaskModal }) => {
  return (
    <div className="Todo">
      <div className="todo-content" onClick={() => openTaskModal(task)}>
        <p className={`${task.completed ? 'completed' : ""}`}>
          {task.task}
          <span className={`priority-${task.priority}`}> - {task.priority}</span>
        </p>
        {/* {task.description && (
          <p className="todo-description">{task.description}</p>
        )} */}
      </div>

      <div className="todo-actions">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => {
            e.stopPropagation();
            toggleComplete(task.id);
          }}
        />
        
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={(e) => {
            e.stopPropagation();
            openTaskModal(task);
          }}
        />

        <FontAwesomeIcon
          icon={faTrash}
          onClick={(e) => {
            e.stopPropagation();
            deleteToDo(task.id);
          }}
        />
      </div>
    </div>
  );
};