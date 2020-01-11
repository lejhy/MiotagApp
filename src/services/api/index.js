// @flow

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { API_URL } from 'react-native-dotenv';

import { STORAGE_KEY } from '@hooks/useUser/hook';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (request) => {
  const userStr = await AsyncStorage.getItem(STORAGE_KEY);
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      request.auth = { username: user.email, password: user.password };
    } catch (er) {
      console.warn(er);
    }
  }
  console.log('Starting Request', request);
  return request;
});

api.interceptors.response.use((response) => {
  console.log('Response:', response);
  return response;
});

export default api;
