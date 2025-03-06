import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaList, FaUser } from 'react-icons/fa';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="nav-bar">
      <button onClick={() => handleNavigation('/')} className="nav-button">
        <FaHome />
        <span className="tooltip">Landing Home Page</span>
      </button>
      <button onClick={() => handleNavigation('/todo')} className="nav-button">
        <FaList />
        <span className="tooltip">ToDo List Page</span>
      </button>
      <button onClick={() => handleNavigation('/profile')} className="nav-button">
        <FaUser />
        <span className="tooltip">Profile Page</span>
      </button>
    </div>
  );
};

export default NavBar;