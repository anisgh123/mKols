import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Typography, Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../Logo';
import {
  HomeOutlined,
  AppstoreOutlined,
  BellOutlined,
  HistoryOutlined,
  FileOutlined,
  CheckCircleOutlined,
  LineChartOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import './index.css';

const { Sider } = Layout;
const { SubMenu } = Menu;
const { Text } = Typography;

const Sidebar: React.FC = () => {
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [userInfo, setUserInfo] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotificationCount = async () => {
      const count = 5;
      setNotificationCount(count);
    };

    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/user', {
            headers: {
              Authorization: token,
            },
          });
          setUserInfo(response.data);
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
    };

    fetchNotificationCount();
    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');
    localStorage.removeItem('photo');
    localStorage.removeItem('country');
    localStorage.removeItem('bio');
    navigate('/login');
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'settings') {
      navigate('/setting-page');
    }
  };

  return (
    <Sider width={250} className="custom-sider" style={{ background: '#fff' }}>
      <div className="custom-logo">
        <Logo />
      </div>
      <div className="menu-body">
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['home']}
          className="main-menu"
          onClick={handleMenuClick}
        >
          <Menu.Item key="home" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <SubMenu key="dashboard" icon={<AppstoreOutlined />} title="Dashboard">
            <Menu.Item key="overview" icon={<FileOutlined />}>
              Overview
            </Menu.Item>
            <Menu.Item key="notifications" icon={<BellOutlined />}>
              <Badge
                count={notificationCount}
                offset={[10, 0]}
                style={{ backgroundColor: '#52c41a', color: '#fff' }}
              >
                Notifications
              </Badge>
            </Menu.Item>
            <Menu.Item key="tradehistory" icon={<HistoryOutlined />}>
              Trade History
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="projects" icon={<FileOutlined />}>
            Projects
          </Menu.Item>
          <Menu.Item key="tasks" icon={<CheckCircleOutlined />}>
            Tasks
          </Menu.Item>
          <Menu.Item key="reporting" icon={<LineChartOutlined />}>
            Reporting
          </Menu.Item>
          <Menu.Item key="users" icon={<UserOutlined />}>
            Users
          </Menu.Item>
        </Menu>
      </div>
      <div className="bottom-menu">
        <Menu theme="light" mode="inline" onClick={handleMenuClick}>
          <Menu.Item key="settings" icon={<SettingOutlined />} className="settings-menu-item">
            Settings
          </Menu.Item>
        </Menu>
        <div className="profile-footer">
          <Avatar src={userInfo.photo || 'path_to_default_photo.jpg'} size="large" />
          <div className="profile-info">
            <Text className="profile-name">
              {userInfo.firstName} {userInfo.lastName}
            </Text>
            <Text className="profile-email">{userInfo.email}</Text>
          </div>
          <LogoutOutlined className="logout-icon" onClick={handleLogout} />
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
