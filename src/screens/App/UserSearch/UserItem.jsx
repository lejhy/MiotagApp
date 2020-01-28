// @flow

import React from 'react';
import styled from 'styled-components';

import { GRAY } from '@styles/colors';
import DefaultImage from '@assets/img/default-img.svg';
import { Text } from '@core';


const TouchableContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors[GRAY]};
  padding: 15px;
  margin-bottom: 15px;
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

type Props = {
  user: {
    firstName: String,
    lastName: String,
  },
  onPress: () => any,
};

export default function UserItem({ user, onPress }: Props) {
  const { firstName, lastName } = user;
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
    </TouchableContainer>
  );
}
