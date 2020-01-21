// @flow

import { createStackNavigator } from 'react-navigation-stack';

import Dashboard from './Dashboard';
import Activities from './Activities';
import Progress from './Progress';
import Settings from './Settings';
import Messages from './Messages';
import Friends from './Friends';

import Profile from './Profile';
import UserSearch from './UserSearch';

const AppNavigator = createStackNavigator({
  Dashboard: {
    screen: Dashboard,
  },
  Activities: {
    screen: Activities,
  },
  Progress: {
    screen: Progress,
  },
  Settings: {
    screen: Settings,
  },
  Messages: {
    screen: Messages,
  },
  Friends: {
    screen: Friends,
  },
  Profile: {
    screen: Profile,
  },
  UserSearch: {
    screen: UserSearch,
  },
}, {
  initialRouteName: 'Dashboard',
  headerMode: 'none',
});

export default AppNavigator;
