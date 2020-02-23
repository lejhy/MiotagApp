// @flow

import { useEffect, useState, useRef } from 'react';
import type { Subscription } from 'react-native-ble-plx';
import { BleManager, ConnectionPriority } from 'react-native-ble-plx';

const BLE_NAME = 'MIOTAG';
const IMU_UUID = '19B10001-E8F2-537E-4F6C-D104768A1214';
const FINGERS_UUID = '19B10002-E8F2-537E-4F6C-D104768A1214';

export default function useMiotag() {
  let manager = null;
  let device = null;
  let characteristics = [];
  let subscriptions: Subscription[] = [];
  const [isAvailable, setAvailable] = useState(false);
  const imu = useRef(new Int16Array(6));
  const fingers = useRef(new Uint8Array(5));
  const quaternions = useRef(new Float32Array(4));

  const registerImuAndFingersListener = (characteristic) => {
    subscriptions.push(
      characteristic.monitor((error, newCharacteristic) => {
        if (error) console.warn(error);
        else {
          let buffer = Buffer.from(newCharacteristic.value, 'base64').buffer;
            imu.current = new Int16Array(buffer, 0, 6);
            console.log(imu.current);
            fingers.current = new Uint8Array(buffer, 12, 5);
            console.log(fingers.current);
        }
      }),
    );
  };

  const registerQuaternionsListener = (characteristic) => {
    subscriptions.push(
      characteristic.monitor((error, newCharacteristic) => {
        if (error) console.warn(error);
        else {
          quaternions.current = new Float32Array(Buffer.from(newCharacteristic.value, 'base64').buffer);
        }
      }),
    );
  };

  const startUpdatingSensors = () => {
    // eslint-disable-next-line
    for (const c of characteristics) {
      const uuid = c.uuid.toUpperCase();
      if (uuid === IMU_UUID) {
        registerImuAndFingersListener(c);
      } else if (uuid === FINGERS_UUID) {
        registerQuaternionsListener(c);
      }
    }
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
        subscriptions.forEach((s) => s.remove());
        subscriptions = [];
        device.cancelConnection();
        device = null;
        manager.destroy();
        manager = null;
        characteristics = null;
      }
    };
  }, []);

  const getImu = () => imu.current;
  const getFingers = () => fingers.current;
  const getQuaternions = () => quaternions.current;

  return {
    getImu,
    getFingers,
    getQuaternions,
    isAvailable,
  };
}
