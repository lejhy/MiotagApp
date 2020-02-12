// @flow

import { createSwitchNavigator } from 'react-navigation';

import Debug from './Debug';

const ActivityViewNavigator = createSwitchNavigator({
  Debug,
}, {
  initialRouteName: 'Debug',
});

export default ActivityViewNavigator;
