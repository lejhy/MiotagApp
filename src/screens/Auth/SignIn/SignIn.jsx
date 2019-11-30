// @flow

import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components';
import type { NavigationScreenProps } from 'react-navigation';

import {
  Button, Form, ScreenHeader, Text,
} from '@core';

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

export default function SignIn({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const goToDashboard = () => navigation.navigate('App');
  const goToProfileTypeSelection = () => navigation.navigate('ProfileTypeSelection');

  return (
    <SafeAreaView>
      <ScreenHeader title="Sign In" />
      <FormContainer>
        <Form.TextInput
          value={username}
          onChange={setUsername}
          placeholder="Username"
          label="Username"
        />
        <Form.TextInput
          mt="15px"
          value={password}
          onChange={setPassword}
          placeholder="Username"
          label="Username"
          secureTextEntry
        />
        <ButtonContainer>
          <Button onPress={goToDashboard}>
            Sign In
          </Button>
          <Text align="center" color="gray" mt="15px" mb="15px">
            - OR -
          </Text>
          <Button variant="secondary" onPress={goToProfileTypeSelection}>
            Create new account
          </Button>
        </ButtonContainer>
      </FormContainer>
    </SafeAreaView>
  );
}
