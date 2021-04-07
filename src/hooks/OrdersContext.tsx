import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';

import * as OrderServices from '../services/orders';

export interface OrderProps {
  id: number;
  user_id: number;
  company_id: number;
  order_review_id: number;
  payment_type: string;
  is_delivery: boolean;
  total_price: number;
  shipping_price: number;
  street: string;
  number: number;
  district: string;
  city: string;
  state: string;
  complement: string;
  zipcode: number;
  status: string;
}

interface OrderState {
  orders: Array<Partial<OrderProps>>;
}

interface OrderContextData {
  orders: Array<Partial<OrderProps>>;
  loading: boolean;
  getAll: () => Promise<void>;
}

const OrderContext = createContext<OrderContextData>({} as OrderContextData);

const OrderProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<OrderState>({} as OrderState);
  const [loading, setLoading] = useState(false);

  const getAll = useCallback(async () => {
    try {
      const response = await OrderServices.getAll();
      setData({ orders: response.data });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <OrderContext.Provider value={{ orders: data.orders, loading, getAll }}>
      {children}
    </OrderContext.Provider>
  );
};

function useOrder(): OrderContextData {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error('useOder must be used within an OrderProvider');
  }
  return context;
}

export { OrderProvider, useOrder };
