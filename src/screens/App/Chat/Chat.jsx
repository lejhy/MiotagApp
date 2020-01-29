// @flow

import React from 'react';
// import { SafeAreaView } from 'react-native';
import styled from 'styled-components';
import type { NavigationScreenProps } from 'react-navigation';

import { BACKGROUND_WHITE } from '@styles/colors';
import useMessages from '@hooks/useMessages';
import { ScreenHeader, Text } from '@core';

import ChatBubble from './ChatBubble';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const Content = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors[BACKGROUND_WHITE]};
`;

const MessagesList = styled.ScrollView`
  padding: 20px;
`;

type Props = {
  navigation: NavigationScreenProps
};

export default function Chat({ navigation: { state } }: Props) {
  const [{ threads, loading }] = useMessages(state.params.id);
  console.log(threads);
  return (
    <SafeAreaView>
      <Content>
        <ScreenHeader title="Chat" includeBackButton />
        <MessagesList>
          { !loading && threads && threads[0] && threads[0].messages.map((msg, idx) => (
            <ChatBubble
              key={msg.id}
              message={msg}
              hasNext={threads[0].messages[idx + 1] !== undefined}
            />
          ))}
        </MessagesList>
      </Content>
    </SafeAreaView>
  );
}
