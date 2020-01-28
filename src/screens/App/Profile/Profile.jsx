// @flow

import React from 'react';
import { RefreshControl } from 'react-native';
import styled from 'styled-components';

import useProfile from '@hooks/useProfile';
import DefaultImage from '@assets/img/default-img.svg';
import { Button, ScreenHeader, Text } from '@core';

import ProgressView from '../Progress/ProgressView';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  position: relative;
`;

const ScrollContainer = styled.ScrollView`
  height: 100%;
`;

const TopContainer = styled.View`
  flex-direction: row;
`;

const ActionsContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding-bottom: 30px;
  background-color: white;
  z-index: 100;
`;

const ButtonContainer = styled.View`
  flex: 1;
  padding: 10px;
`;

const ImageContainer = styled.View`
  height: 100px;
  width: 100px;
  border-radius: 50px;
  margin: 10px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;

const UserInfoContainer = styled.View`
  flex-direction: column;
  flex: 1;
  justify-content: center;
`;

const UserInfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const UserInfoLeft = styled.View`
  justify-content: flex-end;
  min-width: 100px;
`;

const UserInfoRight = styled.View`
  flex: 1;
  flex-basis: auto;
`;

const ScrollContent = styled.View`
  padding-bottom: 100px;
`;

type Props = {
  navigation: NavigationScreenProps
};

export default function Profile({ navigation: { navigate, state } }: Props) {
  const { id } = state.params;
  const [
    {
      user, loading, isFriend, logs,
    },
    { init, toggleFriend },
  ] = useProfile(id);
  const name = (user && user.firstName && user.lastName)
    ? `${user.firstName} ${user.lastName}`
    : 'Profile';
  const openChat = () => navigate('Chat', { id });

  return (
    <SafeAreaView>
      <ScreenHeader title={name} includeBackButton />
      <ActionsContainer>
        <ButtonContainer>
          <Button
            variant="secondary"
            textSize="regular"
            icon={isFriend ? 'user-minus' : 'user-plus'}
            loading={isFriend === undefined}
            onPress={toggleFriend}
          >
            { isFriend ? 'Unfollow' : 'Add Friend' }
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button
            textSize="regular"
            icon="paper-plane"
            onPress={openChat}
          >
            Message
          </Button>
        </ButtonContainer>
      </ActionsContainer>
      <ScrollContainer
        refreshControl={(
          <RefreshControl
            refreshing={loading}
            onRefresh={init}
          />
        )}
      >
        { !loading && user && (
          <ScrollContent>
            <TopContainer>
              <ImageContainer>
                <DefaultImage width="90%" height="90%" />
              </ImageContainer>
              <UserInfoContainer>
                <UserInfoRow>
                  <UserInfoLeft>
                    <Text>Age:</Text>
                  </UserInfoLeft>
                  <UserInfoRight>
                    <Text bold>50</Text>
                  </UserInfoRight>
                </UserInfoRow>
                <UserInfoRow>
                  <UserInfoLeft>
                    <Text>Phone:</Text>
                  </UserInfoLeft>
                  <UserInfoRight>
                    <Text bold>123456789</Text>
                  </UserInfoRight>
                </UserInfoRow>
                <UserInfoRow>
                  <UserInfoLeft>
                    <Text>Address:</Text>
                  </UserInfoLeft>
                  <UserInfoRight>
                    <Text bold>G1 1SJ</Text>
                  </UserInfoRight>
                </UserInfoRow>
              </UserInfoContainer>
            </TopContainer>
            <ProgressView logs={logs} />
          </ScrollContent>
        )}
      </ScrollContainer>
    </SafeAreaView>
  );
}
