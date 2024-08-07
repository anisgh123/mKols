import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  width: 60%;
  height: 70%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50%;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const ProfileName = styled.h3`
  margin: 10px 0 0 0;
`;

interface ProfileCardProps {
  imageUrl: string;
  name: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ imageUrl, name }) => {
  return (
    <CardContainer>
      <CardContent>
        <ProfileImage src={imageUrl} alt="Profile" />
        <ProfileName>{name}</ProfileName>
      </CardContent>
    </CardContainer>
  );
};

export default ProfileCard;
