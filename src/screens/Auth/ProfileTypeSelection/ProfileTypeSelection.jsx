// @flow

import React from 'react';
import styled from 'styled-components';
import type { NavigationScreenProps } from 'react-navigation';

import { Button, ScreenHeader, Text } from '@core';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const Container = styled.View`
  padding: 0 10%;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

type Props = {
  navigation: NavigationScreenProps
}

export default function ProfileTypeSelection({ navigation }: Props) {
  const proceedAsRehabilitant = () => navigation.navigate('CreateNewAccount', { isTherapist: false });
  const proceedAsTherapist = () => navigation.navigate('CreateNewAccount', { isTherapist: true });

  return (
    <SafeAreaView>
      <ScreenHeader title="Select Account Type" />
      <Container>
        <Button onPress={proceedAsRehabilitant}>
          Rehabilitant
        </Button>
        <Text align="center" color="gray" mt="15px" mb="15px">
          - OR -
        </Text>
        <Button variant="secondary" onPress={proceedAsTherapist}>
          Therapist
        </Button>
      </Container>
    </SafeAreaView>
  );
}
