import React from 'react';
import ReactDOM from 'react-dom';
import { ProductsContextProvider } from './components/ShopPage/ProductsContext';
import { OrderContextProvider } from './components/Order/OrderContext';
import App from './components/App';


ReactDOM.render(
  <React.StrictMode>
    <ProductsContextProvider>
      <OrderContextProvider>
        <App />
      </OrderContextProvider>
    </ProductsContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
