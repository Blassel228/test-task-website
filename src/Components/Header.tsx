import React, {useEffect} from 'react';
import styled from 'styled-components';
import amazonLogo from "../Assets/amazonLogo.png";
import SearchBar from "./SearchForm.tsx";

const HeaderContainer = styled.header`
  background: linear-gradient(to bottom, #131921, #131921);
  width: 100%;
  position: fixed;
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
  useEffect(() => {
    const vite_url = import.meta.env.VITE_SUPABASE_URL!;
    console.log(vite_url)
  }, [])
  return (
    <HeaderContainer>
      <Logo src={amazonLogo} alt="Amazon Logo" />
      <SearchContainer>
        <SearchBar />
      </SearchContainer>
    </HeaderContainer>
  );
};

export default Header;