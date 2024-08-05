import React from 'react';
import ProfileCard from '../Profliecard';
import './index.css';

const profiles = [
    { name: 'Catherine', age: 27, image: 'path_to_image1.jpg', isVerified: true, isPremium: false },
    { name: 'Catherine', age: 27, image: 'path_to_image2.jpg', isVerified: false, isPremium: true },
    { name: 'Catherine', age: 27, image: 'path_to_image3.jpg', isVerified: true, isPremium: false },
    { name: 'Catherine', age: 27, image: 'path_to_image4.jpg', isVerified: true, isPremium: true },
    { name: 'Catherine', age: 27, image: 'path_to_image5.jpg', isVerified: false, isPremium: false },
    // Add more profiles as needed
  ];
  
  const ProfileList: React.FC = () => {
    return (
      <div className="profile-list">
        {profiles.map((profile, index) => (
          <ProfileCard
            key={index}
            name={profile.name}
            age={profile.age}
            image={profile.image}
            isVerified={profile.isVerified}
            isPremium={profile.isPremium}
          />
        ))}
      </div>
    );
  }
  
  export default ProfileList;