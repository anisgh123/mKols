import React from 'react';
import './index.css';

interface DetailedProfileCardProps {
    name: string;
    age: number;
    countryFlag: string;
    image: string;
    isVerified: boolean;
    followers: {
      facebook: number;
      twitter: number;
      instagram: number;
    };
    description: string;
    isSponsored: boolean;
  }
  
  const DetailedProfileCard: React.FC<DetailedProfileCardProps> = ({
    name,
    age,
    countryFlag,
    image,
    isVerified,
    followers,
    description,
    isSponsored,
  }) => {
    return (
      <div className="detailed-profile-card">
        <div className="profile-header">
          <img src={image} alt={`${name}'s profile`} className="profile-image" />
          <div className="profile-info">
            <h2 className="profile-name">
              {name} {isVerified && <span className="verified-icon">✔️</span>}
            </h2>
            <p className="profile-age">
              {age} years old <img src={countryFlag} alt="Country flag" className="country-flag" />
            </p>
            <div className="profile-followers">
              <span>{followers.facebook}k follower</span>
              <span>{followers.twitter}k follower</span>
              <span>{followers.instagram}k follower</span>
            </div>
          </div>
        </div>
        <div className="profile-description">{description}</div>
        <div className="profile-footer">
          <button className="save-button">Save</button>
          <a href="#" className="portfolio-link">View portfolio ➔</a>
          {isSponsored && <span className="sponsored-badge">🔥 Sponsored by Solo</span>}
        </div>
      </div>
    );
  }
  
  export default DetailedProfileCard;