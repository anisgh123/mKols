import React from 'react';
import './index.css';

interface ProfileCardProps {
  name: string;
  age: number;
  image: string;
  isVerified: boolean;
  isPremium: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, age, image, isVerified, isPremium }) => {
  return (
    <div className="profile-card">
      <img src={image} alt={`${name}'s profile`} className="profile-image" />
      <div className="profile-details">
        <h2 className="profile-name">{name}</h2>
        <p className="profile-age">{age} years old</p>
        <div className="profile-icons">
          {isVerified && <span className="verified-icon">✔️</span>}
          {isPremium && <span className="premium-icon">⭐</span>}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;

