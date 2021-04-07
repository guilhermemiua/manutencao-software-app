import React from 'react';

import { AuthProvider } from './AuthContext';
import { CompanyProvider } from './CompanyContext';
import { OrderProvider } from './OrdersContext';
import { ProductProvider } from './ProductsContext';
import { CartProvider } from './CartContext';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <CompanyProvider>
      <OrderProvider>
        <ProductProvider>
          <CartProvider>{children}</CartProvider>
        </ProductProvider>
      </OrderProvider>
    </CompanyProvider>
  </AuthProvider>
);

export default AppProvider;
