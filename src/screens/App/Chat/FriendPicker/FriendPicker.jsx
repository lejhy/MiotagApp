// @flow

import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import useFriends from '@hooks/useFriends';
import { Text, Form } from '@core';

import FriendItem from './FriendItem';

const Container = styled.View`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const TopContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const InputContainer = styled.View`
  flex: 1;
`;

type Props = {
  onSelect: (id) => any
};

const DROPDOWN_SIZE = 3;

export default function FriendPicker({ onSelect }: Props) {
  const [friends, { refresh }] = useFriends();
  const [input, setInput] = useState('');
  const [visibleFriends, setVisibleFriends] = useState([]);
  const inputContainer = useRef(null);

  useEffect(() => {
    (async () => {
      const f = await refresh();
      setVisibleFriends(f);
    })();
  }, []);

  useEffect(() => {
    if (inputContainer.current !== null) {
      inputContainer.current.focus();
    }
  }, [inputContainer.current]);

  useEffect(() => {
    if (!input) {
      setVisibleFriends(friends);
      return;
    }
    setVisibleFriends(friends.filter((f) => {
      const { firstName, lastName } = f;
      return firstName.toLowerCase().includes(input.toLowerCase())
        || lastName.toLowerCase().includes(input.toLowerCase());
    }).slice(0, DROPDOWN_SIZE));
  }, [input]);

  return (
    <Container>
      <TopContainer>
        <Text mr="16px">To:</Text>
        <InputContainer>
          <Form.TextInput
            inputRef={inputContainer}
            value={input}
            onChange={setInput}
          />
        </InputContainer>
      </TopContainer>
      { visibleFriends.map((f) => (
        <FriendItem
          key={f.id}
          friend={f}
          onPress={() => onSelect(f.id)}
        />
      ))}
    </Container>
  );
}
