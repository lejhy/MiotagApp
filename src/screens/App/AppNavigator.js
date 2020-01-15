// @flow

import { createStackNavigator } from 'react-navigation-stack';

import Dashboard from './Dashboard';
import Activities from './Activities';
import Settings from './Settings';
import Messages from './Messages';

const AppNavigator = createStackNavigator({
  Dashboard: {
    screen: Dashboard,
  },
  Activities: {
    screen: Activities,
  },
  Settings: {
    screen: Settings,
  },
  Messages: {
    screen: Messages,
  },
}, {
  initialRouteName: 'Dashboard',
  headerMode: 'none',
});

export default AppNavigator;
