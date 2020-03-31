// @flow

import React from 'react';
import { Switch } from 'react-native';
import styled from 'styled-components';
import type { NavigationScreenProps } from 'react-navigation';

import useUser from '@hooks/useUser';
import {
  Text, Button, UserInfo,
} from '@core';

const Container = styled.View`
  flex: 1;
  flex-direction: column;
`;

const Content = styled.View`
  flex: 1;
  padding: 25px;
`;

const ButtonContainer = styled.View`
  padding: 25px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const RowDescription = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const RowSwitch = styled.View`
  flex-direction: row;
  align-items: center;
`;

type Props = {
  navigation: NavigationScreenProps,
};

export default function Settings({ navigation }: Props) {
  const [{ private: profilePrivate, gameDebug }, { clearUserData, update }] = useUser();

  const handleLogoutButton = async () => {
    await clearUserData();
    navigation.navigate('SignIn');
  };

  const toggleProfileVisibility = (privateValue) => update({ private: privateValue });
  const toggleDebug = (debugValue) => update({ gameDebug: debugValue });

  return (
    <Container>
      <UserInfo />
      <Content>
        <Row>
          <RowDescription>
            <Text bold>Profile Visibility</Text>
          </RowDescription>
          <RowSwitch>
            <Text mr="10px">
              { `${profilePrivate ? 'Private' : 'Public'}` }
            </Text>
            <Switch
              value={profilePrivate}
              onValueChange={toggleProfileVisibility}
            />
          </RowSwitch>
        </Row>
        <Row>
          <RowDescription>
            <Text bold>Run games without miotag</Text>
          </RowDescription>
          <RowSwitch>
            <Text mr="10px">
              { `${gameDebug ? 'On' : 'Off'}` }
            </Text>
            <Switch
              value={gameDebug}
              onValueChange={toggleDebug}
            />
          </RowSwitch>
        </Row>
      </Content>
      <ButtonContainer>
        <Button onPress={handleLogoutButton}>
            Logout
        </Button>
      </ButtonContainer>
    </Container>
  );
}
