// @flow

import React from 'react';
import { RefreshControl } from 'react-native';
import styled from 'styled-components';
import type { NavigationScreenProps } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

import useMessages from '@hooks/useMessages';
import { PRIMARY_LIGHTER } from '@styles/colors';
import { Text } from '@core';


import ThreadBlock from './ThreadBlock';

const Container = styled.View`
  position: relative;
  flex: 1;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

const Fab = styled.TouchableOpacity`
  position: absolute;
  width: 65px;
  height: 65px;
  border-radius: 32.5px;
  bottom: 16px;
  right: 16px;
  background-color: ${({ theme }) => theme.colors[PRIMARY_LIGHTER]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = {
  navigation: NavigationScreenProps
};

export default function Messages({ navigation }: Props) {
  const [{ threads, loading }, { refresh }] = useMessages();

  const buildThreadOpener = (id) => () => navigation.navigate('Chat', { id });
  const goToChat = () => navigation.navigate('Chat');

  return (
    <Container>
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
      <Fab onPress={goToChat}>
        <Icon name="plus" color="#fff" size={28} />
      </Fab>
    </Container>
  );
}
