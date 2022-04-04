import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
// import Footer from "./Footer"
import ShopPage from "./ShopPage";
import ItemDetails from "./ShopPage/ItemDetails";
import CartModal from "./Order/CartModal";
import Checkout from "./Order/Checkout";
import Confirmation from "./Order/Confirmation";
import Errorpage from "./Errorpage";
import LandingPage from "./LandingPage";
import CompanyListing from "./BrandsPage/CompanyListing";
import Footer from "./Footer";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Main>
        <CartModal />

        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>

          <Route exact path="/shop/:id">
            <ItemDetails />
          </Route>

          <Route exact path="/shop">
            <ShopPage />
          </Route>

          <Route exact path="/checkout">
            <Checkout />
          </Route>

          <Route exact path="/confirmation">
            <Confirmation />
          </Route>

          <Route exact path="/brands">
            <CompanyListing />
          </Route>

          <Route path="/errorpage">
            <Errorpage />
          </Route>
        </Switch>
        <Footer />
      </Main>
    </BrowserRouter>
  );
}

const Main = styled.div`
  position: relative;
`;

export default App;
