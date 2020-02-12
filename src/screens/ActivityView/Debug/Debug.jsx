// @flow

import React from 'react';
import styled from 'styled-components';

import useMiotag from '@hooks/useMiotag/hook';
import { Button, Text } from '@core';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

type Props = {
  navigation: NavigationScreenProps
}

const Debug = ({ navigation }: Props) => {
  // const [, { init: initUser }] = useUser();
  const [{
    managerState, scanning, sensors: { axes },
  }, { init, scanAndConnect }] = useMiotag();

  return (
    <SafeAreaView>
      <Text>Debug screen</Text>
      <Text>{ `Manager state: ${managerState === null ? 'null' : managerState}` }</Text>
      <Text>{ `Scanning: ${scanning ? 'aye' : 'nae'}` }</Text>
      <Button onPress={() => {
        init();
        scanAndConnect();
      }}
      >
        Start
      </Button>
      <Text>Axes:</Text>
      <Text>{ `Roll: ${axes.roll === null ? 'null' : axes.roll}` }</Text>
      <Text>{ `Pitch: ${axes.pitch === null ? 'null' : axes.pitch}` }</Text>
      <Text>{ `Yaw: ${axes.yaw === null ? 'null' : axes.yaw}` }</Text>
    </SafeAreaView>
  );
};

export default Debug;
