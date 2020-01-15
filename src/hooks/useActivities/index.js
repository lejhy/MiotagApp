// @flow

import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

import ActivitiesService from '@services/api/ActivitiesService';
import DATE_FORMAT from '@constants/dateFormat';

export const STORAGE_KEY = 'activities_cache';

export default function useActivities() {
  const [state, setState] = useState([]);

  const init = async () => {
    const str = await AsyncStorage.getItem(STORAGE_KEY);
    if (str === null) return null;
    const stateCache = JSON.parse(str);
    setState(stateCache);
    return stateCache;
  };

  const getLastLog = (logs, id) => {
    if (!logs) {
      return null;
    }
    const logsFiltered = logs.filter((l) => l.id === id);
    logsFiltered.sort((a, b) => new Date(b.date) - new Date(a.date));
    return logsFiltered[0];
  };

  const refresh = async () => {
    const activitiesResponse = await ActivitiesService.getAll();
    const logsResponse = await ActivitiesService.getAllLogs();

    const logs = logsResponse.data;
    const activities = activitiesResponse.data
      .filter((a) => a.enabled)
      .map((a) => {
        const lastLog = getLastLog(logs, a.id);
        return {
          ...a,
          lastPlayed: lastLog ? moment(lastLog.date).fromNow() : 'never',
        };
      });

    const newState = { activities, logs };
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
