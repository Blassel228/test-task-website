import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 2px solid #f0f0f0;
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const SearchInput = styled.input`
  width: 600px;
  border: none;
  outline: none;
  font-size: 16px;
  height: 10px;
  padding: 8px;
  background: transparent;
  
  &::placeholder {
    color: #999;
  }
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-left: 12px;
`;

const SearchIcon = styled.svg`
  width: 24px;
  height: 24px;
  fill: #ff6600; 
  transition: transform 0.2s;
  
  ${SearchButton}:hover & {
    transform: scale(1.1);
  }
`;

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log('Search:', searchTerm);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Enter query for search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchButton type="submit">
          <SearchIcon viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </SearchIcon>
        </SearchButton>
      </SearchContainer>
    </form>
  );
};

export default SearchBar;