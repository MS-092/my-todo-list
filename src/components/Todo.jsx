import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export const Todo = ({ task, toggleComplete, deleteToDo, editToDo, openTask }) => {
    const handleToggleComplete = (e) => {
        e.stopPropagation();
        toggleComplete(task.id);
    };

    const handleEditToDo = (e) => {
        e.stopPropagation();
        editToDo(task.id);
    };

    const handleDeleteToDo = (e) => {
        e.stopPropagation();
        deleteToDo(task.id);
    };

    return (
        <div className="Todo" key={task.id}>
            <p className={`${task.completed ? 'completed' : ""}`} onClick={() => openTask(task.id)}>
                {task.task} - <span className={`priority-${task.priority}`}>{task.priority}</span>
            </p>

            <div className="bg-gray-100 rounded-lg p-4 my-4 w-full max-w-xl shadow cursor-pointer">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={handleToggleComplete}
                />
                <span className="checkmark"></span>

                <FontAwesomeIcon
                    icon={faPenToSquare}
                    onClick={handleEditToDo}
                />

                <FontAwesomeIcon
                    icon={faTrash}
                    onClick={handleDeleteToDo}
                />
            </div>
        </div>
    );
};