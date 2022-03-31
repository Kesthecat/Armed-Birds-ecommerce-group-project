import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

const Header = () => {
  return (
    <HeaderContauner>
      <h1>Logo</h1>
      <Search>
        <input type="text" />
        <SearchWrapper>
          <SearchIcon />
        </SearchWrapper>
      </Search>
      <HeaderNav>
        <Shop>Shop</Shop>
        <About>About</About>
        <Cart>
          {" "}
          <ShoppingBasketIcon />
        </Cart>
        <BasketWrapper>
          <ShoppingBasketIcon />
          <span>0</span>
        </BasketWrapper>
      </HeaderNav>
    </HeaderContauner>
  );
};

export default Header;

const HeaderContauner = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  background-color: #131921;
  position: sticky;
  top: 0;
  z-index: 100;

  h1 {
    width: 100px;
    object-fit: contain;
    margin: 0 20px;
    margin-top: 18px;
    color: white;
    margin-bottom: 15px;
  }
`;

const Search = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  border-radius: 24px;

  input {
    height: 12px;
    padding: 10px;
    border: none;
    width: 80%;
  }
`;

const SearchWrapper = styled.div`
  padding: 5px;
  height: 22px !important;
  background-color: #cd9042;
`;

const HeaderNav = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Shop = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-right: 10px;
  color: white;
`;

const About = styled.div`
  display: flex;

  margin-left: 10px;
  margin-right: 10px;
  color: white;
`;

const Cart = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-right: 10px;
  color: white;
`;

const BasketWrapper = styled.div`
  display: flex;
  align-items: center;
  color: white;

  span {
    margin-left: 10px;
    margin-right: 10px;
  }
`;
