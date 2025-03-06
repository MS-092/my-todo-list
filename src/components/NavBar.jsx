
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();

  const goToLanding = () => {
    navigate('/');
  };

  const goToTodoList = () => {
    navigate('/todo');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="nav-bar">
      <button onClick={goToLanding} className="nav-button">Landing Page</button>
      <button onClick={goToTodoList} className="nav-button">ToDo List</button>
      <button onClick={goToProfile} className="nav-button">Profile Page</button>
    </div>
  );
};

export default NavBar;