// @flow

import React from 'react';
import { RefreshControl } from 'react-native';

import styled from 'styled-components';

import useMessages from '@hooks/useMessages';
import { ScreenHeader, Text } from '@core';

import ThreadBlock from './ThreadBlock';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

type Props = {

};

export default function Messages({ navigation }: Props) {
  const [{ threads, loading }, { refresh }] = useMessages();
  console.log(threads);

  const buildThreadOpener = (id) => () => navigation.navigate('Chat', { id });

  return (
    <SafeAreaView>
      <ScreenHeader title="Messages" includeBackButton />
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
    </SafeAreaView>
  );
}
