// @flow

import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { ActivityIndicator } from 'react-native';

import Text from '@core/Text';
import { PRIMARY } from '@styles/colors';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default function MiotagLoader() {
  const theme = useContext(ThemeContext);
  return (
    <Container>
      <ActivityIndicator size="large" color={theme.colors[PRIMARY]} />
      <Text>
        Connecting to Miotag...
      </Text>
    </Container>
  );
}
