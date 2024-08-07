// src/components/SearchBar.tsx
import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #2b3a47;
  border-radius: 15px;
  padding: 10px 20px;
  margin: 20px auto;
  width: 90%;
`;

const SearchIcon = styled.span`
  margin-right: 10px;
  color: #9e9e9e;
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  color: white;
  flex-grow: 1;
  outline: none;
  font-size: 16px;
  ::placeholder {
    color: #9e9e9e;
  }
`;

const GridIcon = styled.span`
  margin-left: 10px;
  color: #9e9e9e;
`;

const SearchBar: React.FC = () => {
  return (
    <SearchContainer>
      <GridIcon>
        <i className="fas fa-th-large"></i>
      </GridIcon>
      <SearchInput type="text" placeholder="Find the perfect KOLs for your campaign..." />
      <SearchIcon>
        <i className="fas fa-search"></i>
      </SearchIcon>
    </SearchContainer>
  );
};

export default SearchBar;
