// @flow

import { createSwitchNavigator } from 'react-navigation';

import SplashScreen from './Splash';
import AuthNavigator from './Auth/AuthNavigator';
import AppNavigator from './App/AppNavigator';
import ProfileCreationScreen from './ProfileCreation';

const RootNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  Auth: AuthNavigator,
  ProfileCreation: ProfileCreationScreen,
  App: AppNavigator,
}, {
  initialRouteName: 'Splash',
});

export default RootNavigator;
