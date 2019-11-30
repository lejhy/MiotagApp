// @flow

import React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Text } from '@core';

import UserInfo from './UserInfo';

const Container = styled.View`

`;

type Props = {

};

export default function Dashboard(props: Props) {
  return (
    <SafeAreaView>
      <Container>
        <UserInfo />
      </Container>
    </SafeAreaView>

  );
}
