import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, DatePicker, Input, Button, Popconfirm } from 'antd';
import { SearchOutlined, FilterOutlined, DeleteOutlined } from '@ant-design/icons';
import './index.css';
import axios from 'axios';

const { RangePicker } = DatePicker;

const initialData = [
  {
    key: '1',
    offer: 'TSLA BUY',
    company: 'Tesla, Inc.',
    amount: '$30,021.23',
    date: 'Jan 13, 2022',
    status: 'Pending',
    influencer: 'Olivia Rhye',
    email: 'olivia@untitledui.com',
  },
  {
    key: '2',
    offer: 'MTCH SELL',
    company: 'Match Group, Inc.',
    amount: '$10,045.00',
    date: 'Jan 13, 2022',
    status: 'Approved',
    influencer: 'Phoenix Baker',
    email: 'phoenix@untitledui.com',
  },
  {
    key: '3',
    offer: 'DDOG BUY',
    company: 'Datadog Inc.',
    amount: '$40,132.16',
    date: 'Jan 13, 2022',
    status: 'Approved',
    influencer: 'Lana Steiner',
    email: 'lana@untitledui.com',
  },
  {
    key: '4',
    offer: 'ARKG BUY',
    company: 'ARK Genomic Revolution ETF',
    amount: '$22,665.12',
    date: 'Jan 13, 2022',
    status: 'Declined',
    influencer: 'Demi Wilkinson',
    email: 'demi@untitledui.com',
  },
  {
    key: '5',
    offer: 'SQ BUY',
    company: 'Square, Inc.',
    amount: '$18,221.30',
    date: 'Jan 12, 2022',
    status: 'Approved',
    influencer: 'Candice Wu',
    email: 'candice@untitledui.com',
  },
  {
    key: '6',
    offer: 'MSTR SELL',
    company: 'MicroStrategy Inc.',
    amount: '$24,118.18',
    date: 'Jan 12, 2022',
    status: 'Approved',
    influencer: 'Natali Craig',
    email: 'natali@untitledui.com',
  },
  // Add other data entries here
];

const OffersList: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [filter, setFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const pageSize = 5;
  const [offers, setOffers] = useState<any>();

  const handleDelete = (key: React.Key) => {
    setData(data.filter(item => item.key !== key));
  };

  const columns = [
    {
      title: 'Offer',
      dataIndex: 'offer',
      key: 'offer',
    },
    {
      title: 'Offer Amount',
      dataIndex: 'Offerprice',
      key: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'geekblue';
        if (status === 'Pending') color = 'orange';
        if (status === 'Approved') color = 'green';
        if (status === 'Declined') color = 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Influencer',
      dataIndex: 'creator',
      key: 'influencer',
      render: (text: any) => (
        <Space>
          <span>{text?.firstName || 'Unknown'}</span>
          <a href={`mailto:${text?.email || ''}`}>{text?.email || 'No email provided'}</a>
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure to delete this offer?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button type="text" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const userData: any = JSON.parse(localStorage.getItem("userProfile") || '{}');

  useEffect(() => {
    if (userData?.email) {
      const fetchCreators = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/businessOffer?email=${userData.email}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          setOffers(response.data);
        } catch (error) {
          console.error('Error fetching creator profiles:', error);
        }
      };

      fetchCreators();
    } else {
      console.error("User data is not available.");
    }
  }, [userData]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const filteredData = data.filter(item => {
    if (filter === 'All') return true;
    if (filter === 'Approved') return item.status === 'Approved';
    if (filter === 'Declined') return item.status === 'Declined';
    return false;
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record: any) => ({
      style: { color: '#F29219' },
    }),
  };

  return (
    <div className="offers-container">
      <div className="offers-header">
        <h2>Offers</h2>
        <p>View your offers list.</p>
        <div className="offers-filters">
          <Button type="text" onClick={() => handleFilterChange('All')}>All offers</Button>
          <Button type="text" onClick={() => handleFilterChange('Approved')}>Accepted</Button>
          <Button type="text" onClick={() => handleFilterChange('Declined')}>Declined</Button>
        </div>
        <div className="offers-search-filter">
          <Input placeholder="Search for trades" prefix={<SearchOutlined />} />
          <RangePicker />
          <Button icon={<FilterOutlined />} type="default">Filters</Button>
        </div>
      </div>
      <Table
        className="offers-table"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={offers ? offers.slice((currentPage - 1) * pageSize, currentPage * pageSize) : []}
        pagination={false}
      />
      <div className="offers-pagination">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default OffersList;
