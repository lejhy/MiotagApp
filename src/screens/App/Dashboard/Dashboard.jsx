// @flow

import React from 'react';
import styled from 'styled-components';
import type { NavigationScreenProps } from 'react-navigation';

import { SUB_HEADER } from '@styles/fonts';
import useUser from '@hooks/useUser';
import { Text } from '@core';


import TilesNavigation from './TilesNavigation';

const ScreenContainer = styled.View`
  height: 100%;
`;
const Content = styled.ScrollView`
`;

type Props = {
  navigation: NavigationScreenProps,
  theme: {
    colors: any
  }
};

export default function Dashboard({ navigation }: Props) {
  const navigateToGenerator = (location) => () => navigation.navigate(location);
  const navigationItems = [
    {
      label: 'Activities', icon: 'child', onPress: navigateToGenerator('Activities'),
    },
    {
      label: 'My progress', icon: 'chart-line', onPress: navigateToGenerator('Progress'),
    },
    {
      label: 'Messages', icon: 'envelope', onPress: navigateToGenerator('Messages'),
    },
    {
      label: 'Friends', icon: 'user-friends', onPress: navigateToGenerator('Friends'),
    },
    {
      label: 'Profile settings', icon: 'cog', onPress: navigateToGenerator('Settings'),
    },
  ];
  const [{ firstName }] = useUser();

  return (
    <ScreenContainer>
      <Text ml="16px" mt="16px" mb="16px" bold size={SUB_HEADER}>
        { `Hello ${firstName}!` }
      </Text>
      <Content>
        <TilesNavigation items={navigationItems} />
      </Content>
    </ScreenContainer>
  );
}
