// @flow

import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { Buffer } from 'buffer';

import { UserProvider } from '@hooks/useUser/provider';
import { AlertsProvider } from '@hooks/useAlerts/provider';
import { BleManagerProvider } from '@hooks/useBleManager/provider';
import { theme } from '@styles';
import AppContainer from './AppContainer';

global.Buffer = Buffer;

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

const App = () => (
  <>
    <ThemeProvider theme={theme}>
      <UserProvider>
        <AlertsProvider>
          <BleManagerProvider>
            <StatusBar barStyle="dark-content" />
            <AppContainer />
          </BleManagerProvider>
        </AlertsProvider>
      </UserProvider>
    </ThemeProvider>
  </>
);

export default App;
