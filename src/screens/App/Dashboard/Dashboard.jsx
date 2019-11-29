// @flow

import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Text } from '@core';

const Container = styled.View`

`;

type Props = {

};

export default function Dashboard(props: Props) {
  return (
    <Container>
      <Text>Dashboard</Text>
      <Text>Dashboard</Text>
      <Text>Dashboard</Text>
      <Text>Dashboard</Text>
      <Text>Dashboard</Text>
      <Text>Dashboard</Text>
      <Icon name="rocket" size={30} color="#900" />
    </Container>
  );
}
