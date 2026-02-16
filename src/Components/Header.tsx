import React from 'react';
import styled from 'styled-components';
import amazonLogo from "../Assets/amazonLogo.png";
import SearchBar from "./SearchForm.tsx";
import {useNavigate} from "react-router-dom";
import routers from "../Constants/routers.tsx";

const HeaderContainer = styled.header`
  background: linear-gradient(to bottom, #131921, #131921);
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  z-index: 1000;
  height: 80px;
`;

const Logo = styled.img`
  height: 24px;
  width: auto;
  object-fit: contain;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Header = () => {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <Logo src={amazonLogo} alt="Amazon Logo" onClick={() => navigate(routers.home)}/>
      <SearchContainer>
        <SearchBar />
      </SearchContainer>
    </HeaderContainer>
  );
};

export default Header;