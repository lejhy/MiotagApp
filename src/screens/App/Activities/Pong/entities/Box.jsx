// @flow

import React from 'react';
import { View } from 'react-native';

type Props = {
  body: {
    position: {
      x: Number,
      y: Number,
    },
    angle: Number,
    width: Number,
    height: Number,
  },
  color: String,
};

const Box = ({
  body: {
    position, angle, width, height, color,
  },
}: Props) => {
  const x = position.x - width / 2;
  const y = position.y - height / 2;

  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        transform: [{ rotate: `${angle}rad` }],
        backgroundColor: color || 'pink',
      }}
    />
  );
};

export default Box;
