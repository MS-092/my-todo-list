import React, { useState } from 'react';

export const TodoForm = ({ addToDo }) => {
    const [value, setValue] = useState("");
    const [priority, setPriority] = useState("medium");
    const [error, setError] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (value.trim() === "") {
            setError("Task cannot be empty");
            return;
        }
        addToDo(value, priority);
        setValue("");
        setError("");
    };

    return (
        <form className="TodoForm" onSubmit={handleSubmit}>
            <input
                type="text"
                className="todo-input"
                value={value}
                placeholder="Enter task"
                onChange={(e) => setValue(e.target.value)}
            />
            {error && <p className="error-message">{error}</p>}
            <select
                className="priority-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="urgent">Urgent</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>
            <button type="submit" className="todo-btn">Add Task</button>
        </form>
    );
};