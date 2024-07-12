import React, { useState } from 'react';
import { Table, Input, Button, DatePicker, Checkbox, Typography, Space, Avatar } from 'antd';
import { SearchOutlined, FilterOutlined, DeleteOutlined } from '@ant-design/icons';
import moment, { Moment } from 'moment';
import './index.css';

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

interface Offer {
  id: number;
  offer: string;
  company: string;
  amount: string;
  date: string;
  status: string;
  user: string;
  email: string;
  photo: string;
}

const initialOffersData: Offer[] = [
  
  { id: 1, offer: 'TSLA BUY', company: 'Tesla, Inc.', amount: '$30,021.23', date: '2022-01-12', status: 'Pending', user: 'Olivia Rhye', email: 'olivia@untitledui.com', photo: 'https://via.placeholder.com/50' },
  { id: 2, offer: 'MICH SELL', company: 'Micah Group, Inc.', amount: '$22,431.50', date: '2022-01-10', status: 'Approved', user: 'Phoenix Baker', email: 'phoenix@untitledui.com', photo: 'https://via.placeholder.com/50' },
  { id: 3, offer: 'DOGE BUY', company: 'Dodge Ltd.', amount: '$40,123.99', date: '2022-01-08', status: 'Approved', user: 'Lana Steiner', email: 'lana@untitledui.com', photo: 'https://via.placeholder.com/50' },
  { id: 4, offer: 'ARKG BUY', company: 'ARK Genomic Revolution ETF', amount: '$19,230.34', date: '2022-01-07', status: 'Declined', user: 'Demi Wilkinson', email: 'demi@untitledui.com', photo: 'https://via.placeholder.com/50' },
  { id: 5, offer: 'SQ BUY', company: 'Square, Inc.', amount: '$21,212.10', date: '2022-01-05', status: 'Approved', user: 'Candace Wu', email: 'candace@untitledui.com', photo: 'https://via.placeholder.com/50' },
  { id: 6, offer: 'MSTR SELL', company: 'MicroStrategy, Inc.', amount: '$14,211.82', date: '2022-01-04', status: 'Approved', user: 'Natal Craig', email: 'natal@untitledui.com', photo: 'https://via.placeholder.com/50' },
];

const OffersList: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>(initialOffersData);
  const [selectedFilter, setSelectedFilter] = useState<string>('All offers');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dateRange, setDateRange] = useState<[Moment, Moment] | null>(null);
  const [selectedOffers, setSelectedOffers] = useState<number[]>([]);

  const filterOffers = () => {
    let filteredOffers = initialOffersData;

    if (selectedFilter !== 'All offers') {
      filteredOffers = filteredOffers.filter(offer => offer.status.toLowerCase() === selectedFilter.toLowerCase());
    }

    if (searchTerm) {
      filteredOffers = filteredOffers.filter(offer => offer.offer.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (dateRange) {
      filteredOffers = filteredOffers.filter(offer => {
        const offerDate = moment(offer.date);
        return offerDate.isBetween(dateRange[0], dateRange[1], undefined, '[]');
      });
    }

    setOffers(filteredOffers);
  };

  const deleteOffer = (id: number) => {
    setOffers(offers.filter(offer => offer.id !== id));
  };

  const handleSelectOffer = (id: number) => {
    setSelectedOffers(prevSelected => 
      prevSelected.includes(id) 
        ? prevSelected.filter(offerId => offerId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAllOffers = (e: any) => {
    if (e.target.checked) {
      setSelectedOffers(offers.map(offer => offer.id));
    } else {
      setSelectedOffers([]);
    }
  };

  const columns = [
    {
      title: <Checkbox onChange={handleSelectAllOffers} checked={selectedOffers.length === offers.length} />,
      dataIndex: 'checkbox',
      render: (_: any, record: Offer) => (
        <Checkbox checked={selectedOffers.includes(record.id)} onChange={() => handleSelectOffer(record.id)} />
      )
    },
    {
      title: 'Offer',
      dataIndex: 'offer',
      render: (text: string, record: Offer) => (
        <>
          <Text>{text}</Text><br />
          <Text type="secondary">{record.company}</Text>
        </>
      )
    },
    {
      title: 'Offer amount',
      dataIndex: 'amount'
    },
    {
      title: 'Date',
      dataIndex: 'date'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: string) => (
        <Text type={status.toLowerCase() as any}>{status}</Text>
      )
    },
    {
      title: 'Initiator',
      dataIndex: 'user',
      render: (text: string, record: Offer) => (
        <Space>
          <Avatar src={record.photo} />
          <div>
            <Text>{text}</Text><br />
            <Text type="secondary">{record.email}</Text>
          </div>
        </Space>
      )
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_: any, record: Offer) => (
        <Button type="link" icon={<DeleteOutlined />} onClick={() => deleteOffer(record.id)}>
          Delete
        </Button>
      )
    }
  ];

  return (
    <div className="offers-container">
      <Title level={2}>Offers</Title>
      <Text>View your offers list.</Text>
      
      <div className="offers-filters">
        <Button type={selectedFilter === 'All offers' ? 'primary' : 'default'} onClick={() => { setSelectedFilter('All offers'); filterOffers(); }}>All offers</Button>
        <Button type={selectedFilter === 'Approved' ? 'primary' : 'default'} onClick={() => { setSelectedFilter('Approved'); filterOffers(); }}>Approved</Button>
        <Button type={selectedFilter === 'Declined' ? 'primary' : 'default'} onClick={() => { setSelectedFilter('Declined'); filterOffers(); }}>Declined</Button>
      </div>

      <div className="offers-actions">
        <Input
          placeholder="Search for trades"
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); filterOffers(); }}
          style={{ width: 200, marginRight: 10 }}
        />
        <RangePicker onChange={(dates) => { setDateRange(dates as [Moment, Moment]); filterOffers(); }} style={{ marginRight: 10 }} />
        <Button type="default" icon={<FilterOutlined />} onClick={filterOffers}>
          Filter
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={offers}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default OffersList;
