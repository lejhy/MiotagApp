// @flow

import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { ActivityIndicator } from 'react-native';

import Text from '@core/Text';
import { PRIMARY, BACKGROUND_WHITE } from '@styles/colors';

const Container = styled.SafeAreaView`
  position: relative;
  display: flex;
  flex: 1;
`;

const Content = styled.View`
  position: absolute;
  z-index: 950;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors[BACKGROUND_WHITE]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = {
  children: React.Node,
  show: Boolean,
}

export default function MiotagLoader({ children, show }: Props) {
  const theme = useContext(ThemeContext);
  return (
    <Container>
      { children }
      { show && (
        <Content>
          <ActivityIndicator size="large" color={theme.colors[PRIMARY]} />
          <Text>
            Connecting to Miotag...
          </Text>
        </Content>
      )}
    </Container>
  );
}
