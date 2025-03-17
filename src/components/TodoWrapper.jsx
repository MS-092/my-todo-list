import React, { useState, useEffect } from 'react';
import { Todo } from './Todo';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { TaskModal } from './TaskModal';
import NavBar from './NavBar';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';

export const TodoWrapper = () => {
  const [toDos, setToDos] = useState([]);
  const [showCompleted, setShowCompleted] = useState('active'); // Change to string: 'all', 'active', 'completed'
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      return};

    const userRef = doc(db, 'users', currentUser.uid);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        setToDos(doc.data().todos || []);
      }
    });

    return () => unsubscribe();
  }, [currentUser]);

  const updateFirestore = async (newTodos) => {
    if (!currentUser) {
      return
    };
    const userRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userRef, { todos: newTodos });
  };

  const addToDo = async (title, priority, description = '') => {
    const newTodos = [...toDos, {
      id: uuidv4(),
      task: title,
      description: description,
      priority: priority,
      completed: false,
      isEditing: false,
      date: new Date().toISOString()
    }];
    await updateFirestore(newTodos);
  };

  const toggleComplete = async (id) => {
    const newTodos = toDos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    await updateFirestore(newTodos);
  };

  const deleteToDo = async (id) => {
    const newTodos = toDos.filter(todo => todo.id !== id);
    await updateFirestore(newTodos);
  };

  const openTaskModal = (task) => {
    setSelectedTask(task);
  };

  const saveTaskChanges = async (updatedTask) => {
    const newTodos = toDos.map(todo => 
      todo.id === updatedTask.id ? updatedTask : todo
    );
    await updateFirestore(newTodos);
    setSelectedTask(null);
  };

  const getFilteredTasks = () => {
    let filtered = [...toDos];

    // First filter by completion status
    if (showCompleted === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    } else if (showCompleted === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }

    // Then filter by priority
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(todo => todo.priority === priorityFilter);
    }

    return filtered;
  };

  return (
    <div>
      <NavBar />
      <div className="TodoWrapper">
        <h2>Welcome, {currentUser?.displayName || 'User'}!</h2>
        
        <div className="filters-container">
          <select 
            value={showCompleted}
            onChange={(e) => setShowCompleted(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Tasks</option>
            <option value="active">Active Tasks</option>
            <option value="completed">Completed Tasks</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <TodoForm addToDo={addToDo} />
        
        {getFilteredTasks().map((todo) => (
          <Todo
            key={todo.id}
            task={todo}
            toggleComplete={toggleComplete}
            deleteToDo={deleteToDo}
            openTaskModal={openTaskModal}
          />
        ))}

        {selectedTask && (
          <TaskModal
            task={selectedTask}
            onSave={saveTaskChanges}
            onClose={() => setSelectedTask(null)}
          />
        )}
      </div>
    </div>
  );
};