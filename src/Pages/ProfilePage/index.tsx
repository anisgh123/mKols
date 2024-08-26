import React, { useEffect, useState } from 'react';
import './index.css';
import rectangle from '../../Assets/Images/Icons/Rectangle 1352.png';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Button, Card, Row, Col } from 'antd';

Chart.register(ArcElement, Tooltip, Legend);

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [creator, setCreator] = useState<any>();

  useEffect(() => {
    const fetchCreatorData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/creator/${params?.id}`);
        setCreator(response.data);
      } catch (error) {
        console.error('Error fetching creator data:', error);
      }
    };

    fetchCreatorData();
  }, [params]);

  const followersData = {
    labels: ['Followers', 'Following'],
    datasets: [
      {
        label: 'Followers vs Following',
        data: [creator?.followers || 0, creator?.following || 0],
        backgroundColor: ['#36A2EB', '#FF6384'],
        borderColor: ['#36A2EB', '#FF6384'],
        borderWidth: 1,
        hoverOffset: 4, // Controls the size increase on hover (set to 4 for minimal effect)
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            let label = context.label || '';
            if (label) label += ': ';
            label += context.raw;
            return label;
          },
        },
      },
    },
    interaction: {
      mode: 'nearest' as const, // Set to 'nearest', a valid value for this property
      intersect: true,
    },
  };

  return (
  
    <div className="profile-page">
      <ToastContainer />
      <div className="header-profile">
        <img src={rectangle} alt="Header" />
      </div>
      <div className="profile-section">
        <img
          className="profile-pic"
          src={creator?.avatar}
          alt="Profile"
        />
        <div className="contact-info">
          <h2>{creator?.firstName + ' ' + creator?.lastName}</h2>
          <p>✉️ {creator?.email}</p>
        </div>
        <Button
          className="button-collab"
          onClick={() => navigate(`/makeoffer/${creator?.email}/${creator?._id}`)}
        >
          Create Collaboration
        </Button>
        <div className="social-media">
          {creator?.socialMedia?.map((media: any, index: number) => (
            <div className="social-icon" key={index}>
              <img src={media.iconUrl} alt={media.platform} />
              <p>{media.username}</p>
              <p>{media.followers} followers</p>
            </div>
          ))}
        </div>
      </div>
      <div className="analytics-section">
        <h2>Analytics Overview</h2>
        <div className="chart-container">
          <div className="chart-item">
            <h3>Followers vs Following</h3>
            <div className="fixed-pie">
              <Pie data={followersData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="info-cards">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card>
                <h3>Account Type</h3>
                <p className="info-result">{creator?.is_business === 'true' ? 'Business Account' : 'Personal Account'}</p>
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <h3>Account Verification</h3>
                <p className="info-result">{creator?.is_verified_account === 'true' ? 'Verified' : 'Not Verified'}</p>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;



