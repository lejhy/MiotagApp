// @flow

import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import type { NavigationScreenProps } from 'react-navigation';

import { BACKGROUND_WHITE, PRIMARY } from '@styles/colors';
import useMessages from '@hooks/useMessages';
import useProfile from '@hooks/useProfile';
import { Form, Text } from '@core';

import FriendPicker from './FriendPicker';
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

const UserInfoContainer = styled.View`
  flex-direction: row;
  padding-top: 24px;
  justify-content: center;
`;

type Props = {
  navigation: NavigationScreenProps
};

export default function Chat({ navigation: { state, navigate, push } }: Props) {
  const [receiver, setReceiver] = useState((state.params || {}).id || null);
  const [input, setInput] = useState('');
  const [{ threads, loading }, { addMessage }] = useMessages(receiver);
  const [_, { getFullName }] = useProfile(receiver);

  const onSubmit = () => {
    if (!input) return;
    addMessage(input, receiver);
    setInput('');
  };

  const goToChat = (id) => push('Chat', { id });
  const goToProfile = () => navigate('Profile', { id: receiver });

  return (
    <Content behavior="padding">
      { !receiver && (
        <FriendPicker
          onSelect={goToChat}
        />
      )}
      { receiver && (
        <>
          <UserInfoContainer>
            <Text color="gray" align="center">
              Conversation with
            </Text>
            <TouchableOpacity onPress={goToProfile}>
              <Text color="gray" align="center">
                { ` ${getFullName()}` }
              </Text>
            </TouchableOpacity>
          </UserInfoContainer>
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
        </>

      )}
    </Content>
  );
}
