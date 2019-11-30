// @flow

import React, { useState } from 'react';
import styled from 'styled-components';
import type { NavigationScreenProps } from 'react-navigation';

import useUser from '@hooks/useUser';
import {
  Button, Form, ScreenHeader, Text,
} from '@core';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const FormContainer = styled.ScrollView`
  padding: 0 10%;
  padding-top: 10%;
  flex: 1;
`;

const ButtonContainer = styled.View`
  padding-top: 40px;
`;

type Props = {
  navigation: NavigationScreenProps
}

export default function ProfileCreation({ navigation }: Props) {
  const [user, { update }] = useUser();
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth || new Date());
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');

  const onSubmit = async () => {
    try {
      await update({
        firstName,
        lastName,
        dateOfBirth,
        phoneNumber,
      });
      navigation.navigate('Dashboard');
    } catch (err) {
      console.warn(err.response);
      console.warn(err);
    }
  };

  return (
    <SafeAreaView>
      <ScreenHeader title="Tell us more about you" />
      <FormContainer>
        <Form.TextInput
          value={firstName}
          onChange={setFirstName}
          placeholder="First name"
          label="First name"
          autoCapitalize="words"
        />
        <Form.TextInput
          mt="15px"
          value={lastName}
          onChange={setLastName}
          placeholder="Last name"
          label="Last name"
          autoCapitalize="words"
        />
        <Form.DatePicker
          mt="30px"
          label="Date of Birth"
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChange={setDateOfBirth}
        />
        <Form.TextInput
          mt="15px"
          value={phoneNumber}
          onChange={setPhoneNumber}
          placeholder="Phone Number"
          label="Phone Number"
          keyboardType="phone-pad"
        />
        <ButtonContainer>
          <Button onPress={onSubmit}>
            Let&apos;s start
          </Button>
        </ButtonContainer>
      </FormContainer>
    </SafeAreaView>
  );
}
