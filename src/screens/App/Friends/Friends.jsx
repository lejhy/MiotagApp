// @flow

import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import styled from 'styled-components';
import type { NavigationScreenProps } from 'react-navigation';

import useFriends from '@hooks/useFriends';
import { Button, Text, ScreenHeader } from '@core';

import FriendItem from './FriendItem';

const SafeAreaView = styled.SafeAreaView`
  position: relative;
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

const AddButtonContainer = styled.View`
  position: absolute;
  bottom: 5%;
  left: 0;
  right: 0;
  width: 100%;
  padding: 10px
`;

type Props = {
  navigation: NavigationScreenProps,
};

export default function Friends({ navigation }: Props) {
  const [refreshing, setRefreshing] = useState(true);
  const [friends, { refresh }] = useFriends();

  const refreshActivities = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  useEffect(() => {
    refreshActivities();
  }, []);

  const getOnPressHandler = (id) => () => navigation.navigate('Profile', { id });
  // TODO: Implement in the hook method
  const getOnDeleteHandler = (id) => () => null;
  const navigateToSearchUser = () => navigation.navigate('UserSearch');

  return (
    <SafeAreaView>
      <ScreenHeader title="Friends" includeBackButton />
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
            <Text align="center">No friends to show</Text>
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
          Add new friend
        </Button>
      </AddButtonContainer>
    </SafeAreaView>
  );
}
