import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthStack from './AuthStack';

import BottomTab from './BottomTab';
import { useAuth } from '../hooks/AuthContext';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen
          component={BottomTab}
          name="BottomTab"
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          component={AuthStack}
          name="Auth"
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default Routes;
