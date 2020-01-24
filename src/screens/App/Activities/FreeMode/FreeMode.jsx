// @flow

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Hand } from './Renderers';

export default class FreeMode extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <Hand />
    )
  }
}

AppRegistry.registerComponent("FreeMode", () => FreeMode);
