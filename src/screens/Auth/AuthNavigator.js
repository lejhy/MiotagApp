// @flow

import { createStackNavigator } from 'react-navigation-stack';

import Welcome from './Welcome';
import SignIn from './SignIn';
import ProfileTypeSelection from './ProfileTypeSelection';
import CreateNewAccount from './CreateNewAccount';

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
  CreateNewAccount: {
    screen: CreateNewAccount,
  },
}, {
  initialRouteName: 'Welcome',
  headerMode: 'none',
});

export default AppNavigator;
