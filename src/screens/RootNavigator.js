// @flow

import { createSwitchNavigator } from 'react-navigation';

import SplashScreen from './Splash';
import AuthNavigator from './Auth/AuthNavigator';
import AppNavigator from './App/AppNavigator';
import ProfileCreationScreen from './ProfileCreation';
import ActivityViewNavigator from './ActivityView/ActivityViewNavigator';

const RootNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  Auth: AuthNavigator,
  ProfileCreation: ProfileCreationScreen,
  App: AppNavigator,
  ActivityView: ActivityViewNavigator,
}, {
  initialRouteName: 'Splash',
});

export default RootNavigator;
