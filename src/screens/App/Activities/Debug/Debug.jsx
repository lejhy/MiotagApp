// @flow

import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, Text } from '@core';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

type Props = {
  getSensors: () => Array<Number>,
}

const Debug = ({ getSensors }: Props) => {
  const [sensors, setSensors] = useState([
    null, // acc
    null,
    null,
    null, // gyro
    null,
    null,
    null, // rpy
    null,
    null,
  ]);

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

  console.log('render triggered');

  const logSensors = () => setSensors(getSensors());

  return (
    <SafeAreaView>
      <Text>Debug screen</Text>
      <Button onPress={logSensors}>
        Get current values
      </Button>
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
    </SafeAreaView>
  );
};

export default Debug;
