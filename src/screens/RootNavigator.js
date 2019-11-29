// @flow

import { createSwitchNavigator } from 'react-navigation';

import SplashScreen from './Splash';
import AuthNavigator from './Auth/AuthNavigator';
import AppNavigator from './App/AppNavigator';

const RootNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  Auth: AuthNavigator,
  App: AppNavigator,
}, {
  initialRouteName: 'Splash',
});

export default RootNavigator;
