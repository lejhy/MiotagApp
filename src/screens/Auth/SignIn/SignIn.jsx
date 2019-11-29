// @flow

import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components';

import { Button, Form, Text } from '@core';
import ScreenHeader from '../ScreenHeader';

const FormContainer = styled.View`
  padding: 0 10%;
  padding-top: 10%;
`;

const ButtonContainer = styled.View`
  padding-top: 40px;
`;

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
          <Button>
            Sign In
          </Button>
          <Text align="center" color="gray" mt="15px" mb="15px">
            - OR -
          </Text>
          <Button variant="secondary">
            Create new account
          </Button>
        </ButtonContainer>
      </FormContainer>
    </SafeAreaView>
  );
};

export default SignIn;
