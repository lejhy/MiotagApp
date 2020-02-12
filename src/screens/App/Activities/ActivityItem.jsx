// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import { GRAY, LIGHT_GRAY } from '@styles/colors';
import { SUB_HEADER } from '@styles/fonts';
import { Button, Text } from '@core';

const Container = styled.View`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors[GRAY]};
  padding: 5%;
  margin-bottom: 30px;
`;

const TitleContainer = styled.View`
  padding-bottom: 10px;
  margin-bottom: 10px;
  border: 1px solid transparent;
  border-bottom-color: ${({ theme }) => theme.colors[LIGHT_GRAY]};
`;

const BottomContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const LastPlayedContainer = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;

const ButtonContainer = styled.View`
  width: 120px;
  align-items: flex-end;
  justify-content: center;
`;

type Props = {
  activity: {
    id: Number,
    name: String,
    description: String,
    lastPlayed: String,
  },
  onPlay: (any) => any,
};

export default function ActivityItem({ activity, onPlay }: Props) {
  return (
    <Container>
      <TitleContainer>
        <Text bold size={SUB_HEADER}>
          { activity.name }
        </Text>
      </TitleContainer>
      <BottomContainer>
        <LastPlayedContainer>
          <Text>Last played:</Text>
          <Text bold>
            { activity.lastPlayed }
          </Text>
        </LastPlayedContainer>
        <ButtonContainer>
          <View>
            <Button variant="secondary" onPress={onPlay}>
              Play
            </Button>
          </View>
        </ButtonContainer>
      </BottomContainer>
    </Container>
  );
}
