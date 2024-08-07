import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Typography, Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
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
import { useAuth } from '../../AuthContext';

const { Sider } = Layout;
const { Text } = Typography;

const Sidebar: React.FC = () => {
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotificationCount = async () => {
      const count = 5; // Exemple de nombre de notifications, vous devriez récupérer le nombre réel depuis votre API
      setNotificationCount(count);
    };

    fetchNotificationCount();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(`/${key}`);
  };

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: 'dashboard',
      icon: <AppstoreOutlined />,
      label: 'Dashboard',
      children: [
        {
          key: 'overview',
          icon: <FileOutlined />,
          label: 'Overview',
        },
        {
          key: 'notifications',
          icon: <BellOutlined />,
          label: (
            <Badge count={notificationCount} offset={[10, 0]} style={{ backgroundColor: '#52c41a', color: '#fff' }}>
              Notifications
            </Badge>
          ),
        },
        {
          key: 'tradehistory',
          icon: <HistoryOutlined />,
          label: 'Trade History',
        },
      ],
    },
    {
      key: 'projects',
      icon: <FileOutlined />,
      label: 'Projects',
    },
    {
      key: 'tasks',
      icon: <CheckCircleOutlined />,
      label: 'Tasks',
    },
    {
      key: 'reporting',
      icon: <LineChartOutlined />,
      label: 'Reporting',
    },
    {
      key: 'users',
      icon: <UserOutlined />,
      label: 'Users',
    },
  ];

  return (
    <Sider width={250} className="custom-sider" style={{ background: '#fff', position: 'relative' }}>
      <div className="custom-logo">
        <Logo />
      </div>
      <div className="menu-body">
        <Menu theme="light" mode="inline" defaultSelectedKeys={['home']} className="main-menu" onClick={handleMenuClick} items={menuItems} />
      </div>
      <div className="bottom-menu">
        <div className="profile-footer">
          <Avatar className="profile-avatar" src={user?.photo || 'path_to_default_photo.jpg'} size="large" />
          <div className="profile-info">
            <Text className="profile-name">
              {user?.firstName} {user?.lastName}
            </Text>
            <Text className="profile-email">{user?.email}</Text>
          </div>
          <LogoutOutlined className="logout-icon" onClick={handleLogout} />
        </div>
      </div>
      <Menu theme="light" mode="inline" className="fixed-settings" onClick={handleMenuClick}>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          Settings
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
