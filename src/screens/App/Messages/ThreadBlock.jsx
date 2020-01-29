// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import moment from 'moment';

import { GRAY, LIGHT_GRAY } from '@styles/colors';
import { SMALL } from '@styles/fonts';
import DefaultImage from '@assets/img/default-img.svg';
import type { Thread } from '@hooks/useMessages';
import { Button, Text } from '@core';


const TouchableContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
`;

const ProfileImageContainer = styled.View`
  display: flex;
  height: 55px;
  width: 55px;
  margin-right: 10px;
`;

const MainContent = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

type Props = {
  thread: Thread,
  onPress: () => any,
};

const MAX_LENGTH = 20;

export default function ThreadBlock({ thread, onPress }: Props) {
  const lastMsg = thread.messages[thread.messages.length - 1];
  const textTruncated = lastMsg.body.length > MAX_LENGTH
    ? `${lastMsg.body.slice(0, MAX_LENGTH - 3)}...`
    : lastMsg.body;
  const timeAgo = moment(lastMsg.date).fromNow();
  return (
    <TouchableContainer onPress={onPress}>
      <ProfileImageContainer>
        <DefaultImage width="100%" height="100%" />
      </ProfileImageContainer>
      <MainContent>
        <Text>
          { thread.name }
        </Text>
        <Text size={SMALL} color={GRAY}>
          { `${textTruncated} • ${timeAgo}` }
        </Text>
      </MainContent>
    </TouchableContainer>
  );
}
