// @flow

import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components';
import type { NavigationScreenProps } from 'react-navigation';

import { Button, Form, Text } from '@core';
import ScreenHeader from '../ScreenHeader';

const FormContainer = styled.View`
  padding: 0 10%;
  padding-top: 10%;
`;

const ButtonContainer = styled.View`
  padding-top: 40px;
`;

type Props = {
  navigation: NavigationScreenProps
}

export default function CreateNewAccount({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const goToDashboard = () => navigation.navigate('App');
  const returnToSignIn = () => navigation.navigate('SignIn');

  return (
    <SafeAreaView>
      <ScreenHeader title="Create New Account" />
      <FormContainer>
        <Form.TextInput
          value={email}
          onChange={setEmail}
          placeholder="Email"
          label="Email"
        />
        <Form.TextInput
          mt="15px"
          value={password}
          onChange={setPassword}
          placeholder="Password"
          label="Password"
          secureTextEntry
        />
        <Form.TextInput
          mt="15px"
          value={repeatPassword}
          onChange={setRepeatPassword}
          placeholder="Password"
          label="Repeat Password"
          secureTextEntry
        />
        <ButtonContainer>
          <Button onPress={goToDashboard}>
            Create new account
          </Button>
          <Text align="center" color="gray" mt="15px" mb="15px">
            - OR -
          </Text>
          <Button variant="secondary" onPress={returnToSignIn}>
            Return to sign In
          </Button>
        </ButtonContainer>
      </FormContainer>
    </SafeAreaView>
  );
}
