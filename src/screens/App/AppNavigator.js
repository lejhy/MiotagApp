// @flow

import { createStackNavigator } from 'react-navigation-stack';

import Dashboard from './Dashboard';

const AppNavigator = createStackNavigator({
  Dashboard: {
    screen: Dashboard,
  },
}, {
  initialRouteName: 'Dashboard',
  headerMode: 'none',
});

export default AppNavigator;
