// @flow

import React from 'react';
import styled from 'styled-components';

import type { Sensors } from '@utils/types/Sensors';
import { Text } from '@core';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

type Props = {
  sensors: Sensors,
}

const Debug = ({ miotag: { sensors: { axes, acc, gyro, mag } } }: Props) => (
  <SafeAreaView>
    <Text>Debug screen</Text>
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
    <Text>Mag:</Text>
    <Text>{ `X: ${mag.x === null ? 'null' : mag.x}` }</Text>
    <Text>{ `Y: ${mag.y === null ? 'null' : mag.y}` }</Text>
    <Text>{ `Z: ${mag.z === null ? 'null' : mag.z}` }</Text>
  </SafeAreaView>
);

export default Debug;
