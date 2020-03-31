// @flow

import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import RelationService from '@services/api/RelationService';

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
    const followResponse = await RelationService.getUsersFollowed();

    const newState = followResponse.data;
    newState.sort((f1, f2) => f1.firstName > f2.firstName);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    setState(newState);
    return newState;
  };

  const unfollow = async (id) => {
    const newState = state.filter((u) => u.id !== id);
    setState(newState);
    await RelationService.unfollowUser(id);
    await refresh();
  };

  useEffect(() => {
    init();
  }, []);


  const methods = {
    init,
    refresh,
    unfollow,
  };
  return [state, methods];
}
