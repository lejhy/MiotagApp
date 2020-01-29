// @flow

import React from 'react';
import styled from 'styled-components';

import type { Message } from '@hooks/useMessages';
import { PRIMARY_VERY_LIGHT } from '@styles/colors';

const Bubble = styled.View`
  flex: 0;
  padding: 10px;
  border-radius: 4px;
  background-color: ${({ isIncoming, theme }) => (isIncoming
    ? '#fff'
    : theme.colors[PRIMARY_VERY_LIGHT])};
  max-width: 70%;
  min-width: 0;
  width: auto;
  align-self: ${({ isIncoming }) => `flex-${isIncoming ? 'start' : 'end'}`};
  margin-bottom: ${({ hasNext }) => (hasNext ? '5px' : '15px')};
`;

const Text = styled.Text``;

type Props = {
  message: Message
};

const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.20,
  shadowRadius: 1.41,
  elevation: 2,
};

export default function ChatBubble({ message }: Props) {
  const { body, isIncoming } = message;
  return (
    <Bubble style={shadow} isIncoming={isIncoming}>
      <Text>{ body }</Text>
    </Bubble>
  );
}
