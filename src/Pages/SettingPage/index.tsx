import React, { useState } from 'react';
import './index.css';

const SettingPage: React.FC = () => {
  const [name, setName] = useState('Olivia Rhye');
  const [email, setEmail] = useState('olivia@untitledui.com');
  const [country, setCountry] = useState('United States');
  const [bio, setBio] = useState("I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development.");

  return (<div className='page'>
   
    <div className="settings-container">
              
      <h1 className="settings-title">Settings</h1>

      <div className="settings-form">
      <button className="settings-save-button">Save</button>
        <h2 className="settings-section-title">Personal info</h2>
        <p className="settings-section-description">Update your photo and personal details here.</p>
        
        <div className="settings-field">
          <label className="settings-label">Name</label>
          <div className="settings-input-group">
            <input type="text" value={name.split(' ')[0]} onChange={(e) => setName(e.target.value + ' ' + name.split(' ')[1])} className="settings-input" />
            <input type="text" value={name.split(' ')[1]} onChange={(e) => setName(name.split(' ')[0] + ' ' + e.target.value)} className="settings-input" />
          </div>
        </div>
        
        <div className="settings-field">
          <label className="settings-label">Email address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="settings-input" />
        </div>
        
        <div className="settings-field">
          <label className="settings-label">Your photo</label>
          <div className="settings-photo-upload">
            <img src="https://via.placeholder.com/150" alt="User" className="settings-photo" />
            <input type="file" className="settings-file-input" />
          </div>
        </div>
        
        <div className="settings-field">
          <label className="settings-label">Country</label>
          <select value={country} onChange={(e) => setCountry(e.target.value)} className="settings-select">
            <option value="United States">United States</option>
            <option value="Australia">Australia</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
          </select>
        </div>
        
        <div className="settings-field">
          <label className="settings-label">Bio</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="settings-textarea"></textarea>
          <p className="settings-char-count">{275 - bio.length} characters left</p>
        </div>

 
      </div>
    </div></div>
  );
};

export default SettingPage;