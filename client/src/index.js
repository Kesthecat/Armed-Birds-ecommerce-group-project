import React from 'react';
import ReactDOM from 'react-dom';
import { ProductsContextProvider } from './components/ShopPage/ProductsContext';
import { OrderContextProvider } from './components/Order/OrderContext';
import App from './components/App';
import { CompaniesContextProvider } from './components/BrandsPage/CompaniesContext';


ReactDOM.render(
  <React.StrictMode>
    <ProductsContextProvider>
      <OrderContextProvider>
        <CompaniesContextProvider>
          <App />
        </CompaniesContextProvider>
      </OrderContextProvider>
    </ProductsContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
