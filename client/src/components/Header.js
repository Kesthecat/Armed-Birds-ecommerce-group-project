import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { OrderContext } from "./Order/OrderContext";
import { MdOutlineShoppingBasket } from "react-icons/md";

const Header = () => {
  const { setDisplayModal, selectedItems } =
    useContext(OrderContext);

  //total number items in cart
  let itemsTally = 0;
  selectedItems.forEach(
    (item) => (itemsTally = itemsTally + Number(item.quantity))
  );

  //display modal if cart button is clicked
  const handleClick = () => {
    setDisplayModal(true);
  };

  return (
    <HeaderContainer>

      <HeaderNavLink to="/">
        <img src="./Logo.png" alt="Armed-Bird" />
      </HeaderNavLink>

      <HeaderNav>

        <PageLink>
          <HeaderNavLink activeClassName="active" to="/shop">Shop</HeaderNavLink>
        </PageLink>

        <PageLink>
          <HeaderNavLink activeClassName="active" to="/brands">Brands</HeaderNavLink>
        </PageLink>

        <PageLink>
          <HeaderNavLink activeClassName="active" to="/order">My Order</HeaderNavLink>
        </PageLink>

        <BasketWrapper onClick={handleClick}>
          <MdOutlineShoppingBasket size="30px" />
          <Tally>{itemsTally}</Tally>
        </BasketWrapper>

      </HeaderNav>

    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  background-color: var(--color-main);
  position: sticky;
  top: 0;
  z-index: 100;
  justify-content: space-between;

  img {
    width: 160px;
    object-fit: contain;
    margin: 0 40px;
  }
`;

const Tally = styled.span`
  font-weight: bold;
`;

const HeaderNav = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: var(--font-subheading);
  font-size: 20px;
  align-items: center;
  width: max-content;
`;

const HeaderNavLink = styled(NavLink)`
  color: white;
  font-size: 25px;
`;

const PageLink = styled.div`
  margin-left: 30px;
  margin-right: 10px;
  color: white;

  &:hover {
    color: var(--color-secondary);
  }
  
  .active {
    color: var(--color-secondary);
  }
`;

const BasketWrapper = styled.div`
  display: flex;
  align-items: center;
  color: white;
  padding: 0 30px;
  cursor: pointer;

  &:hover {
    color: var(--color-secondary);
  }

  span {
    margin-left: 10px;
    margin-right: 10px;
    font-size: 25px;
    margin-top: 8px;
  }
`;
