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

const Debug = ({ miotag: { sensors: { axes } } }: Props) => (
  <SafeAreaView>
    <Text>Debug screen</Text>
    <Text>Axes:</Text>
    <Text>{ `Roll: ${axes.roll === null ? 'null' : axes.roll}` }</Text>
    <Text>{ `Pitch: ${axes.pitch === null ? 'null' : axes.pitch}` }</Text>
    <Text>{ `Yaw: ${axes.yaw === null ? 'null' : axes.yaw}` }</Text>
  </SafeAreaView>
);

export default Debug;
