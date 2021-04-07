import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListCompanies from '../pages/ListCompanies';
import ProductStack from './ProductStack';

const Company = createStackNavigator();

const CompaniesStack: React.FC = () => {
  return (
    <Company.Navigator>
      <Company.Screen
        name="ListCompanies"
        component={ListCompanies}
        options={{ headerShown: false }}
      />
      <Company.Screen
        name="ListProducts"
        component={ProductStack}
        options={{ headerShown: false }}
      />
    </Company.Navigator>
  );
};

export default CompaniesStack;
