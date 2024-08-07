import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import './index.css';
import { useParams } from 'react-router-dom';

const { TextArea } = Input;
const { Option } = Select;

const MakeOffer: React.FC = () => {
  const [offerPrice, setOfferPrice] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [offerDescription, setOfferDescription] = useState('');
const params =useParams()
console.log(params)
  const handleSubmit = () => {
    // Handle form submission
    console.log({
      offerPrice,
      email,
      phoneNumber,
      offerDescription,
    });
  };

  return (
    <div className="make-offer-container">
      <h1>Make offer</h1>
      <p>Influencer <span className="influencer-email">{params?.email}</span></p>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Offer price">
          <Input
            type="number"
            value={offerPrice}
            onChange={(e) => setOfferPrice(e.target.value)}
            addonBefore="DT"
            addonAfter="DNT"
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
          />
        </Form.Item>
        <Form.Item label="Phone number">
          <Input
            addonBefore={
              <Select defaultValue="TN">
                <Option value="US">TN</Option>
                
              </Select>
            }
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+(216)00- 000-0000"
          />
        </Form.Item>
        <Form.Item label="Offer description">
          <TextArea
            value={offerDescription}
            onChange={(e) => setOfferDescription(e.target.value)}
            placeholder="Write your offer description..."
            rows={4}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="send-offer-button">
            Send offer
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MakeOffer;
