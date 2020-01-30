// @flow

import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components';
import type { NavigationScreenProps } from 'react-navigation';
import useUser from '@hooks/useUser';

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
  const [_, { login }] = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const goToDashboard = () => navigation.navigate('App');
  const goToProfileCreation = () => navigation.navigate('ProfileCreation');
  const goToProfileTypeSelection = () => navigation.navigate('ProfileTypeSelection');

  const handleSignIn = async () => {
    try {
      const user = await login(email, password);
      if (user.firstName && user.lastName) {
        goToDashboard();
      } else {
        goToProfileCreation();
      }
    } catch (err) {
      console.log(err);
      console.log(err.response);
      // TODO: error handling here
      console.warn('error');
    }
  };

  return (
    <SafeAreaView>
      <ScreenHeader title="Sign In" />
      <FormContainer>
        <Form.TextInput
          value={email}
          onChange={setEmail}
          placeholder="E-mail"
          label="E-mail"
          autoCapitalize="none"
          autoCompleteType="email"
          autoCorrect={false}
        />
        <Form.TextInput
          mt="15px"
          value={password}
          onChange={setPassword}
          placeholder="Password"
          label="Password"
          secureTextEntry
        />
        <ButtonContainer>
          <Button onPress={handleSignIn}>
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
