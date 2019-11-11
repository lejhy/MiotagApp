// @flow

import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';

import { theme } from '@styles';
import AppContainer from './AppContainer';

const App = () => (
  <>
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="dark-content" />
      <AppContainer />
    </ThemeProvider>
  </>
);

export default App;
