import React from 'react';

type CreatorOverview = {
  name: string;
  followers: number;
  totalPosts: number;
  totalReels: number;
  engagementRate: number;
  profileImage: string;
};

const OverviewCard: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div style={cardStyle}>
    <p style={labelStyle}>{label}</p>
    <p style={valueStyle}>{value}</p>
  </div>
);

const Overview: React.FC = () => {
  const creatorData: CreatorOverview = {
    name: 'John Doe',
    followers: 12000,
    totalPosts: 85,
    totalReels: 25,
    engagementRate: 4.5,
    profileImage: 'path/to/image.jpg',
  };

  return (
    <div style={overviewContainerStyle}>
      <div style={profileSectionStyle}>
        <img src={creatorData.profileImage} alt={creatorData.name} style={profileImageStyle} />
        <h1 style={creatorNameStyle}>{creatorData.name}</h1>
      </div>
      <div style={statsContainerStyle}>
        <OverviewCard label="Followers" value={creatorData.followers} />
        <OverviewCard label="Total Posts" value={creatorData.totalPosts} />
        <OverviewCard label="Total Reels" value={creatorData.totalReels} />
        <OverviewCard label="Engagement Rate" value={`${creatorData.engagementRate}%`} />
      </div>
    </div>
  );
};

// Inline styles
const overviewContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
};

const profileSectionStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '20px',
};

const profileImageStyle: React.CSSProperties = {
  width: '100px',
  height: '100px',
  borderRadius: '50%',
};

const creatorNameStyle: React.CSSProperties = {
  marginTop: '10px',
  fontSize: '24px',
};

const statsContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
  maxWidth: '600px',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  padding: '20px',
  textAlign: 'center',
  margin: '10px',
  flex: '1',
};

const labelStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#888',
};

const valueStyle: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginTop: '10px',
};

export default Overview;
