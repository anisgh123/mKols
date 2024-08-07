import React, { useState } from 'react';
import { Table, Space, DatePicker, Input, Button, Popconfirm } from 'antd';
import { SearchOutlined, FilterOutlined, CheckOutlined, CloseOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import './index.css';

const { RangePicker } = DatePicker;

const initialData = [
  {
    key: '1',
    offer: 'TSLA BUY',
    company: 'Tesla, Inc.',
    amount: '$30,021.23',
    date: 'Jan 13, 2022',
    business: 'Olivia Rhye',
    email: 'olivia@untitledui.com',
    price: '$5000',
  },
  {
    key: '2',
    offer: 'MTCH SELL',
    company: 'Match Group, Inc.',
    amount: '$10,045.00',
    date: 'Jan 13, 2022',
    business: 'Phoenix Baker',
    email: 'phoenix@untitledui.com',
    price: '$2000',
  },
  // Add other data entries here
];

const OffersListCreator: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const pageSize = 5;

  const handleDelete = (key: React.Key) => {
    setData(data.filter(item => item.key !== key));
  };

  const handleAccept = (key: React.Key) => {
    console.log(`Accepted offer with key: ${key}`);
    // Add your accept logic here
  };

  const handleReject = (key: React.Key) => {
    console.log(`Rejected offer with key: ${key}`);
    // Add your reject logic here
  };

  const columns = [
    {
      title: 'Offer',
      dataIndex: 'offer',
      key: 'offer',
    },
    {
      title: 'Offer Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Business',
      dataIndex: 'business',
      key: 'business',
      render: (text: string, record: any) => (
        <Space>
          <span>{text}</span>
          <a href={`mailto:${record.email}`}>{record.email}</a>
        </Space>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button type="text" icon={<EyeOutlined />}>View</Button>
          <Popconfirm
            title="Are you sure to accept this offer?"
            onConfirm={() => handleAccept(record.key)}
          >
            <Button type="text" icon={<CheckOutlined />} />
          </Popconfirm>
          <Popconfirm
            title="Are you sure to reject this offer?"
            onConfirm={() => handleReject(record.key)}
          >
            <Button type="text" icon={<CloseOutlined />} />
          </Popconfirm>
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(data.length / pageSize);

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
        dataSource={data.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
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

export default OffersListCreator;
