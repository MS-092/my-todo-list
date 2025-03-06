import React from 'react';
import './Profile.css';
import myImage from './hand.jpeg';
import NavBar from './NavBar';

const Profile = () => {
  return (
    <div>
      <NavBar />
      <div className="profile-container">
        <img src={myImage} alt="Profile" className="profile-picture" />
        <h2 className="profile-name">Matthew Staniswinata</h2>
        <p className="profile-bio">2702325962, L4AC</p>
      </div>
    </div>
  );
};

export default Profile;