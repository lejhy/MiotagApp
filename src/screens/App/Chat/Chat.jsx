// @flow

import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import type { NavigationScreenProps } from 'react-navigation';

import { BACKGROUND_WHITE, PRIMARY } from '@styles/colors';
import useMessages from '@hooks/useMessages';
import { Form } from '@core';

import ChatBubble from './ChatBubble';

const Content = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors[BACKGROUND_WHITE]};
`;

const MessagesList = styled.ScrollView`
  padding: 20px;
`;

const ChatInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

const TextInputContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: 10px;
`;

const Button = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border-radius: 22.5px;
  background-color: ${({ theme }) => theme.colors[PRIMARY]};
`;

type Props = {
  navigation: NavigationScreenProps
};

export default function Chat({ navigation: { state } }: Props) {
  const receiver = state.params.id;
  const [{ threads, loading }, { addMessage }] = useMessages(receiver);
  const [input, setInput] = useState('');

  const onSubmit = () => {
    if (!input) return;
    addMessage(input, receiver);
    setInput('');
  };

  return (
    <Content behavior="padding">
      <MessagesList>
        { !loading && threads && threads[0] && threads[0].messages.map((msg, idx) => (
          <ChatBubble
            key={msg.id}
            message={msg}
            hasNext={threads[0].messages[idx + 1] !== undefined}
          />
        ))}
      </MessagesList>
      <ChatInputContainer>
        <TextInputContainer>
          <Form.TextInput
            label=""
            placeholder="Type your message..."
            value={input}
            returnKeyType="send"
            onChange={setInput}
            onSubmitEditing={onSubmit}
          />
        </TextInputContainer>
        <Button onPress={onSubmit}>
          <Icon name="paper-plane" color="#fff" size={24} />
        </Button>
      </ChatInputContainer>
    </Content>
  );
}
