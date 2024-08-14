import React, { useEffect, useState } from 'react';
import { Table, Space, DatePicker, Input, Button, Popconfirm, Modal, Typography } from 'antd';
import { SearchOutlined, FilterOutlined, CheckOutlined, CloseOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import './index.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const { RangePicker } = DatePicker;
const { Text } = Typography;

const OffersListCreator: React.FC = () => {
  const [offers, setOffers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [offerDelete, setOfferDelete] = useState<any>(false);

  const pageSize = 5;

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/userOffers`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setOffers(response.data);
      } catch (error) {
        console.error('Error fetching creator profiles:', error);
      }
    };

    fetchCreators();
  }, [offerDelete]);

  const handleDelete =async (key: React.Key) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/offer/${key}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setOfferDelete(!offerDelete)
      toast.success('Offer deleted  successful');

        } catch (error) {
      console.error('Error fetching creator profiles:', error);
    }
  };

  const handleAccept =async (key: React.Key) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/offer/${key}`,{status:"accepted"}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setOfferDelete(!offerDelete)
      toast.success('Offer accepted  successful');

        } catch (error) {
      console.error('Error fetching creator profiles:', error);
    }
  };

  const handleReject =async (key: React.Key) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/offer/${key}`,{status:"declined"}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setOfferDelete(!offerDelete)
      toast.success('Offer declined  successful');

        } catch (error) {
      console.error('Error fetching creator profiles:', error);
    }
  };

  const showViewModal = (offer: any) => {
    setSelectedOffer(offer);
    setViewModalVisible(true);
  };

  const handleViewModalCancel = () => {
    setViewModalVisible(false);
  };

  const columns = [
    {
      title: 'Business Email',
      dataIndex: 'businessemail',
      key: 'offer',
    },
    {
      title: 'Offer Amount',
      dataIndex: 'Offerprice',
      key: 'amount',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
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
          <Button type="text" icon={<EyeOutlined />} onClick={() => showViewModal(record)}>View</Button>
          <Popconfirm
            title="Are you sure to accept this offer?"
            onConfirm={() => handleAccept(record._id)}
          >
            <Button type="text" icon={<CheckOutlined />} />
          </Popconfirm>
          <Popconfirm
            title="Are you sure to reject this offer?"
            onConfirm={() => handleReject(record._id)}
          >
            <Button type="text" icon={<CloseOutlined />} />
          </Popconfirm>
          <Popconfirm
            title="Are you sure to delete this offer?"
            onConfirm={() => handleDelete(record._id)}
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

  const totalPages = Math.ceil(offers.length / pageSize);

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
        dataSource={offers.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
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

      {/* View Offer Modal */}
      <Modal
        title="View Offer"
        visible={viewModalVisible}
        onCancel={handleViewModalCancel}
        footer={[
          <Button key="back" onClick={handleViewModalCancel}>
            Close
          </Button>,
        ]}
      >
        {selectedOffer && (
          <div>
            <Text><strong>offer description :</strong> {selectedOffer.Offerdescription}</Text><br />
            <Text><strong>Business Email:</strong> {selectedOffer.businessemail}</Text><br />
            <Text><strong>Offer Amount:</strong> {selectedOffer.Offerprice}</Text><br />
            <Text><strong>Last Name:</strong> {selectedOffer.lastName}</Text><br />
            <Text><strong>Status:</strong> {selectedOffer.status}</Text><br />
            <Text><strong>Price:</strong> {selectedOffer.price}</Text><br />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OffersListCreator;
