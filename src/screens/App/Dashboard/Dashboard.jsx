// @flow

import React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components';
import type { NavigationScreenProps } from 'react-navigation';

import { BACKGROUND_WHITE } from '@styles/colors';

import UserInfo from './UserInfo';
import TilesNavigation from './TilesNavigation';

const ScreenContainer = styled.View``;
const Content = styled.ScrollView`
  height: 100%
  background: ${({ theme }) => theme.colors[BACKGROUND_WHITE]};
`;

type Props = {
  navigation: NavigationScreenProps
};

export default function Dashboard({ navigation }: Props) {
  const navigateToGenerator = (location) => () => navigation.navigate(location);
  const navigationItems = [
    { label: 'Activities', icon: 'child', onPress: navigateToGenerator('Activities') },
    { label: 'Progress', icon: 'chart-line', onPress: navigateToGenerator('dupa') },
    { label: 'Messages', icon: 'envelope', onPress: navigateToGenerator('Messages') },
    { label: 'Alerts', icon: 'bell', onPress: navigateToGenerator('dupa') },
    { label: 'Friends', icon: 'user-friends', onPress: navigateToGenerator('dupa') },
    { label: 'Settings', icon: 'cog', onPress: navigateToGenerator('Settings') },
  ];

  return (
    <SafeAreaView>
      <ScreenContainer>
        <UserInfo />
        <Content>
          <TilesNavigation items={navigationItems} />
        </Content>
      </ScreenContainer>
    </SafeAreaView>

  );
}
