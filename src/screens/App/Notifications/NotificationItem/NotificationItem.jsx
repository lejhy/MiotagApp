// @flow

import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import type { ThemeProps } from 'styled-components';

import { PRIMARY } from '@styles/colors';
import { Text } from '@core';

const Container = styled.View`
  margin-bottom: 16px;
  padding: 16px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  shadow-color: #000;
  shadow-offset: 2px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
  elevation: 2;
`;

const IconContainer = styled.View`
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled.View`
  padding-left: 16px;
  flex: 1;
  justify-content: center;
`;

type Props = {
  message: String,
  date: String,
  theme: ThemeProps,
};

export default function NotificationItem({ message, date, theme }: Props) {
  return (
    <Container>
      <IconContainer>
        <Icon name="bell" color={theme.colors[PRIMARY]} size={35} />
      </IconContainer>
      <TextContainer>
        <Text bold>{ message }</Text>
        <Text color="lightGray">{ moment(date).fromNow() }</Text>
      </TextContainer>
    </Container>
  );
}
