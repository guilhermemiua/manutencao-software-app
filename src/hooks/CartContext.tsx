import React, { createContext, useCallback, useContext, useState } from 'react';

import * as OrderServices from '../services/orders';

import { useAuth } from './AuthContext';
import { Product } from './ProductsContext';
import { Company } from './CompanyContext';

interface CartProduct extends Product {
  quantity: number;
}

interface CartState {
  company: Partial<Company>;
  products: Array<Partial<CartProduct>>;
}

interface CartContextData {
  products: Array<Partial<CartProduct>>;
  company: Partial<Company>;
  isLoading: boolean;
  addProduct(newProduct: Partial<CartProduct>): void;
  addCompany(company: Partial<Company>): void;
  clearList(): void;
  removeProduct(productId: number): void;
  checkoutOrder(paymentType: number, redirect: any): Promise<void>;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

const CartProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<CartState>({
    company: {},
    products: [],
  } as CartState);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();

  const addProduct = useCallback(
    (newProduct: CartProduct) => {
      const productIndex = data.products.findIndex(
        product => product.id === newProduct.id,
      );

      if (productIndex > -1) {
        const newArray = [...data.products];
        const product = newArray[productIndex];

        newArray[productIndex] = {
          ...product,
          quantity: product.quantity + 1,
        };

        setData(previousData => ({
          ...previousData,
          products: newArray,
        }));
        return;
      }
      setData(previousData => ({
        ...previousData,
        products: [
          ...previousData.products,
          { ...newProduct, quantity: 1, price: Number(newProduct.price) },
        ],
      }));
    },
    [data.products],
  );

  const clearList = useCallback(
    () => setData({ products: [], company: {} }),
    [],
  );

  const removeProduct = useCallback(
    (productId: number) => {
      const productIndex = data.products.findIndex(
        product => product.id === productId,
      );

      if (productIndex > -1) {
        const newArray = [...data.products];
        const product = newArray[productIndex];

        if (product.quantity === 1) {
          newArray.splice(productIndex, 1);
          setData(previousData => ({
            ...previousData,
            products: newArray,
          }));
        } else {
          newArray[productIndex] = {
            ...product,
            quantity: product.quantity - 1,
          };

          setData(previousData => ({
            ...previousData,
            products: newArray,
          }));
        }
      }
    },
    [data.products],
  );

  const addCompany = useCallback(
    (company: Company) =>
      setData(previousData => ({
        ...previousData,
        company,
      })),
    [],
  );

  const checkoutOrder = useCallback(
    async (paymentType: number, closeModalAndRedirect: any) => {
      try {
        setIsLoading(true);

        const response = await OrderServices.create({
          payment_type: paymentType,
          is_delivery: true,
          products: data.products,
          company_id: data.company.id,
          address_id: user?.addresses?.[0].id,
        });
        closeModalAndRedirect();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [data.company.id, data.products, user],
  );

  return (
    <CartContext.Provider
      value={{
        products: data.products,
        company: data.company,
        addProduct,
        clearList,
        removeProduct,
        addCompany,
        isLoading,
        checkoutOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within an OrderProvider');
  }
  return context;
}

export { CartProvider, useCart };
