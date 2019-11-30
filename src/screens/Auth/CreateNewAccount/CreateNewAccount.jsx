// @flow

import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components';
import type { NavigationScreenProps } from 'react-navigation';

import useUser from '@hooks/useUser';
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

  const [user, { register, login }] = useUser();

  const goToDashboard = () => navigation.navigate('App');
  const returnToSignIn = () => navigation.navigate('SignIn');

  const handleRegister = async () => {
    try {
      await register(email, password);
      await login(email, password);
    } catch (err) {
      console.log(err.response);
      console.log(err.response.data.message);
      console.log(JSON.stringify(err));
    }
  };

  return (
    <SafeAreaView>
      <ScreenHeader title="Create New Account" />
      <FormContainer>
        <Form.TextInput
          value={email}
          onChange={setEmail}
          placeholder="Email"
          label="Email"
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
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
        />
        <Form.TextInput
          mt="15px"
          value={repeatPassword}
          onChange={setRepeatPassword}
          placeholder="Password"
          label="Repeat Password"
          secureTextEntry
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
        />
        <ButtonContainer>
          <Button onPress={handleRegister}>
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
