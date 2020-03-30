// @flow

import { useContext } from 'react';

import { AlertsContext } from './provider';

const useAlerts = () => useContext(AlertsContext);
export default useAlerts;
