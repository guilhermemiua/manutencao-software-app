import React, { createContext, useCallback, useContext, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import { useNavigation } from '@react-navigation/native';
import api from '../services/api';

import {
  signIn as signInService,
  signUp as signUpService,
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
    } catch (error) {
      console.log(error);
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
