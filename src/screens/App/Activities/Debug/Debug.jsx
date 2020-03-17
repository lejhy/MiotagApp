// @flow

import React, { useState } from 'react';
import styled from 'styled-components';
import type { NavigationScreenProps } from 'react-navigation';

import useInterval from '@hooks/useInterval';
import { Button, Text } from '@core';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

type Props = {
  getSensors: () => Array<Number>,
  navigation: NavigationScreenProps
}

const INIT_STATE = {
  imu: new Int16Array(6),
  fingers: new Uint8Array(5),
  quaternions: new Float32Array(4)
};

const Debug = ({ getImu, getFingers, getQuaternions, navigation }: Props) => {
  const [sensors, setSensors] = useState(INIT_STATE);

  const acc = {
    x: sensors.imu[0],
    y: sensors.imu[1],
    z: sensors.imu[2],
  };

  const axes = {
    roll: sensors.imu[3],
    pitch: sensors.imu[4],
    yaw: sensors.imu[5],
  };

  const fingers = {
    thumb: sensors.fingers[0],
    index: sensors.fingers[1],
    middle: sensors.fingers[2],
    ring: sensors.fingers[4],
    pinkie: sensors.fingers[5],
  };

  const quaternions = {
    x: sensors.quaternions[0],
    y: sensors.quaternions[1],
    z: sensors.quaternions[2],
    w: sensors.quaternions[3],
  };

  const goBack = () => navigation.goBack();

  useInterval(() => {
    console.log('update');
    const newImu = getImu();
    const newFingers = getFingers();
    const newQuaternions = getQuaternions();

    setSensors(newImu === null || newFingers === null || newQuaternions === null ? INIT_STATE : {
      imu: newImu,
      fingers: newFingers,
      quaternions: newQuaternions
    });
  }, 33);

  return (
    <SafeAreaView>
      <Text>Debug</Text>
      <Text>Acc:</Text>
      <Text>{ `X: ${acc.x}` }</Text>
      <Text>{ `Y: ${acc.y}` }</Text>
      <Text>{ `Z: ${acc.z}` }</Text>
      <Text>Axes:</Text>
      <Text>{ `Roll: ${axes.roll}` }</Text>
      <Text>{ `Pitch: ${axes.pitch}` }</Text>
      <Text>{ `Yaw: ${axes.yaw}` }</Text>
      <Text>Fingers:</Text>
      <Text>{ `Thumb: ${fingers.thumb}` }</Text>
      <Text>{ `Index: ${fingers.index}` }</Text>
      <Text>{ `Middle: ${fingers.middle}` }</Text>
      <Text>{ `Ring: ${fingers.ring}` }</Text>
      <Text>{ `Pinkie: ${fingers.pinkie}` }</Text>
      <Text>Quaternions:</Text>
      <Text>{ `X: ${quaternions.x}` }</Text>
      <Text>{ `Y: ${quaternions.y}` }</Text>
      <Text>{ `Z: ${quaternions.z}` }</Text>
      <Text>{ `W: ${quaternions.w}` }</Text>

      <Button onPress={goBack}>
        Return
      </Button>
    </SafeAreaView>
  );
};

export default Debug;
