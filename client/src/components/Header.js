import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { OrderContext } from "./Order/OrderContext";
import { AiOutlineSearch } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { MdOutlineShoppingBasket } from "react-icons/md";

// import SearchIcon from "@material-ui/icons/Search";
// import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

const Header = () => {
  const { displayModal, setDisplayModal } = useContext(OrderContext);

  const handleClick = () => {
    setDisplayModal(true);
  };

  return (
    <HeaderContauner>
      <h1>Logo</h1>
      <Search>
        <input type="text" />
        <SearchWrapper>
          <BsSearch />
        </SearchWrapper>
      </Search>
      <HeaderNav>
        <Shop>
          <NavLink
            activeClassName="active"
            activeStyle={{ color: "teal" }}
            color="white"
            to="/shop"
          >
            Shop
          </NavLink>
        </Shop>

        <About>
          <NavLink
            activeClassName="active"
            activeStyle={{ color: "teal" }}
            color="white"
            to="/about"
          >
            About{" "}
          </NavLink>
        </About>

        <Cart onClick={handleClick}>
          Cart<span>0</span>
        </Cart>
        {/* <BasketWrapper onClick={handleClick}>
          <MdOutlineShoppingBasket size="16px" />
        </BasketWrapper> */}
      </HeaderNav>
    </HeaderContauner>
  );
};

export default Header;

const HeaderContauner = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  background-color: var(--color-main);
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
  height: 14px;

  input {
    height: 12px;
    padding: 10px;
    border: none;
    width: 80%;
  }
`;

const SearchWrapper = styled.div`
  padding: 8px;
  height: 32px !important;
  background-color: #cd9042;
`;

const HeaderNav = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-right: 20px;
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
`;

const Cart = styled.div`
  display: flex;

  margin-left: 10px;
  margin-right: 10px;
  color: white;

  span {
    padding-left: 5px;
  }
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
// const NavLink = styled.link``;
