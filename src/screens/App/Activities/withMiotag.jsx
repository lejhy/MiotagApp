// @flow

import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import styled, { ThemeContext } from 'styled-components';

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
  } = useMiotag();
  const theme = useContext(ThemeContext);

  // eslint-disable-next-line react/jsx-props-no-spreading
  if (gameDebug) return <Game getSensors={getPhoneSensors} {...props} />;

  const { blockView = true } = staticParams || {};

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
