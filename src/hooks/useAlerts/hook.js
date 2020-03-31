// @flow

import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import AlertsService from '@services/api/AlertsService';

export const STORAGE_KEY = 'alerts_cache';

export default function useAlerts() {
  const [state, setState] = useState([]);

  const getCache = async () => {
    const str = await AsyncStorage.getItem(STORAGE_KEY);
    if (str === null) return [];
    const stateCache = JSON.parse(str);
    return stateCache;
  };

  const init = async () => {
    const cache = await getCache();
    setState(cache);
  };

  const refresh = async () => {
    const alertsResponse = await AlertsService.getAll();
    const cachedAlerts = await getCache();
    const alerts = alertsResponse.data.map((a, idx) => ({
      ...a,
      read: false,
      ...cachedAlerts[idx],
    }));
    alerts.sort((a1, a2) => a1.date < a2.date);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
    setState(alerts);
    return alerts;
  };

  const count = () => state.reduce((value, alert) => {
    if (!alert.read) return value + 1;
    return value;
  }, 0);

  const markAllAsRead = async () => {
    const alerts = await refresh();
    const newAlerts = alerts.map((a) => ({ ...a, read: true }));
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newAlerts));
    setState(newAlerts);
    return newAlerts;
  };

  useEffect(() => {
    init();
  }, []);


  const methods = {
    refresh,
    count,
    markAllAsRead,
  };
  return [state, methods];
}
