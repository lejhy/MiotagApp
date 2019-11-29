// @flow

import React from 'react';
import styled from 'styled-components';

import type { NavigationScreenProps } from 'react-navigation';

import BackgroundVector from './welcome-vector.svg';
import RunnerVector from './runner-start.svg';

import { Button, Text } from '@core';

const Container = styled.SafeAreaView`
  flex: 1;
  position: relative;
  background-color: ${({ theme }) => theme.colors.backgroundWhite};
`;

const BackgroundVectorContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50%;
`;

const RunnerVectorContainer = styled.View`
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  bottom: 65%;
`;

const ContentContainer = styled.View`
  position: absolute;
  top: 48%;
  left: 5%;
  right: 5%;
  bottom: 0;
`;

const ButtonContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: 5%;
`;

type Props = {
  navigation: NavigationScreenProps
}


export default function Welcome({ navigation }: Props) {
  const goToSignIn = () => navigation.navigate('SignIn');

  return (
    <Container>
      <BackgroundVectorContainer>
        <BackgroundVector width="100%" height="100%" />
      </BackgroundVectorContainer>
      <RunnerVectorContainer>
        <RunnerVector width="100%" height="100%" />
      </RunnerVectorContainer>
      <ContentContainer>
        <Text size="header" align="center" bold>
          Welcome to
          {' '}
          <Text size="header" color="primary" bold>
            Miotag
          </Text>
        </Text>
        <Text size="subHeader" align="center" mt="22px">
          The only hand rehabilitation interactive platform you will ever need.
        </Text>
        <ButtonContainer>
          <Button onPress={goToSignIn}>
            Let&apos;s start
          </Button>
        </ButtonContainer>
      </ContentContainer>
    </Container>
  );
}
