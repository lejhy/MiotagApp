// @flow

import { useState, useRef } from 'react';
import { BleManager, LogLevel } from 'react-native-ble-plx';

const BLE_NAME = 'MIOTAG';
const SVC_UUID = '19b10000-e8f2-537e-4f6c-d104768a1214';
const IMU_UUID = '19b10001-e8f2-537e-4f6c-d104768a1214';
const QUA_UUID = '19b10002-e8f2-537e-4f6c-d104768a1214';

export default function useBleManager() {
  const [isAvailable, setAvailable] = useState(false);
  const manager = useRef(null);
  const device = useRef(null);
  const subscriptions = useRef([]);
  const imu = useRef(new Int16Array(6));
  const fingers = useRef(new Uint8Array(5));
  const quaternions = useRef(new Float32Array(4));

  const init = async () => {
    console.log('init', manager.current, device.current);
    if (manager.current === null) {
      manager.current = new BleManager();
      manager.current.setLogLevel(LogLevel.Verbose);
    }
    if (device.current === null) {
      const stateChangeSub = manager.current.onStateChange(async (state) => {
        if (state === 'PoweredOn') {
          scanAndConnect();
          stateChangeSub.remove();
        }
      }, true);
    }
  };

  const scanAndConnect = () => {
    console.log('scan and connect');
    manager.current.startDeviceScan(null, null, (error, discoveredDevice) => {
      if (error) {
        console.warn(`SCAN_ERROR: ${error.message}`);
        console.log(error);
        // Handle error (scanning will be stopped automatically)
        return;
      }
      if (discoveredDevice.name === BLE_NAME) {
        console.log(discoveredDevice);
        // Stop scanning as it's not necessary if you are scanning for one device.
        manager.current.stopDeviceScan();
        // Proceed with connection.
        connectToDevice(discoveredDevice);
      }
    });
  };

  const connectToDevice = async (discoveredDevice) => {
    console.log('starting connection');
    try {
      console.log('connecting');
      device.current = await discoveredDevice.connect();
      device.current.onDisconnected(async (err) => {
        console.log('disconnected');
        if (err) {
          console.log(err);
          console.log(JSON.stringify(err));
        }
        setAvailable(false);
        await Promise.all(subscriptions.current.map((s) => s.remove()));
        device.current = null;
        init();
      });
    } catch (err) {
      console.log('connect err');
      console.log(err);
      console.log(JSON.stringify(err));
      device.current = null;
      init();
      return;
    }
    try {
      console.log('discovering');
      device.current = await device.current.discoverAllServicesAndCharacteristics();
    } catch (err) {
      console.log('discover err');
      console.log(err);
      console.log(JSON.stringify(err));
      device.current = null;
      init();
      return;
    }

    subscriptions.current = [
      device.current.monitorCharacteristicForService(
        SVC_UUID,
        IMU_UUID,
        (error, newCharacteristic) => {
          if (error) console.warn(error);
          else {
            const { buffer } = Buffer.from(newCharacteristic.value, 'base64');
            imu.current = new Int16Array(buffer, 0, 6);
            fingers.current = new Uint8Array(buffer, 12, 5);
          }
        },
      ),
      device.current.monitorCharacteristicForService(
        SVC_UUID,
        QUA_UUID,
        (error, newCharacteristic) => {
          if (error) console.warn(error);
          else {
            quaternions.current = new Float32Array(Buffer.from(newCharacteristic.value, 'base64').buffer);
          }
        },
      ),
    ];
    setAvailable(true);
  };

  const getImu = () => imu.current;
  const getFingers = () => fingers.current;
  const getQuaternions = () => quaternions.current;

  return {
    init,
    getImu,
    getFingers,
    getQuaternions,
    isAvailable,
  };
}
