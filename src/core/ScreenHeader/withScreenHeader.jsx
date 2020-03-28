// @flow

import React from 'react';
import styled from 'styled-components';

import { BACKGROUND_WHITE } from '@styles/colors';
import ScreenHeader from '.';


const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors[BACKGROUND_WHITE]};
`;

const withScreenHeader = ({ title = '', includeBackButton = true }) => (Screen) => (props) => (
  <SafeArea>
    <ScreenHeader
      title={title}
      includeBackButton={includeBackButton}
    />
    <Screen {...props} />
  </SafeArea>
);

export default withScreenHeader;
