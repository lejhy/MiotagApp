// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import { GRAY, LIGHT_GRAY } from '@styles/colors';
import { SUB_HEADER } from '@styles/fonts';
import DefaultImage from '@assets/img/default-img.svg';
import { Button, Text } from '@core';


const TouchableContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors[GRAY]};
  padding: 15px;
`;

const ProfileImageContainer = styled.View`
  display: flex;
  height: 45px;
  width: 45px;
  margin-right: 10px;
`;

const MainContent = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const DeleteContainer = styled.View`
  display: flex;
  height: 45px;
  width: 45px;
`;

const buttonStyleOverride = `
  height: 100%;
`;

type Props = {
  friend: {
    firstName: String,
    lastName: String,
  },
  onPress: () => any,
  onDelete: () => any,
};

export default function FriendItem({ friend, onPress, onDelete }: Props) {
  const { firstName, lastName } = friend;
  return (
    <TouchableContainer onPress={onPress}>
      <ProfileImageContainer>
        <DefaultImage width="100%" height="100%" />
      </ProfileImageContainer>
      <MainContent>
        <Text bold>
          { `${firstName || 'Anonymous Person'} ${lastName}` }
        </Text>
      </MainContent>
      <DeleteContainer>
        <Button
          icon="times"
          variant="secondary"
          css={buttonStyleOverride}
          onPress={onDelete}
        />
      </DeleteContainer>
    </TouchableContainer>
  );
}
