// @flow

import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import styled from 'styled-components';
import type { NavigationScreenProps } from 'react-navigation';

import useFriends from '@hooks/useFriends';
import { Button, Text } from '@core';

import FriendItem from './FriendItem';

const Content = styled.View`
  position: relative;
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding: 0 20px;
  margin-top: 20px;
`;

const AddButtonContainer = styled.View`
  margin: 20px 0 25px 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 10px
`;

type Props = {
  navigation: NavigationScreenProps,
  isFocused: Boolean
};

export default function Patients({ navigation, isFocused }: Props) {
  const [refreshing, setRefreshing] = useState(true);
  const [friends, { refresh, unfollow }] = useFriends();

  const refreshActivities = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  useEffect(() => {
    if (isFocused) {
      refreshActivities();
    }
  }, [isFocused]);

  const getOnPressHandler = (id) => () => navigation.navigate('Profile', { id });
  const getOnDeleteHandler = (id) => () => unfollow(id);
  const navigateToSearchUser = () => navigation.navigate('PatientSearch');

  return (
    <Content>
      <Container>
        <ScrollContainer
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshActivities}
            />
          )}
        >
          { (!friends || friends.length === 0) && (
            <Text align="center">No patients to show</Text>
          ) }
          { (friends && friends.length > 0) && friends.map((f) => (
            <FriendItem
              key={f.id}
              friend={f}
              onPress={getOnPressHandler(f.id)}
              onDelete={getOnDeleteHandler(f.id)}
            />
          ))}
        </ScrollContainer>
      </Container>
      <AddButtonContainer>
        <Button variant="primary" icon="plus" onPress={navigateToSearchUser}>
          Add new patient
        </Button>
      </AddButtonContainer>
    </Content>
  );
}
