// @flow

import React from 'react';
import { RefreshControl } from 'react-native';
import styled from 'styled-components';
import type { NavigationScreenProps } from 'react-navigation';

import useProfile from '@hooks/useProfile';
import { Button, UserInfo } from '@core';

import ProgressView from '../Progress/ProgressView';

const ScrollContainer = styled.ScrollView`
  height: 100%;
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
  z-index: 100;
`;

const ButtonContainer = styled.View`
  flex: 1;
  padding: 10px;
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
    { init, toggleFriend, getFullName },
  ] = useProfile(id);
  const openChat = () => navigate('Chat', { id });

  return (
    <>
      <ActionsContainer>
        <ButtonContainer>
          <Button
            variant="secondary"
            textSize="regular"
            icon={isFriend ? 'user-minus' : 'user-plus'}
            loading={isFriend === undefined}
            onPress={toggleFriend}
          >
            { isFriend ? 'Unfollow' : 'Follow' }
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
            <UserInfo fullName={getFullName()} />
            <ProgressView logs={logs} />
          </ScrollContent>
        )}
      </ScrollContainer>
    </>
  );
}
