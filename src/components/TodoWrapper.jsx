import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Todo } from './Todo.jsx';
import { TodoForm } from './TodoForm.jsx';
import { v4 as uuidv4 } from 'uuid';
import { EditTodoForm } from './EditTodoForm.jsx';
import { TaskModal } from './TaskModal.jsx';

uuidv4();

export const TodoWrapper = () => {
    const [toDos, setToDos] = useState([])
    const [showCompleted, setShowCompleted] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const navigate = useNavigate();

    const addToDo = (toDo, priority) => {
        setToDos([...toDos, {
            id: uuidv4(),
            task: toDo,
            priority: priority,
            completed: false,
            isEditing: false,
            date: null
        }]);
    }

    const toggleComplete = id => {
        setToDos(toDos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    }

    const deleteToDo = id => {
        setToDos(toDos.filter(todo => todo.id !== id))
    }

    const editToDo = id => {
        setToDos(toDos.map((todo) => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
    }

    const editTask = (value, id) => {
        setToDos(toDos.map(todo => todo.id === id ? { ...todo, task: value, isEditing: !todo.isEditing } : todo));
    }

    const toggleCompletedFilter = () => {
        setShowCompleted(!showCompleted);
    };

    const filteredTasks = showCompleted
        ? toDos.filter((todo) => todo.completed)
        : toDos.filter((todo) => !todo.completed);

    const handleToggle = (todoId) => {
        setToDos((prevToDos) =>
            prevToDos.map((todo) =>
                todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const showProfile = () => {
        navigate('/profile')
    }

    const openTask = (id) => {
        const task = toDos.find(todo => todo.id === id);
        setSelectedTask(task);
    }

    const closeTask = () => {
        setSelectedTask(null);
    }

    const updateTask = (id, updatedTask) => {
        setToDos(toDos.map(todo => todo.id === id ? updatedTask : todo));
        closeTask();
    }

    return (
        <div className="TodoWrapper">
            <button onClick={toggleCompletedFilter}>
                {showCompleted ? 'Show Tasks' : 'Show Completed'}
            </button>

            <TodoForm addToDo={addToDo} />
            {filteredTasks.map((todo) => (
                todo.isEditing ? (
                    <EditTodoForm
                        editToDo={editTask}
                        task={todo}
                    />
                ) : (
                    <Todo
                        task={todo}
                        toggleComplete={toggleComplete}
                        deleteToDo={deleteToDo}
                        editToDo={editToDo}
                        onToggle={handleToggle}
                        openTask={openTask}
                    />
                )
            ))}
            {selectedTask && (
                <TaskModal
                    task={selectedTask}
                    closeTask={closeTask}
                    updateTask={updateTask}
                />
            )}
        </div>
    )
}