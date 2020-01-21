// @flow

import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import UserService from '@services/api/UserService';

export const STORAGE_KEY = 'friends_cache';

export default function useFriends() {
  const [state, setState] = useState([]);

  const init = async () => {
    const str = await AsyncStorage.getItem(STORAGE_KEY);
    if (str === null) return null;
    const stateCache = JSON.parse(str);
    setState(stateCache);
    return stateCache;
  };

  const refresh = async () => {
    const followResponse = await UserService.getUsersFollowed();

    const newState = followResponse.data;
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    setState(newState);
    return newState;
  };

  useEffect(() => {
    init();
  }, []);


  const methods = {
    init,
    refresh,
  };
  return [state, methods];
}