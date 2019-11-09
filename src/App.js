import React from 'react';
import {StatusBar} from 'react-native';

import AppContainer from './AppContainer';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AppContainer />
    </>
  );
};

export default App;