import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import AppProvider from '../hooks';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <Auth.Navigator>
      <Auth.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
