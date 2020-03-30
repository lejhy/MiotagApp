// @flow

import React from 'react';
import { SafeAreaView, RefreshControl } from 'react-native';
import styled from 'styled-components';
import type { NavigationScreenProps } from 'react-navigation';

import useFriends from '@hooks/useFriends';
import useUserSearch from '@hooks/useUserSearch';
import { Form, ScreenHeader } from '@core';

import UserItem from './UserItem';


const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding: 5%;
`;


type Props = {
  navigation: NavigationScreenProps,
};

export default function UserSearch({ navigation }: Props) {
  const [friends] = useFriends();
  const [{ query, results }, { setQuery }] = useUserSearch();

  const searchResult = results.filter((user) => {
    const friend = friends.find((f) => f.id === user.id);
    return !friend;
  });

  const getOnPressHandler = (id) => () => navigation.navigate('Profile', { id });

  return (
    <>
      <Form.TextInput
        value={query}
        onChange={setQuery}
        label="Find new people to follow"
        placeholder="Start typing name or email address..."
        mt="20px"
        ml="20px"
        mr="20px"
      />
      <ScrollContainer
        refreshControl={(
          <RefreshControl
            refreshing={false}
            onRefresh={() => null}
          />
        )}
      >
        { searchResult.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            isFriend={false}
            onPress={getOnPressHandler(user.id)}
          />
        ))}
      </ScrollContainer>
    </>
  );
}
