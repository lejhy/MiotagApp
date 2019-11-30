// @flow

import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';

import { UserProvider } from '@hooks/useUser/provider';
import { theme } from '@styles';
import AppContainer from './AppContainer';

const App = () => (
  <>
    <ThemeProvider theme={theme}>
      <UserProvider>
        <StatusBar barStyle="dark-content" />
        <AppContainer />
      </UserProvider>
    </ThemeProvider>
  </>
);

export default App;
