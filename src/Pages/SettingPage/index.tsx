import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const SettingPage: React.FC = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("No token found");
      navigate('/login');
      return;
    }

    axios.get('http://localhost:5000/api/user', {
      headers: {
        'Authorization': token
      }
    }).then(response => {
      const user = response.data;
      setEmail(user.email || "");
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPhoto(user.photo || "");
      setCountry(user.country || "");
      setBio(user.bio || "");
    }).catch(error => {
      toast.error("Failed to load user data");
      console.error(error);
    });
  }, [navigate]);

  const handleSave = async () => {
    const userProfile = {
      FirstName: firstName,
      LastName: lastName,
      email,
      photo,
      country,
      bio
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("No token found");
        return;
      }

      const response = await axios.put('http://localhost:5000/api/user', userProfile, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });

      if (response.status === 200) {
        toast.success("Profile saved successfully");
      } else {
        toast.error("Failed to save profile");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error saving profile:", error.response ? error.response.data : error.message);
      } else if (error instanceof Error) {
        console.error("Error saving profile:", error.message);
      } else {
        console.error("Error saving profile:", error);
      }
      toast.error("Error saving profile");
    }
  };

  return (
    <div className="page">
      <ToastContainer />
      <div className="settings-container">
        <h1 className="settings-title">Settings</h1>
        <div className="settings-form">
          <h2 className="settings-section-title">Personal info</h2>
          <p className="settings-section-description">
            Update your personal details here.
          </p>
          <div className="settings-field">
           
            <label className="settings-label">Name</label>
            <div className='inputs'>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="settings-input"
            />
               <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="settings-input"
            />
            </div>
          </div>
       
          <div className="settings-field">
            <label className="settings-label">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="settings-input"
              readOnly
            />
          </div>
          <div className="settings-field">
            <label className="settings-label">Your photo</label>
            <div className="settings-photo-upload">
              <img
                src={photo}
                alt="User"
                className="settings-photo"
              />
              <input
                type="file"
                className="settings-file-input"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      if (event.target?.result) {
                        setPhoto(event.target.result as string);
                      }
                    };
                    reader.readAsDataURL(e.target.files[0]);
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
              <option value="United States">United States</option>
              <option value="Australia">Australia</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>
          </div>
          <div className="settings-field">
            <label className="settings-label">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="settings-textarea"
            ></textarea>
            <p className="settings-char-count">
              {275 - (bio ? bio.length : 0)} characters left
            </p>
          </div>
          <button className="settings-save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;

