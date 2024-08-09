import React, { useEffect, useState } from 'react';
import './index.css';
import rectangle from '../../Assets/Images/Icons/Rectangle 1352.png';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const navigate=useNavigate()
  const profileData = {
    name: 'Nutan Khangar',
    email: 'nutan@mail.com',
    profilePicUrl: 'https://via.placeholder.com/70',
    socialMedia: [
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
  const params=useParams()
  const [creator,setCreator]=useState<any>()
  console.log(creator)
  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/creator/${params?.id}`);
        setCreator(response.data);
      } catch (error) {
        console.error('Error fetching creator profiles:', error);
      }
    };

    fetchCreators();
  }, []);
  return (
    <div className="profile-page">
      <ToastContainer />
      <div className="header-profile">
        <img src={rectangle} alt="Header" />
      </div>
      <div className="profile-section">
        <img className="profile-pic" src={profileData.profilePicUrl} alt="Profile" />
        <div className="contact-info">
          <h2>{profileData.name}</h2>
          <p>✉️ {creator?.email}</p>
        </div>
        <div className='button-collab' onClick={() =>navigate ( `/makeoffer/${creator?.email}/${creator?._id}`)}>Create collaboration </div>
        <div className="social-media">
          {profileData.socialMedia.map((media, index) => (
            <div className="social-icon" key={index}>
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
