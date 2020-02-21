// @flow

import { useState, useReducer, useEffect } from 'react';
import { BleManager, ConnectionPriority } from 'react-native-ble-plx';
// import { throttleTime } from 'rxjs/operators';
// import { Subject } from 'rxjs';

import { SENSORS, reducer, initialState } from './sensors';
import { unwrapBase64Value } from './utils';
import type { Subscription } from 'react-native-ble-plx';

const BLE_NAME = 'MIOTAG';

export default function useMiotag() {
  let manager = null;
  let device = null;
  let characteristics = [];
  let subscriptions: Subscription[] = [];
  const [isAvailable, setAvailable] = useState(false);
  const [sensors, dispatch] = useReducer(reducer, initialState);

  const startUpdatingSensors = () => {
    for (const c of characteristics) {
      const uuid = c.uuid.toUpperCase();
      const sensor = SENSORS[uuid];
      if (c.isReadable && sensor) {
        registerCharacteristicListener(c, uuid, sensor);
      }
    }
  };

  const registerCharacteristicListener = (characteristic, uuid, sensor) => {
    subscriptions.push(
      characteristic.monitor((error, newCharacteristic) => {
        if (error) console.log(error);
        else {
          const value = unwrapBase64Value(newCharacteristic.value);
          dispatch({ type: sensor, value })
        }
      })
    );
  };

  const connectToDevice = async (discoveredDevice) => {
    device = discoveredDevice;
    try {
      device = await discoveredDevice.connect();
    } catch (err) {
      console.log('connect err');
      console.warn(err);
      return;
    }
    try {
      device = await device.discoverAllServicesAndCharacteristics();
    } catch (err) {
      console.log('discover err');
      console.warn(err);
      return;
    }
    try {
      device = await device.requestConnectionPriority(ConnectionPriority.High);
    } catch (err) {
      console.log('req priority err');
      console.warn(err);
      return;
    }
    let services = [];
    try {
      services = await device.services();
    } catch (err) {
      console.log('services err');
      console.warn(err);
      return;
    }
    try {
      characteristics = [
        ...await Promise.all(services.map((s) => s.characteristics())),
      ].flat();
    } catch (err) {
      console.log('chars err');
      console.warn(err);
      return;
    }
    startUpdatingSensors();
    setAvailable(true);
  };

  const scanAndConnect = () => {
    manager.startDeviceScan(null, null, (error, discoveredDevice) => {
      if (error) {
        console.warn(`SCAN_ERROR: ${error.message}`);
        console.log(error);
        // Handle error (scanning will be stopped automatically)
        return;
      }
      if (discoveredDevice.name === BLE_NAME) {
        // Stop scanning as it's not necessary if you are scanning for one device.
        manager.stopDeviceScan();
        // Proceed with connection.
        connectToDevice(discoveredDevice);
      }
    });
  };

  const init = async () => {
    manager = new BleManager();
    const subscription = manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        scanAndConnect();
        subscription.remove();
      }
    }, true);
  };

  useEffect(() => {
    init();
    return () => {
      if (device !== null) {
        // close connection and destroy the manager during cleanup
        // NOTE: this return promise normally, but we don't have to deal with it
        subscriptions.forEach(s => s.remove());
        subscriptions = [];
        device.cancelConnection();
        device = null;
        manager.destroy();
        manager = null;
        characteristics = null;
      }
    };
  }, []);

  const getSensors = () => sensors;

  return {
    sensors,
    getSensors,
    isAvailable,
  };
}
