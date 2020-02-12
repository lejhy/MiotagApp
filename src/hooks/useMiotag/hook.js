// @flow

import {
  useState, useEffect, useRef, useReducer,
} from 'react';
import { BleManager, ConnectionPriority } from 'react-native-ble-plx';
// import { throttleTime } from 'rxjs/operators';
// import { Subject } from 'rxjs';

import { SENSORS, reducer, initialState } from './sensors';
import { unwrapBase64Value } from './utils';

const BLE_NAME = 'MIOTAG';

export default function useMiotag() {
  const manager = useRef(null);
  const device = useRef(null);
  const services = useRef([]);
  const characteristics = useRef([]);
  const [managerState, setManagerState] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [monitoring, setMonitoring] = useState([]);
  const [sensors, dispatch] = useReducer(reducer, initialState);

  const updateSensors = async () => {
    const newCharacteristics = await Promise.all(characteristics.current.map((c) => c.read()));
    // eslint-disable-next-line
    for (const c of newCharacteristics) {
      const value = unwrapBase64Value(c.value);
      const uuid = c.uuid.toUpperCase();
      const sensor = SENSORS[uuid];
      console.log(sensor, value);
      dispatch({ type: sensor, value });
    }
    characteristics.current = newCharacteristics;
    if (monitoring) {
      updateSensors();
    }
  };

  const connectToDevice = async (discoveredDevice) => {
    try {
      device.current = await discoveredDevice.connect();
    } catch (err) {
      console.log('connect err');
      console.warn(err);
      // setScanning(true);
      return;
    }
    console.log(device.name);
    try {
      device.current = await device.current.discoverAllServicesAndCharacteristics();
    } catch (err) {
      console.log('discover err');
      console.warn(err);
      // setScanning(true);
      return;
    }
    try {
      device.current = await device.current.requestConnectionPriority(ConnectionPriority.High);
    } catch (err) {
      console.log('req priority err');
      console.warn(err);
      // setScanning(true);
      return;
    }
    try {
      services.current = await device.current.services();
    } catch (err) {
      console.log('services err');
      console.warn(err);
      // setScanning(true);
      return;
    }
    try {
      characteristics.current = [
        ...await Promise.all(services.current.map((s) => s.characteristics())),
      ].flat();
      updateSensors();
      console.log(characteristics.current);
    } catch (err) {
      console.log('chars err');
      console.warn(err);
      // setScanning(true);
      return;
    }
    setMonitoring(true);
  };

  const checkDevice = async (error, discoveredDevice) => {
    if (error) return;
    console.log(discoveredDevice);
    if (discoveredDevice.name !== BLE_NAME) {
      return;
    }
    console.log(discoveredDevice.name);
    // found miotag!
    setScanning(false);
    connectToDevice(discoveredDevice);
  };

  const scanAndConnect = () => setScanning(true);

  const init = async () => {
    manager.current = new BleManager();
    manager.current.onStateChange((state) => setManagerState(state));
  };

  useEffect(() => {
    if (manager.current === null) {
      return;
    }
    if (managerState === 'PoweredOn' && scanning) {
      manager.current.startDeviceScan(null, null, checkDevice);
    } else {
      manager.current.stopDeviceScan();
    }
  }, [managerState, scanning]);

  return [
    {
      managerState,
      scanning,
      sensors,
    },
    {
      init,
      scanAndConnect,
    },
  ];
}
