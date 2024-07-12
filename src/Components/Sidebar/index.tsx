// src/Layout/Sidebar.tsx
import React from 'react';
import { Layout, Menu, Avatar, Typography } from 'antd';
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
  return (
    <Layout className="custom-layout">
      <Sider className="custom-sider">
        <div className="custom-logo">
          <Logo />
        </div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={['home']}>
          <Menu.Item key="home" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <SubMenu key="dashboard" icon={<AppstoreOutlined />} title="Dashboard">
            <Menu.Item key="overview" icon={<FileOutlined />}>Overview</Menu.Item>
            <Menu.Item key="notifications" icon={<BellOutlined />}>Notifications</Menu.Item>
            <Menu.Item key="tradehistory" icon={<HistoryOutlined />}>TradeHistory</Menu.Item>
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
          <div className="menu-item-spacing"></div> {/* Spacer */}
          <Menu.Item key="settings" icon={<SettingOutlined />} className="settings-menu-item">
            Settings
          </Menu.Item>
        </Menu>
        <div className="profile-footer">
          <Avatar src="path_to_profile_photo.jpg" size="large" />
          <div className="profile-info">
            <Text className="profile-name">Profile Name</Text>
            <Text className="profile-email">email@example.com</Text>
          </div>
          <LogoutOutlined className="logout-icon" />
        </div>
      </Sider>
    </Layout>
  );
};

export default Sidebar;


