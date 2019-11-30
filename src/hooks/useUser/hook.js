// @flow

import { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import UserService from '@services/api/UserService';

const STORAGE_KEY = 'user';


export default function useUser() {
  const [state, setState] = useState(null);

  const init = async () => {
    const userStr = await AsyncStorage.getItem(STORAGE_KEY);
    if (userStr === null) return null;
    const user = JSON.parse(userStr);
    setState(user);
    return user;
  };

  const register = async (email, password) => {
    const response = await UserService.register({ email, password });
    const user = {
      ...response.data,
      password,
    };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    setState(user);
  };

  const login = async (email, password) => {
    const response = await UserService.login(email, password);
    console.log(response.data);
  };

  const update = async (user) => {
    const newUser = {
      ...state,
      ...user,
    };
    await UserService.update(newUser);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setState(newUser);
  };

  const getFullName = () => (state ? `${state.firstName} ${state.lastName}` : '');


  const methods = {
    init,
    register,
    login,
    update,
    getFullName,
  };
  return [state, methods];
}
