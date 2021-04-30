import React, { createContext, useCallback, useContext, useState } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { showMessage } from 'react-native-flash-message';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';

import {
  signIn as signInService,
  signUp as signUpService,
  sendToken,
} from '../services/auth';

interface User {
  id: number;
  email: string;
  name: string;
  cpf: string;
  phone_ddd: string;
  phone_number: string;
  profile_image_id: string;
  addresses: object;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  city: string;
  complement: string;
  cpf: string;
  district: string;
  email: string;
  number: string;
  password: string;
  phoneDdd: string;
  phoneNumber: string;
  state: string;
  street: string;
  username: string;
  zipCode: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  signUp(request: SignUpCredentials, goBack: any): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  // states
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // functions
  const registerForPushNotificationsAsync = async () => {
    try {
      if (Constants.isDevice) {
        const {
          status: existingStatus,
        } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
        await sendToken(token);
      } else {
        alert('Must use physical device for Push Notifications');
      }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'defaults',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    try {
      setLoading(true);
      const response = await signInService({ email, password });

      const { token, user } = response.data;

      await AsyncStorage.multiSet([
        ['@Delivery:token', token],
        ['@Delivery:user', JSON.stringify(user)],
      ]);

      setData({ token, user });
      registerForPushNotificationsAsync();
    } catch (error) {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        duration: 4500,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = useCallback(
    async (request: SignUpCredentials, goBack: any) => {
      try {
        setLoading(true);
        const requestObj = {
          ...request,
          phone_ddd: request.phoneDdd,
          phone_number: request.phoneNumber,
          zipcode: request.zipCode,
        };

        const response = await signUpService(requestObj);

        goBack();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const signOut = useCallback(() => {
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, signUp, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth, SignInCredentials };
