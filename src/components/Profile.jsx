
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import NavBar from './NavBar';
import './Profile.css';

const Profile = () => {
  const { currentUser, updateUserProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(currentUser?.photoURL || null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let photoURL = currentUser?.photoURL;

      if (photo) {
        // Create a unique filename using timestamp
        const timestamp = Date.now();
        const fileExtension = photo.name.split('.').pop();
        const filename = `${currentUser.uid}_${timestamp}.${fileExtension}`;
        
        // Create storage reference with the unique filename
        const storageRef = ref(storage, `profilePictures/${filename}`);
        
        // Upload the file with metadata
        const metadata = {
          contentType: photo.type,
          customMetadata: {
            'userId': currentUser.uid,
            'uploadedAt': new Date().toISOString()
          }
        };

        // Upload the file
        const uploadResult = await uploadBytes(storageRef, photo, metadata);
        
        // Get the download URL
        photoURL = await getDownloadURL(uploadResult.ref);
      }

      // Update profile with new data
      const updateData = {
        displayName: displayName || currentUser.displayName
      };

      if (photoURL) {
        updateData.photoURL = photoURL;
      }

      await updateUserProfile(updateData);
      setSuccess('Profile updated successfully!');
    } catch (error) {
      console.error('Profile update error:', error);
      setError(
        error.code === 'storage/retry-limit-exceeded'
          ? 'Failed to upload image. Please try with a smaller image or check your internet connection.'
          : `Failed to update profile: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setError('Image size should be less than 2MB');
        return;
      }

      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      setError('Failed to log out: ' + error.message);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="profile-container">
        <h2>Profile</h2>
        
        <div 
          className="profile-picture-container" 
          onClick={handlePhotoClick}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handlePhotoClick();
            }
          }}
        >
          <img 
            src={photoPreview || currentUser?.photoURL || 'https://via.placeholder.com/150'} 
            alt="Profile" 
            className="profile-picture"
          />
          <div className="profile-picture-overlay">
            <span>Change Photo</span>
          </div>
        </div>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handlePhotoChange}
          accept="image/*"
          style={{ display: 'none' }}
          aria-label="Upload profile picture"
        />
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="displayName">Display Name</label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="form-control"
            />
          </div>
          
          <button 
            type="submit" 
            className="update-button"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
        
        <button 
          onClick={handleLogout} 
          className="logout-button"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;