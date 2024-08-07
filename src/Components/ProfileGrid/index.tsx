// src/pages/ProfileGrid.tsx
import React from 'react';
import styled from 'styled-components';
import ProfileCard from '../ProfileCard';

const ProfileGridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

const profiles = [
  { name: 'Catherine', age: 27, imageUrl: 'path_to_image_1', verified: true, isActive: true },
  { name: 'Catherine', age: 27, imageUrl: 'path_to_image_2', verified: true },
  { name: 'Catherine', age: 27, imageUrl: 'path_to_image_3', specialBadge: 'Top Influencer' },
  // Ajoutez plus de profils ici
];

const ProfileGrid: React.FC = () => {
  return (
    <ProfileGridContainer>
      {profiles.map((profile, index) => (
        <ProfileCard key={index} {...profile} />
      ))}
    </ProfileGridContainer>
  );
};

export default ProfileGrid;

