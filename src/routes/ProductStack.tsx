import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListProducts from '../pages/ListProducts';

const Product = createStackNavigator();

const ProductStack: React.FC = () => {
  return (
    <Product.Navigator>
      <Product.Screen
        name="ListProducts"
        component={ListProducts}
        options={{ headerShown: false }}
      />
    </Product.Navigator>
  );
};

export default ProductStack;
