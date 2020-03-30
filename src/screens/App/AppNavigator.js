// @flow

import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';

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
import Notifications from './Notifications';

const AppNavigator = createStackNavigator({
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
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  // rest of the screens
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
  Chat: {
    screen: Chat,
  },
  Notifications: {
    screen: Notifications,
    navigationOptions: {
      ...TransitionPresets.ModalTransition,
    },
  },
}, {
  initialRouteName: 'Dashboard',
  headerMode: 'none',
});

export default AppNavigator;
