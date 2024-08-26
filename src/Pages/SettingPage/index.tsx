import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'; // Updated CSS file name to match the component
import axios from 'axios';
import { useAuth } from '../../AuthContext';

const SettingPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState(user?.photo || "");
  const [country, setCountry] = useState(user?.country || "");
  const [bio, setBio] = useState(user?.bio || "");
console.log(user)
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhotoPreview(user.photo || "");
      setCountry(user.country || "");
      setBio(user.bio || "");
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
  
    const updatedUser = {
      id: user.id,
      firstName,
      lastName,
      email: user.email,
      country,
      bio,
    };
  
    try {
      let photoUrl = photoPreview;
  
      if (photo) {
        const formData = new FormData();
        formData.append('photo', photo);
  
        const uploadResponse = await axios.post('http://localhost:5000/api/upload-photo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        photoUrl = uploadResponse.data.photoUrl; // Assuming this returns something like '/uploads/filename.ext'
      }
  
      // Update the user's profile with the photo URL
      const response = await axios.patch('http://localhost:5000/api/auth/update-profile', { ...updatedUser, photo: photoUrl }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
  
      updateUser(response.data);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };
  
  

  return (
    <div className="settings-page">
      <ToastContainer />
      <div className="settings-container">
        <h1 className="settings-title">Profile Settings</h1>
        <div className="settings-form">
          <h2 className="settings-section-title">Personal Information</h2>
          <p className="settings-section-description">Update your personal details below.</p>
          
          <div className="settings-field">
            <label className="settings-label">Name</label>
            <div className="settings-input-group">
              <input 
                type="text" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                className="settings-input" 
                placeholder="First Name"
              />
              <input 
                type="text" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                className="settings-input" 
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="settings-field">
            <label className="settings-label">Email Address</label>
            <input 
              type="email" 
              value={email} 
              readOnly 
              className="settings-input" 
            />
          </div>

          <div className="settings-field">
            <label className="settings-label">Profile Photo</label>
            <div className="settings-photo-upload">
              {photoPreview && <img src={`http://localhost:5000/${user?.photo}`} alt="Profile" className="settings-photo-preview" />}
              <input 
                type="file" 
                className="settings-file-input" 
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setPhoto(e.target.files[0]);
                    setPhotoPreview(URL.createObjectURL(e.target.files[0]));
                  }
                }} 
              />
            </div>
          </div>

          <div className="settings-field">
            <label className="settings-label">Country</label>
            <select 
              value={country} 
              onChange={(e) => setCountry(e.target.value)} 
              className="settings-select"
            >
              <option value="Tunisia">Tunisia</option>
              <option value="Algeria">Algeria</option>
              {/* Add more countries as needed */}
            </select>
          </div>

          <div className="settings-field">
            <label className="settings-label">Bio</label>
            <textarea 
              value={bio} 
              onChange={(e) => setBio(e.target.value)} 
              className="settings-textarea"
              maxLength={275}
              placeholder="Tell us about yourself"
            />
            <p className="settings-char-count">{275 - (bio ? bio.length : 0)} characters left</p>
          </div>

          <button 
            className="settings-save-button" 
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
