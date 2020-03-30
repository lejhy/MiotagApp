// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import type { NavigationScreenProps } from 'react-navigation';

import { GRAY, LIGHT_GRAY } from '@styles/colors';
import { SUB_HEADER } from '@styles/fonts';
import { withNavigation } from 'react-navigation';
import { Button, Text } from '@core';

const Container = styled.View`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 5px;
  padding: 5%;
  margin-bottom: 30px;
  shadow-color: #000;
  shadow-offset: 2px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
  elevation: 2;
`;

const TitleContainer = styled.View`
  padding-bottom: 10px;
  margin-bottom: 10px;
  border: 1px solid transparent;
  border-bottom-color: ${({ theme }) => theme.colors[LIGHT_GRAY]};
  display: flex;
  flex-direction: row;
`;

const BottomContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const LastPlayedContainer = styled.View`
  display: flex;
  flex-direction: row;
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
  navigation: NavigationScreenProps
};

function ActivityItem({ activity, navigation }: Props) {
  const onPressHandler = () => navigation.navigate(activity.name, { id: activity.id });

  return (
    <Container>
      <TitleContainer>
        <Text bold size={SUB_HEADER} style={{flex: 1}}>
          { activity.name }
        </Text>
        <ButtonContainer>
          <View>
            <Button
              variant="secondary"
              onPress={onPressHandler}
            >
              Play
            </Button>
          </View>
        </ButtonContainer>
      </TitleContainer>
      <BottomContainer>
        <LastPlayedContainer>
          <Text>Last played: </Text>
          <Text bold>
            { activity.lastPlayed }
          </Text>
        </LastPlayedContainer>
      </BottomContainer>
    </Container>
  );
}

export default withNavigation(ActivityItem);
