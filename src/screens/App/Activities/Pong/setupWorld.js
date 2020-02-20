// @flow

import { Dimensions } from 'react-native';
import Matter from 'matter-js';

import Box from './entities/Box';
import { PADDLE_WIDTH_FRAC, PADDLE_HEIGHT } from './contants';

const setupWorld = () => {
  const { width, height } = Dimensions.get('window');

  const engine = Matter.Engine.create({ enableSleeping: false });
  const { world } = engine;
  world.gravity.y = 0.0;

  const plank = Matter.Bodies.rectangle(
    width / 2,
    height / 2,
    PADDLE_WIDTH_FRAC * width,
    PADDLE_HEIGHT,
    {
      isStatic: true,
      label: 'plank',
      width: PADDLE_WIDTH_FRAC * width,
      height: PADDLE_HEIGHT,
    },
  );


  Matter.World.add(world, [plank]);

  return {
    physics: { engine, world },
    plank: { body: plank, renderer: Box },
  };
};

export default setupWorld;
