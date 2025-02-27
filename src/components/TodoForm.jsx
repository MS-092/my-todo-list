import React, { useState } from 'react'

export const TodoForm = ({ addToDo }) => {
    const [value, setValue] = useState("")
    const [priority, setPriority] = useState("medium")

    const handleSubmit = e => {
        e.preventDefault();
        addToDo(value, priority);
        setValue("");
    }

    return (
        <form className="TodoForm" onSubmit={handleSubmit}>
            <input
                type="text"
                className="todo-input"
                value={value}
                placeholder="Enter task"
                onChange={(e) => setValue(e.target.value)}
            />
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
    )
}