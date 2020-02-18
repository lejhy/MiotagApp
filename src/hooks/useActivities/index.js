// @flow

import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

import ActivitiesService from '@services/api/ActivitiesService';

export const STORAGE_KEY = 'activities_cache';

export default function useActivities() {
  const [state, setState] = useState({ activities: [], logs: [] });

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
    const logsFiltered = logs.filter((l) => l.activity.id === id);
    logsFiltered.sort((a, b) => new Date(b.date) - new Date(a.date));
    return logsFiltered[0];
  };

  const refresh = async () => {
    const activitiesResponse = await ActivitiesService.getAll();
    const logsResponse = await ActivitiesService.getAllLogs();

    let logs = [...logsResponse.data];
    logs.sort((a, b) => new Date(a.date) - new Date(b.date));
    let activities = [];
    let disabledActivities = [];
    // eslint-disable-next-line
    for (const activity of activitiesResponse.data) {
      if (activity.enabled) {
        activities = [...activities, activity];
      } else {
        disabledActivities = [...disabledActivities, activity];
        logs = logs.filter((l) => l.activity.id !== activity.id);
      }
    }
    activities = activities.map((a) => {
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

  const newLog = async (activityId, length, score) => {
    const log = {
      activity: activityId,
      length: length,
      score: score
    };
    const newLogResponse = await ActivitiesService.newLog(log);
    const logs = [...logs, newLogResponse];

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
    newLog,
  };
  return [state, methods];
}
