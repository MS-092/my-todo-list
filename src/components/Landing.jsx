import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  const goToTodoList = () => {
    navigate('/todo');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="landing-container">
      <h1>Welcome to the ToDo App</h1>
      <div className="button-container">
      <button onClick={goToTodoList} className="landing-button">Go to ToDo List</button>
      <button onClick={goToProfile} className="landing-button">Go to Profile Page</button>
      </div>
    </div>
  );
};

export default Landing;