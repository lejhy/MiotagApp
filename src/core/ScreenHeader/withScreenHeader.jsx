// @flow

import React from 'react';
import styled from 'styled-components';

import { BACKGROUND_WHITE } from '@styles/colors';
import ScreenHeader from '.';


const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors[BACKGROUND_WHITE]};
`;

const withScreenHeader = ({ title = '', includeBackButton = true, includeAlerts = true }) => (Screen) => (props) => (
  <SafeArea>
    <ScreenHeader
      title={title}
      includeBackButton={includeBackButton}
      includeAlerts={includeAlerts}
    />
    <Screen {...props} />
  </SafeArea>
);

export default withScreenHeader;
