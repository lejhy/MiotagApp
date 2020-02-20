// @flow

import React, { Component } from 'react';
import { View } from 'react-native';

export default class BoxAlternative extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;
    const { angle } = this.props.body;

    return (
      <View
        style={
          {
            position: 'absolute',
            left: x,
            top: y,
            width,
            height,
            transform: [{ rotate: `${angle}rad` }],
            backgroundColor: this.props.color || 'pink',
          }
        }
      />
    );
  }
}
