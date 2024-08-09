import React from 'react';
import styled from 'styled-components';
import { FaInstagram } from 'react-icons/fa';

const ProfileContainer = styled.div`
  display: flex;
  background-color: #2b3a47;

  border-radius: 10px;
  color: white;
 height:350px
  margin-buttom:2px;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-left :70px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
`;

const ProfileContent = styled.div`
  flex-grow: 1;
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileName = styled.h2`
  margin: 0;
`;



const ProfileInfo = styled.div`
  margin: 10px 0;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const SocialIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ProfileBio = styled.p`
 height:20 px
`;

const ProfileActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const SaveButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
`;

const ViewPortfolioButton = styled.button`
  background-color: #ff7f50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const ProfileDetails: React.FC = () => {
  return (
    <ProfileContainer>
      <ProfileImage src="path_to_image.jpg" alt="Profile" />
      <ProfileContent>
        <ProfileHeader>
          <ProfileName>Cathay</ProfileName>
    
        </ProfileHeader>
        <ProfileInfo>
         
          <div>Japan</div>
          <SocialIcons>
           
            <SocialIcon>
              <FaInstagram /> 100k followers
            </SocialIcon>
          </SocialIcons>
        </ProfileInfo>
        <ProfileBio>
     
        </ProfileBio>
        <ProfileActions>
          <SaveButton>Save</SaveButton>
          <ViewPortfolioButton onClick={() => window.location.href = "/profile"}>View portfolio</ViewPortfolioButton>
        </ProfileActions>
      </ProfileContent>
    </ProfileContainer>
  );
};

export default ProfileDetails;