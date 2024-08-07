import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBar from '../../Components/SearchBar';
import ProfileCard from '../../Components/ProfileCard';
import ProfileDetails from '../../Components/Profiledeatils';
import axios from 'axios';

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
  width: 100%;
  height: 100px;
`;

interface User {
  photo: string;
  firstName: string;
  isCreator: boolean;
  lastName:string;
}

const FilterProfile: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

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
          <ProfileCard key={index} imageUrl={user.photo} name={user.firstName + user.lastName} />
        ))}
      </Content>
      <Footer>
        <ProfileDetails />
      </Footer>
    </PageContainer>
  );
};

export default FilterProfile;
