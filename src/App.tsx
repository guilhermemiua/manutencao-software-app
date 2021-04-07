import React from 'react';
import { StatusBar, View, LogBox } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AppProvider from './hooks';
import Routes from './routes';
import { colors } from './constants';

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

const AppContainer: React.FC = props => {
  return (
    <AppProvider {...props}>
      <Routes {...props} />
    </AppProvider>
  );
};

const Stack = createStackNavigator();

const App: React.FC = () => {
  LogBox.ignoreAllLogs();
  return (
    <View style={{ flex: 1, backgroundColor: colors.primaryDark }}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            component={AppContainer}
            name="Root"
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
