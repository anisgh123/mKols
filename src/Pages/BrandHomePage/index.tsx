import React, { useEffect, useState } from 'react';
import { Card, Row, Col, List, Typography, Statistic } from 'antd';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from 'chart.js';
import './index.css';
import axios from 'axios';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

const { Text } = Typography;

const HomePageBrand: React.FC = () => {
  const staticBrand = {
    products: [
      { name: 'Product 1', clicks: 120, sales: 30 },
      { name: 'Product 2', clicks: 80, sales: 25 },
      { name: 'Product 3', clicks: 150, sales: 45 },
    ],
  };

  const staticRecentCollaborations = [
    {
      title: 'Collaboration 1',
      description: 'Description of collaboration 1.',
      link: '#',
      date: '2024-01-01',
    },
    {
      title: 'Collaboration 2',
      description: 'Description of collaboration 2.',
      link: '#',
      date: '2024-02-01',
    },
    {
      title: 'Collaboration 3',
      description: 'Description of collaboration 3.',
      link: '#',
      date: '2024-03-01',
    },
  ];
  const userData: any = JSON.parse(localStorage.getItem("userProfile") || '{}');
 const [offers,setOffers] =useState([])
 console.log(offers)
  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/businessOffer?email=${userData?.email}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setOffers(response.data);
      } catch (error) {
        console.error('Error fetching creator profiles:', error);
      }
    };

    fetchCreators();
  }, []);
  const staticTotalProducts = staticBrand.products.length;
  const staticTotalSales = staticBrand.products.reduce((acc, product) => acc + product.sales, 0);

  const analyticsData = {
    labels: staticBrand.products.map((product) => product.name),
    datasets: [
      {
        label: 'Number of Clicks',
        data: staticBrand.products.map((product) => product.clicks),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Number of Sales',
        data: staticBrand.products.map((product) => product.sales),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
  const declinedOffersCount = offers?.filter((offer: any) => offer?.status === "declined").length || 0;
  const acceptedOffersCount = offers?.filter((offer: any) => offer?.status === "accepted").length || 0;
  const pendingOffersCount = offers?.filter((offer: any) => offer?.status === "pending").length || 0;
  // useEffect(()=>{
  //   const accessToken = "aae9d09ddd1b604e4653be05b3dd50a1d0a98b16";

  //   const response = fetch(`https://api-ssl.bitly.com/v4/bitlinks/https://bit.ly/4dPpZ7c/clicks`, {
  //     headers: {
  //       'Authorization': `Bearer ${accessToken}`,
  //     },
  //   });
  //   console.log("responseee",response)
  // },[])
  const offerStatusData = {
    labels: ['Accepted', 'Rejected', 'Pending'],
    datasets: [
      {
        label: 'Offer Statuses',
        data: [acceptedOffersCount, declinedOffersCount, pendingOffersCount], // Example data: 12 accepted, 5 rejected, 8 pending
        backgroundColor: ['#4caf50', '#f44336', '#ffeb3b'],
        borderColor: ['#388e3c', '#d32f2f', '#fbc02d'],
        borderWidth: 1,
      },
    ],
  };

  const trackTimeSpentOnPage = (link: string) => {
    const startTime = Date.now();

    // Request the user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        window.addEventListener('beforeunload', () => {
          const timeSpent = Date.now() - startTime;
          sendTimeSpentToServer(link, timeSpent, { latitude, longitude });
        });
      },
      (error) => {
        console.error('Error getting location:', error);
        // Fallback if location is not available or denied
        window.addEventListener('beforeunload', () => {
          const timeSpent = Date.now() - startTime;
          sendTimeSpentToServer(link, timeSpent, null);
        });
      }
    );
  };

  const sendTimeSpentToServer = async (link: string, timeSpent: number, location: any) => {
    try {
      await axios.post('/api/track-time', { link, timeSpent, location });
    } catch (error) {
      console.error('Error sending time spent data:', error);
    }
  };

  return (
    <div className="home-page-brand" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Row gutter={[16, 16]} style={{ flex: 1 }}>
        <Col span={12} style={{ display: 'flex', flexDirection: 'column' }}>
          <Row gutter={[16, 16]} style={{ flex: 1 }}>
            <Col span={12}>
              <Card style={{ height: '100%' }}>
                <Statistic title="Total Products" value={staticTotalProducts} />
              </Card>
            </Col>
            <Col span={12}>
              <Card style={{ height: '100%' }}>
                <Statistic title="Total Sales" value={staticTotalSales} />
              </Card>
            </Col>
          </Row>
          <Card title="Product Analytics" style={{ flex: 2, marginTop: '8px' }}>
            <Bar data={analyticsData} options={{ maintainAspectRatio: false }} />
          </Card>
        </Col>
        <Col span={12} style={{ display: 'flex', flexDirection: 'column' }}>
          <Card title="Offer Statuses" style={{ flex: 1, marginBottom: '8px' }}>
            <Pie data={offerStatusData} options={{ maintainAspectRatio: false }} />
          </Card>
          <Card title="Recent Collaborations" style={{ flex: 1 }}>
            <List
              itemLayout="horizontal"
              dataSource={staticRecentCollaborations}
              renderItem={(collaboration) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <a
                        href={collaboration.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackTimeSpentOnPage(collaboration.link)}
                      >
                        {collaboration.title}
                      </a>
                    }
                    description={collaboration.description}
                  />
                  <Text type="secondary">{collaboration.date}</Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomePageBrand;

