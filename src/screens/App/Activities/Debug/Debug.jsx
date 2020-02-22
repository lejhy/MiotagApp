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

const INIT_STATE = [
  null, // acc
  null,
  null,
  null, // gyro
  null,
  null,
  null, // rpy
  null,
  null,
];

const Debug = ({ getSensors, navigation }: Props) => {
  const [sensors, setSensors] = useState(INIT_STATE);

  const axes = {
    roll: sensors[6],
    pitch: sensors[7],
    yaw: sensors[8],
  };

  const acc = {
    x: sensors[0],
    y: sensors[1],
    z: sensors[2],
  };

  const gyro = {
    x: sensors[3],
    y: sensors[4],
    z: sensors[5],
  };

  const goBack = () => navigation.goBack();

  useInterval(() => {
    console.log('update');
    const newSensors = getSensors();
    if (newSensors === null) {
      console.log('null value received!');
    }
    setSensors(newSensors === null ? INIT_STATE : newSensors);
  }, 16);

  return (
    <SafeAreaView>
      <Text>Debug</Text>
      <Text>Axes:</Text>
      <Text>{ `Roll: ${axes.roll === null ? 'null' : axes.roll}` }</Text>
      <Text>{ `Pitch: ${axes.pitch === null ? 'null' : axes.pitch}` }</Text>
      <Text>{ `Yaw: ${axes.yaw === null ? 'null' : axes.yaw}` }</Text>
      <Text>Acc:</Text>
      <Text>{ `X: ${acc.x === null ? 'null' : acc.x}` }</Text>
      <Text>{ `Y: ${acc.y === null ? 'null' : acc.y}` }</Text>
      <Text>{ `Z: ${acc.z === null ? 'null' : acc.z}` }</Text>
      <Text>Gyro:</Text>
      <Text>{ `X: ${gyro.x === null ? 'null' : gyro.x}` }</Text>
      <Text>{ `Y: ${gyro.y === null ? 'null' : gyro.y}` }</Text>
      <Text>{ `Z: ${gyro.z === null ? 'null' : gyro.z}` }</Text>
      <Button onPress={goBack}>
        Return
      </Button>
    </SafeAreaView>
  );
};

export default Debug;
