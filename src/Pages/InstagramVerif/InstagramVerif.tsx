import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Form, message } from 'antd';
import { InstagramOutlined, UserOutlined } from '@ant-design/icons';
import { SiTiktok, SiPinterest } from 'react-icons/si';
import { Typewriter } from 'react-simple-typewriter';
import './index.css';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const SocialIcons: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [platform, setPlatform] = useState<string>('');
  const [form] = Form.useForm();
  const userData: any = JSON.parse(localStorage.getItem("userProfile") || '{}');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the account type is creator
    if (userData?.accountType !== 'creator') {
      // Redirect if not creator
     
      toast.error ('Access denied. This page is for creators only.');
    }
  }, [userData, navigate]);

  const showModal = (platform: string) => {
    if (platform === 'Instagram' || platform === 'Pinterest') {
      setPlatform(platform);
      setIsModalVisible(true);
    } else {
      message.info(`${platform} integration is coming soon!`);
    }
  };

  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        message.success(`${platform} user added successfully!`);
        console.log('Form Data:', values);
        try {
            const response =  axios.get(`http://localhost:5000/api/instagram/${values?.username}/${userData?._id}`);
            toast.success('Login successful');
            console.log(response);
          } catch (error) {
            toast.error('Login failed');
          }
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        console.error('Validation Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleInstagram = async() => {
    try {
      const response = await axios.post(`http://localhost:5000/api/instagram//${userData?._id}`);
      toast.success('Login successful');
      console.log(response);
    } catch (error) {
      toast.error('Login failed');
    }
  };

  return (
    <div className="social-icons-container">
      {/* Animated sentence using react-simple-typewriter */}
      <div className="animated-text">
        <Typewriter
          words={['Click on a social media icon', 'Enter your username', 'Click Submit to save']}
          loop={0} // Set to 0 for infinite loop
          cursor
          cursorStyle='_'
          typeSpeed={70}
          deleteSpeed={5000}
          delaySpeed={1000}
        />
      </div>

      {/* Icons displayed horizontally */}
      <div className="social-icons-row">
        <InstagramOutlined className="social-icon instagram-icon" onClick={() => showModal('Instagram')} />
        <SiPinterest className="social-icon pinterest-icon" onClick={() => showModal('Pinterest')} />
        <SiTiktok className="social-icon tiktok-icon" onClick={() => showModal('TikTok')} />
      </div>

      <Modal
        title={`Add ${platform} User`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          name="socialForm"
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="username"
            label={`${platform} Username`}
            rules={[
              { required: true, message: 'Please input your username!' },
              { min: 3, message: 'Username must be at least 3 characters long' },
            ]}
          >
            <Input placeholder={`Enter your ${platform} username`} prefix={<UserOutlined />} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SocialIcons;
