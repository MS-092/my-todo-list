import React, { useState } from 'react'

export const TaskModal = ({ task, closeTask, updateTask }) => {
    const [priority, setPriority] = useState(task.priority);

    const handleUpdateTask = () => {
        updateTask(task.id, { ...task, priority });
    };

    return (
        <div className="TaskModal">
            <div className="modal-content">
                <h2>{task.task}</h2>
                <select
                    className="priority-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="urgent">Urgent</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                <button onClick={handleUpdateTask} className="update-btn">Update Task</button>
                <button onClick={closeTask} className="close-btn">Close</button>
            </div>
        </div>
    )
}