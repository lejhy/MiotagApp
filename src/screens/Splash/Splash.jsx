// @flow

import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Text } from '@core';

const Container = styled.View`

`;

type Props = {
  navigation: NavigationScreenProps
}


const Splash = ({ navigation }: Props) => {
  useEffect(() => {
    navigation.navigate('Auth');
  }, []);
  return (
    <Container>
      <Text>Initializing</Text>
    </Container>
  );
};

export default Splash;
