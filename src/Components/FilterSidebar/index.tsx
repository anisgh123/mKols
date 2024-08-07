import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`{}
  width: 25%;
  height: 70%;
  background-color: #2b3a47;
  padding: 20px;
  color: white;
  overflow-y: auto;
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Section = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 10px;
`;

const Button = styled.button`
  background-color: #ff7f50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  margin-bottom: 10px;
`;

const Slider = styled.input.attrs({ type: 'range' })`
  width: 100%;
  margin: 5px 0;
`;

const FilterSidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <Title>
        Filter
        <span style={{ cursor: 'pointer', color: 'gray' }}>Clear All</span>
      </Title>

      <Section>
        <Label>Location</Label>
        {['France', 'Japan', 'United States', 'Chile', 'Venezuela'].map((country, index) => (
          <Label key={index}>
            <Checkbox />
            <span>{country} (1k+)</span>
          </Label>
        ))}
      </Section>

      <Button>Find KOLs near me</Button>

      <Section>
        <Label>Languages</Label>
        {['Vietnamese', 'Japanese', 'Chinese', 'English'].map((language, index) => (
          <Label key={index}>
            <Checkbox />
            <span>{language} (100)</span>
          </Label>
        ))}
      </Section>

      <Section>
        <Label>Niche</Label>
        {['Food', 'Fashion', 'Travel', 'Beauty', 'Technology', 'Fitness', 'Entertainment'].map((niche, index) => (
          <Label key={index}>
            <Checkbox />
            <span>{niche} (100)</span>
          </Label>
        ))}
      </Section>

      <Section>
        <Label>Advance</Label>
        <Label>
          <Checkbox />
          Verified Account
        </Label>
        <Label>
          <Checkbox />
          Have video?
        </Label>
        <Label>
          <Checkbox />
          Top pick?
        </Label>
      </Section>

      <Section>
        <Label>Follow</Label>
        {['0', '500k', '1M'].map((value, index) => (
          <div key={index}>
            <Slider min="0" max="500" />
            <span>{value}</span>
          </div>
        ))}
      </Section>
    </SidebarContainer>
  );
};

export default FilterSidebar;
