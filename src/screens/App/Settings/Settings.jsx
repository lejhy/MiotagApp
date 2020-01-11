// @flow

import React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components';
import type { NavigationScreenProps } from 'react-navigation';

import useUser from '@hooks/useUser';
import { Button } from '@core';


type Props = {
  navigation: NavigationScreenProps,
};

export default function Settings({ navigation }: Props) {
  const [_, { clearUserData }] = useUser();

  const handleLogoutButton = async () => {
    await clearUserData();
    navigation.navigate('SignIn');
  };
  return (
    <SafeAreaView>
      <Button onPress={handleLogoutButton}>
        Logout
      </Button>
    </SafeAreaView>
  );
}
