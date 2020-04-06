// @flow

import { useState, useEffect, useRef } from 'react';

import AlertsService from '@services/api/AlertsService';
import useUser from '@hooks/useUser';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function useAlerts() {
  const [state, setState] = useState([]);
  const [user] = useUser();

  const refresh = async () => {
    if (user !== null) {
      const alertsResponse = await AlertsService.getAll();
      const alerts = alertsResponse.data;
      alerts.sort((a1, a2) => a1.date < a2.date);
      setState(alerts);
      return alerts;
    }
    return null;
  };

  const count = () => state.reduce((value, alert) => {
    if (!alert.read) return value + 1;
    return value;
  }, 0);

  const markAllAsRead = async () => {
    const readResponse = await AlertsService.markAllAsRead();
    const alerts = readResponse.data;
    alerts.sort((a1, a2) => a1.date < a2.date);
    setState(alerts);
    return alerts;
  };

  const init = async () => {
    await refresh();
  };

  // refresh alerts every 10s
  useInterval(() => {
    refresh();
  }, 10000);

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
