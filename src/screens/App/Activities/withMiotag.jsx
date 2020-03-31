// @flow

import React, { useContext, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import styled, { ThemeContext } from 'styled-components';
import { useKeepAwake } from 'expo-keep-awake';
import Orientation from 'react-native-orientation-locker';

import useMiotag from '@hooks/useMiotag/hook';
import useUser from '@hooks/useUser';
import usePhoneSensors from '@hooks/usePhoneSensors';
import Text from '@core/Text';
import { PRIMARY } from '@styles/colors';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const withMiotag = (staticParams) => (Game) => (props) => {
  const [{ gameDebug }] = useUser();
  const {
    getImu, getFingers, getQuaternions, isAvailable,
  } = useMiotag(!gameDebug);
  const { getPhoneImu } = usePhoneSensors();
  const theme = useContext(ThemeContext);
  useKeepAwake();

  const { blockView = true, lockToPortrait = false } = staticParams || {};

  useEffect(() => {
    if (lockToPortrait) {
      Orientation.lockToPortrait();
    }
  }, []);

  if (gameDebug) {
    return (
      <Game
        getImu={getPhoneImu}
        getFingers={() => new Uint8Array(5)}
        getQuaternions={() => new Float32Array(4)}
        {...props}
      />
    );
  }

  if (!isAvailable && blockView) {
    return (
      <Container>
        <ActivityIndicator size="large" color={theme.colors[PRIMARY]} />
        <Text>
          Connecting to Miotag...
        </Text>
      </Container>
    );
  }
  return (
    <Game
      getImu={getImu}
      getFingers={getFingers}
      getQuaternions={getQuaternions}
      {...props} // eslint-disable-line react/jsx-props-no-spreading
    />
  );
};

export default withMiotag;
