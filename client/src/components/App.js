import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
// import Footer from "./Footer"
// import LandingPage from "./LandingPage"
import ShopPage from "./Shop";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />

      <Main>
        <Switch>
          <Route exact path="/">
            {/* <LandingPage /> */}
          </Route>

          <Route exact path="/shop">
            <ShopPage />
          </Route>

          <Route exact path="/shop/:item">
            {/* <ItemDetails /> */}
          </Route>

          <Route exact path="/checkout">
            {/* <Checkout /> */}
          </Route>

          <Route exact path="/order-confirmation">
            {/* <OrderConfirmation /> */}
          </Route>

          <Route path="">404: Oops!</Route>
        </Switch>
        {/* <Footer /> */}
      </Main>
    </BrowserRouter>
  );
}

export default App;
