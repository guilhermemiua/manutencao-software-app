import api from './api';
import { SignInCredentials } from '../hooks/AuthContext';

export const signIn = ({ email, password }: SignInCredentials): any => {
  return api.request({
    method: 'POST',
    url: 'users/authenticate',
    data: {
      email,
      password,
    },
  });
};

export const signUp = (requestObj: object): any => {
  return api.request({
    method: 'POST',
    url: 'users',
    data: requestObj,
  });
};
