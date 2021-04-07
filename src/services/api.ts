import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
  baseURL: 'https://continuelab.com.br/deliverie/',
});

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('@Delivery:token');
  const headers = { ...config.headers };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
    headers.Accept = 'application/json';
  }

  return { ...config, headers };
});

export default api;
