import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBar from '../../Components/SearchBar';
import ProfileCard from '../../Components/ProfileCard';
import ProfileDetails from '../../Components/Profiledeatils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`

`;

const Header = styled.header`
  grid-area: header;
  padding: 10px;
`;

const Content = styled.main`
  padding: 10px;
  display: flex;
  justify-content:center;
  flex-wrap:wrap;
  gap: 50px;
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
  followers:string;
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
  useEffect(()=>{    setSelectedUser(users?.[0])
  },[users])
const [selectedUser,setSelectedUser]=useState<any>(users?.[0])
  return (
    <PageContainer>
      <Header>
        <SearchBar />
      </Header>
      <Content>
        {users.map((user, index) => (
          <div onClick={()=> setSelectedUser(user)} >  <ProfileCard key={index} imageUrl={`http://localhost:5000/${user?.photo}`} name={user.firstName + user.lastName}   />
</div>
        ))}
      </Content>
      <Footer>
        <ProfileDetails handleNavigateToprofile={()=> navigate(`/profile/${selectedUser?._id}`)} data={selectedUser} />
      </Footer>
    </PageContainer>
  );
};

export default FilterProfile;
