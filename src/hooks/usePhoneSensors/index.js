// @flow

import { useEffect, useRef } from 'react';
import { accelerometer, gyroscope, magnetometer } from 'react-native-sensors';

const usePhoneSensors = (active) => {
  const sensors = useRef([]);
  let subscriptions = [];

  useEffect(() => {
    if (active) {
      subscriptions.push(accelerometer.subscribe(({ x, y, z }) => {
        const pitch = (180 * Math.atan2(x, Math.sqrt(y * y + z * z))) / Math.PI;
        const roll = (180 * Math.atan2(y, Math.sqrt(x * x + z * z))) / Math.PI;
        sensors.current = [
          x, y, z,
          ...sensors.current.slice(3, 6),
          roll,
          pitch,
          sensors.current[8],
        ];
      }));
      subscriptions.push(gyroscope.subscribe(({ x, y, z }) => {
        sensors.current = [
          ...sensors.current.slice(0, 3),
          x, y, z,
          ...sensors.current.slice(6),
        ];
      }));
      subscriptions.push(magnetometer.subscribe(({ x, y, z }) => {
        const roll = sensors.current[6];
        const pitch = sensors.current[7];
        const magX = x * Math.cos(pitch)
          + y * Math.sin(roll) * Math.sin(pitch)
          + z * Math.cos(roll) * Math.sin(pitch);
        const magY = y * Math.cos(roll) - z * Math.sin(roll);
        const yaw = (180 * Math.atan2(-magY, magX)) / Math.PI;

        sensors.current = [
          ...sensors.current.slice(0, 8),
          yaw,
        ];
      }));
    } else {
      subscriptions.forEach((s) => s.remove());
      subscriptions = [];
    }
  }, [active]);

  const getSensors = () => sensors.current;

  return {
    getSensors,
  };
};

export default usePhoneSensors;
