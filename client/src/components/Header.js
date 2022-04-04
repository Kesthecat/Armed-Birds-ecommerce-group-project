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
      <img src="./Logo.png" alt="Armed-Bird" />
      {/* <Search>
        <input type="text" />
        <SearchWrapper>
          <BsSearch />
        </SearchWrapper>
      </Search> */}
      <HeaderNav>
        <Shop>
          <NavLink
            activeClassName="active"
            activeStyle={{ color: "white" }}
            color="white"
            to="/shop"
          >
            Shop
          </NavLink>
        </Shop>

        <About>
          <NavLink
            activeClassName="active"
            activeStyle={{ color: "white" }}
            to="/about"
            style={{ textdecoration: "none" }}
          >
            About{" "}
          </NavLink>
        </About>

        <Brand>
          <NavLink
            activeClassName="active"
            activeStyle={{ color: "white" }}
            color="white"
            to="/brands"
          >
            Brand{" "}
          </NavLink>
        </Brand>

        {/* <Cart onClick={handleClick}>
          Cart<span>0</span>
        </Cart> */}
        <BasketWrapper onClick={handleClick}>
          <MdOutlineShoppingBasket size="20px" />
          <span>0</span>
        </BasketWrapper>
      </HeaderNav>
    </HeaderContauner>
  );
};

export default Header;

const HeaderContauner = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  background-color: var(--color-main);
  position: sticky;

  top: 0;
  z-index: 100;

  img {
    width: 160px;
    object-fit: contain;
    margin: 0 40px;
    /* padding-left: 20px; */
  }
`;

// const Search = styled.div`
//   display: flex;
//   flex: 1;
//   align-items: center;
//   border-radius: 24px;
//   height: 14px;

//   input {
//     height: 12px;
//     padding: 10px;
//     border: none;
//     width: 80%;
//   }
// `;

// const SearchWrapper = styled.div`
//   padding: 8px;
//   height: 32px !important;
//   background-color: #cd9042;
// `;

const HeaderNav = styled.div`
  display: flex;
  margin: 0 320px;
  padding: 0 300px;
  justify-content: space-between;
  font-family: var(--font-subheading);
  font-size: 20px;
`;

const Shop = styled.div`
  /* display: flex;
  flex-direction: column; */
  margin-left: 30px;
  margin-right: 10px;
  color: white;
`;

const About = styled.div`
  /* display: flex; */

  margin-left: 30px;
  margin-right: 10px;
`;

// const Cart = styled.div`
//   /* display: flex; */

//   margin-left: 10px;
//   margin-right: 10px;
//   color: white;

//   span {
//     /* padding: 5px; */
//   }
// `;

const BasketWrapper = styled.div`
  display: flex;
  align-items: center;
  color: white;
  margin-left: 120px;
  margin-right: 10px;

  span {
    margin-left: 10px;
    margin-right: 10px;
    font-size: 16px;
    margin-top: 8px;
  }
`;

const Brand = styled.div`
  display: flex;

  margin-left: 30px;
  margin-right: 10px;
`;
// const NavLink = styled.link``;

// const NavLink = styled.link``;
