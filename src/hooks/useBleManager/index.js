// @flow

import { useContext } from 'react';

import { BleManagerContext } from './provider';

const useBleManager = () => useContext(BleManagerContext);
export default useBleManager;
