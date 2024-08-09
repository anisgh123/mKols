import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBar from '../../Components/SearchBar';
import ProfileCard from '../../Components/ProfileCard';
import ProfileDetails from '../../Components/Profiledeatils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  display: grid;
  grid-template-areas:
    'header header'
    'sidebar content'
    'footer footer';
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  height: 80vh;
`;

const Header = styled.header`
  grid-area: header;
  padding: 10px;
`;

const Content = styled.main`
  grid-area: content;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  height: 350px;
`;

const Footer = styled.footer`
  grid-area: footer;
  padding: 10px;
  width: 95%;
  height: 100px;
  margin-buttom:0px;
  margin-top:100px;
`;

interface User {
  imageUrl: string;
  firstName: string;
  isCreator: boolean;
  lastName:string;
  photo:string;
  _id:string
}

const FilterProfile: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
const navigate =useNavigate()

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/creators');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching creator profiles:', error);
      }
    };

    fetchCreators();
  }, []);

  return (
    <PageContainer>
      <Header>
        <SearchBar />
      </Header>
      <Content>
        {users.map((user, index) => (
          <div onClick={()=> navigate(`/profile/${user?._id}`)} >          <ProfileCard key={index} imageUrl={user.photo} name={user.firstName + user.lastName} />
</div>
        ))}
      </Content>
      <Footer>
        <ProfileDetails />
      </Footer>
    </PageContainer>
  );
};

export default FilterProfile;
