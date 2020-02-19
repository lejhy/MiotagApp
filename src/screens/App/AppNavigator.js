// @flow

import { createStackNavigator } from 'react-navigation-stack';

import Dashboard from './Dashboard';
import Activities from './Activities';
import FreeMode from './Activities/FreeMode';
import Breakout from './Activities/Breakout';
import Progress from './Progress';
import Settings from './Settings';
import Messages from './Messages';
import Friends from './Friends';

import Profile from './Profile';
import UserSearch from './UserSearch';
import Chat from './Chat';
import Debug from './Activities/Debug';

const AppNavigator = createStackNavigator({
  Dashboard: {
    screen: Dashboard,
  },
  Activities: {
    screen: Activities,
  },
  'Free Mode': {
    screen: FreeMode,
  },
  'BLE Debug': {
    screen: Debug,
  },
  "Breakout": {
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
