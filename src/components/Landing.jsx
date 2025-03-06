import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="landing-container">
      <h1>Welcome to the ToDo App</h1>
      <div className="button-container">
        <button onClick={() => handleNavigation('/todo')} className="landing-button">Go to ToDo List</button>
        <button onClick={() => handleNavigation('/profile')} className="landing-button">Go to Profile Page</button>
      </div>
    </div>
  );
};

export default Landing;