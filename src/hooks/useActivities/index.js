// @flow

import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import ActivitiesService from '@services/api/ActivitiesService';

export const STORAGE_KEY = 'activities_cache';

export default function useActivities() {
  const [state, setState] = useState([]);

  const init = async () => {
    const str = await AsyncStorage.getItem(STORAGE_KEY);
    if (str === null) return null;
    const activities = JSON.parse(str);
    setState(activities);
    return activities;
  };

  const refresh = async () => {
    const response = await ActivitiesService.getAll();
    const activities = response.data;
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
    setState(activities);
    return activities;
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
