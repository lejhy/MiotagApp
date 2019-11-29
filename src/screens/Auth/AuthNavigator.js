// @flow

import { createStackNavigator } from 'react-navigation-stack';

import Welcome from './Welcome';
import SignIn from './SignIn';
import ProfileTypeSelection from './ProfileTypeSelection';

const AppNavigator = createStackNavigator({
  Welcome: {
    screen: Welcome,
  },
  SignIn: {
    screen: SignIn,
  },
  ProfileTypeSelection: {
    screen: ProfileTypeSelection,
  },
}, {
  initialRouteName: 'Welcome',
  headerMode: 'none',
});

export default AppNavigator;
