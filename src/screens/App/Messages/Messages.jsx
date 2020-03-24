// @flow

import React from 'react';
import { RefreshControl } from 'react-native';
import styled from 'styled-components';
import type { NavigationScreenProps } from 'react-navigation';

import useMessages from '@hooks/useMessages';
import { Text } from '@core';

import ThreadBlock from './ThreadBlock';

const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

type Props = {
  navigation: NavigationScreenProps
};

export default function Messages({ navigation }: Props) {
  const [{ threads, loading }, { refresh }] = useMessages();

  const buildThreadOpener = (id) => () => navigation.navigate('Chat', { id });

  return (
    <ScrollContainer
      refreshControl={(
        <RefreshControl
          refreshing={loading}
          onRefresh={refresh}
        />
        )}
    >
      { (!threads || threads.length === 0) && (
      <Text align="center">No messages to show</Text>
      ) }
      { (threads && threads.length > 0) && threads.map((t) => (
        <ThreadBlock
          key={t.id}
          thread={t}
          onPress={buildThreadOpener(t.id)}
        />
      ))}
    </ScrollContainer>
  );
}
