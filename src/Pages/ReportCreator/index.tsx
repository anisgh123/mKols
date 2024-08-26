import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './index.css'; // Import the CSS file

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Define the type for your content data
interface ContentData {
  date: string;
  views: number;
  likes: number;
  shares: number;
  comments: number;
}

const ContentAnalytics: React.FC = () => {
  // Static data for posts
  const postData: ContentData[] = [
    { date: '2024-08-01', views: 300, likes: 100, shares: 50, comments: 40 },
    { date: '2024-08-02', views: 350, likes: 120, shares: 60, comments: 45 },
    { date: '2024-08-03', views: 400, likes: 140, shares: 70, comments: 50 },
    { date: '2024-08-04', views: 450, likes: 160, shares: 80, comments: 55 },
    { date: '2024-08-05', views: 500, likes: 180, shares: 90, comments: 60 },
  ];

  // Static data for stories
  const storyData: ContentData[] = [
    { date: '2024-08-01', views: 200, likes: 50, shares: 20, comments: 15 },
    { date: '2024-08-02', views: 250, likes: 70, shares: 25, comments: 20 },
    { date: '2024-08-03', views: 300, likes: 90, shares: 30, comments: 25 },
    { date: '2024-08-04', views: 350, likes: 110, shares: 35, comments: 30 },
    { date: '2024-08-05', views: 400, likes: 130, shares: 40, comments: 35 },
  ];

  // Static data for reels
  const reelData: ContentData[] = [
    { date: '2024-08-01', views: 500, likes: 200, shares: 100, comments: 80 },
    { date: '2024-08-02', views: 550, likes: 220, shares: 110, comments: 85 },
    { date: '2024-08-03', views: 600, likes: 240, shares: 120, comments: 90 },
    { date: '2024-08-04', views: 650, likes: 260, shares: 130, comments: 95 },
    { date: '2024-08-05', views: 700, likes: 280, shares: 140, comments: 100 },
  ];

  // Function to generate chart data
  const generateChartData = (data: ContentData[]) => ({
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Views',
        data: data.map(d => d.views),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
      {
        label: 'Likes',
        data: data.map(d => d.likes),
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
      },
      {
        label: 'Shares',
        data: data.map(d => d.shares),
        borderColor: 'rgba(255,159,64,1)',
        backgroundColor: 'rgba(255,159,64,0.2)',
      },
      {
        label: 'Comments',
        data: data.map(d => d.comments),
        borderColor: 'rgba(54,162,235,1)',
        backgroundColor: 'rgba(54,162,235,0.2)',
      },
    ],
  });

  return (
    <div className="content-analytics-container">
      <section className="analytics-section story-section">
        <h3>Story Analytics</h3>
        <Line data={generateChartData(storyData)} />
      </section>

      <div className="flex-container">
        <section className="analytics-section post-section">
          <h3>Post Analytics</h3>
          <Line data={generateChartData(postData)} />
        </section>

        <section className="analytics-section reel-section">
          <h3>Reel Analytics</h3>
          <Line data={generateChartData(reelData)} />
        </section>
      </div>
    </div>
  );
};

export default ContentAnalytics;
