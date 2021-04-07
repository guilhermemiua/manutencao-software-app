import React, { createContext, useCallback, useContext, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

import { signIn as signInService } from '../services/auth';
import { useNavigation } from '@react-navigation/native';
import { Images } from './CompanyContext';
import { fetchProducts } from '../services/products';

export interface Product {
  id: number;
  company_id: number;
  product_image_id: number;
  name: string;
  price: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  product_category_id: number;
  productImages: Images;
  product_category: ProductCategory;
}

export interface ProductCategory {
  id: number;
  name: string;
}

interface ProductState {
  products: Array<Partial<Product>>;
}

interface ProductContextData {
  products: Array<Partial<Product>>;
  loading: boolean;
  getProducts: (companyId: number) => Promise<void>;
  categories: Array<ProductSection>;
  updateProducts: () => void
}

export interface ProductSection {
  title: string;
  data: Array<ProductSection>;
}

const ProductContext = createContext<ProductContextData>(
  {} as ProductContextData,
);

const ProductProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<ProductState>({} as ProductState);
  const [categories, setCategories] = useState<Array<ProductSection>>(
    [] as Array<ProductSection>,
  );
  const [loading, setLoading] = useState(false);

  const getProducts = async (companyId: number) => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const response = await fetchProducts(companyId);
      const { data: productsResult } = response;

      const categoriesSections = {};

      // eslint-disable-next-line no-unused-expressions
      productsResult?.forEach((item: Product) => {
        const section = categoriesSections[String(item?.product_category?.name)] ?? [];

        categoriesSections.[String(item?.product_category?.name)] = [...section, item];
      });

      const categoriesMap = Object.entries(categoriesSections).map(([key, value]) => ({ title: key !== "undefined" ? key : "Geral", data: value}))
      setCategories(categoriesMap);
      setData({ products: productsResult });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateProducts = () => {
    console.log('asd')
    setData({products: []})
    setCategories([])
  }

  return (
    <ProductContext.Provider
      value={{ loading, products: data.products, getProducts, categories, updateProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};

function useProduct(): ProductContextData {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('useProduct must be used within an ProductProvider');
  }
  return context;
}

export { ProductProvider, useProduct };
