// @flow

import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import styled, { ThemeContext } from 'styled-components';

import useMiotag from '@hooks/useMiotag/hook';
import Text from '@core/Text';
import { PRIMARY } from '@styles/colors';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const withMiotag = (staticParams) => (Game) => (props) => {
  const { sensors, isAvailable } = useMiotag();
  const theme = useContext(ThemeContext);

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
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Game sensors={sensors} {...props} />;
};

export default withMiotag;
