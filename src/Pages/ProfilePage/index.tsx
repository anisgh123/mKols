import React, { useEffect, useState } from 'react';
import './index.css';
import rectangle from '../../Assets/Images/Icons/Rectangle 1352.png';

interface SocialMedia {
  platform: string;
  username: string;
  followers: string;
  iconUrl: string;
}

interface Listing {
  imageUrl: string;
  platform: string;
  description: string;
}

interface ProfileData {
  name: string;
  phone: string;
  email: string;
  profilePicUrl: string;
  socialMedia: SocialMedia[];
  listings: Listing[];
}

const ProfilePage: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [accessToken, setAccessToken] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const data: ProfileData = {
        name: 'Nutan Khangar',
        phone: '+91 9899999999',
        email: 'nutan@mail.com',
        profilePicUrl: 'https://via.placeholder.com/70',
        socialMedia: [
          {
            platform: 'TikTok',
            username: 'nutan9958',
            followers: '13 million followers',
            iconUrl: 'https://via.placeholder.com/40',
          },
          {
            platform: 'Facebook',
            username: 'nutan3656',
            followers: '3.5 million followers',
            iconUrl: 'https://via.placeholder.com/40',
          },
          {
            platform: 'Instagram',
            username: 'nutan3656',
            followers: '1.3 million followers',
            iconUrl: 'https://via.placeholder.com/40',
          },
        ],
        listings: [
          { imageUrl: 'https://via.placeholder.com/150', platform: 'Facebook', description: 'Experience the inspiring story of Green, a YouTube sensation!' },
          { imageUrl: 'https://via.placeholder.com/150', platform: 'Instagram', description: 'Experience the inspiring story of Green, a YouTube sensation!' },
          { imageUrl: 'https://via.placeholder.com/150', platform: 'Instagram', description: 'Experience the inspiring story of Green, a YouTube sensation!' },
          { imageUrl: 'https://via.placeholder.com/150', platform: 'Facebook', description: 'Experience the inspiring story of Green, a YouTube sensation!' },
          { imageUrl: 'https://via.placeholder.com/150', platform: 'Facebook', description: 'Experience the inspiring story of Green, a YouTube sensation!' },
          { imageUrl: 'https://via.placeholder.com/150', platform: 'Instagram', description: 'Experience the inspiring story of Green, a YouTube sensation!' },
          { imageUrl: 'https://via.placeholder.com/150', platform: 'Instagram', description: 'Experience the inspiring story of Green, a YouTube sensation!' },
          { imageUrl: 'https://via.placeholder.com/150', platform: 'Facebook', description: 'Experience the inspiring story of Green, a YouTube sensation!' },
        ],
      };
      setProfileData(data);
    };

    fetchData();
  }, []);

  const handleInstagramAuth = () => {
    const clientId = process.env.REACT_APP_INSTAGRAM_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_INSTAGRAM_REDIRECT_URI;
    const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;
    window.location.href = instagramAuthUrl;
  };

  useEffect(() => {
    const getAccessToken = async (code: string) => {
      const response = await fetch('https://api.instagram.com/oauth/access_token', {
        method: 'POST',
        body: new URLSearchParams({
          client_id: process.env.REACT_APP_INSTAGRAM_CLIENT_ID!,
          client_secret: process.env.REACT_APP_INSTAGRAM_CLIENT_SECRET!,
          grant_type: 'authorization_code',
          redirect_uri: process.env.REACT_APP_INSTAGRAM_REDIRECT_URI!,
          code,
        }),
      });
      const data = await response.json();
      setAccessToken(data.access_token);
    };

    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      getAccessToken(code);
    }
  }, []);

  useEffect(() => {
    const fetchInstagramData = async () => {
      if (accessToken) {
        const response = await fetch(`https://graph.instagram.com/me?fields=id,username,followers_count&access_token=${accessToken}`);
        const data = await response.json();
        const updatedSocialMedia = profileData?.socialMedia.map((media) =>
          media.platform === 'Instagram'
            ? { ...media, username: data.username, followers: `${data.followers_count} followers` }
            : media
        ) || [];
        setProfileData((prevData) => (prevData ? { ...prevData, socialMedia: updatedSocialMedia } : null));
      }
    };

    fetchInstagramData();
  }, [accessToken]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="header-profile">
        <img src={rectangle} alt="Header" />
      </div>
      <div className="profile-section">
        <img className="profile-pic" src={profileData.profilePicUrl} alt="Profile" />
        <div className="contact-info">
          <h2>{profileData.name}</h2>
          <p>📞 {profileData.phone}</p>
          <p>✉️ {profileData.email}</p>
        </div>
        <div className="social-media">
          {profileData.socialMedia.map((media, index) => (
            <div className="social-icon" key={index} onClick={media.platform === 'Instagram' ? handleInstagramAuth : undefined}>
              <img src={media.iconUrl} alt={media.platform} />
              <p>{media.username}</p>
              <p>{media.followers}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="listings-section">
        <div className="listings-header">
          <h2>Listings</h2>
          <button className="show-more-button">Show More</button>
        </div>
        <div className="divider"></div>
        <div className="listings">
          {profileData.listings.map((listing, index) => (
            <div className="listing" key={index}>
              <img src={listing.imageUrl} alt="Listing" />
              <p>{listing.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
