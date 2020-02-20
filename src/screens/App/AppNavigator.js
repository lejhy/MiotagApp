// @flow

import { createStackNavigator } from 'react-navigation-stack';

import Dashboard from './Dashboard';
import Activities from './Activities';
import FreeMode from './Activities/FreeMode';
import Debug from './Activities/Debug';
import Pong from './Activities/Pong';
import Breakout from './Activities/Breakout';
import Progress from './Progress';
import Settings from './Settings';
import Messages from './Messages';
import Friends from './Friends';
import Profile from './Profile';
import UserSearch from './UserSearch';
import Chat from './Chat';

const AppNavigator = createStackNavigator({
  Dashboard: {
    screen: Dashboard,
  },
  Activities: {
    screen: Activities,
  },
  // games
  'Free Mode': {
    screen: FreeMode,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  'BLE Debug': {
    screen: Debug,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  Pong: {
    screen: Pong,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  Breakout: {
    screen: Breakout,
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
  Chat: {
    screen: Chat,
  },
}, {
  initialRouteName: 'Dashboard',
  headerMode: 'none',
});

export default AppNavigator;
