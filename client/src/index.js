import React from 'react';
import ReactDOM from 'react-dom';
import { ProductsContextProvider } from './components/ShopPage/ProductsContext';
import App from './components/App';


ReactDOM.render(
  <React.StrictMode>
    <ProductsContextProvider>
    <App />
    </ProductsContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
