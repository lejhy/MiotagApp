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

  const playerPaddle = Matter.Bodies.rectangle(
    width / 2,
    height - PADDLE_HEIGHT,
    PADDLE_WIDTH_FRAC * width,
    PADDLE_HEIGHT,
    {
      label: 'plank',
      width: PADDLE_WIDTH_FRAC * width,
      height: PADDLE_HEIGHT,
    },
  );

  const opponentPaddle = Matter.Bodies.rectangle(
    width / 2,
    PADDLE_HEIGHT,
    PADDLE_WIDTH_FRAC * width,
    PADDLE_HEIGHT,
    {
      label: 'plank',
      width: PADDLE_WIDTH_FRAC * width,
      height: PADDLE_HEIGHT,
    },
  );

  const wallLeft = Matter.Bodies.rectangle(
    5,
    height / 2,
    10,
    height,
    {
      isStatic: true,
      width: 10,
      height,
      color: 'orange',
    },
  );

  const wallRight = Matter.Bodies.rectangle(
    width - 5,
    height / 2,
    10,
    height,
    {
      isStatic: true,
      width: 10,
      height,
      color: 'green',
    },
  );


  Matter.World.add(world, [
    playerPaddle,
    opponentPaddle,
    wallLeft,
    wallRight,
  ]);

  return {
    physics: { engine, world },
    playerPaddle: { body: playerPaddle, renderer: Box },
    opponentPaddle: { body: opponentPaddle, renderer: Box },
    wallLeft: { body: wallLeft, renderer: Box },
    wallRight: { body: wallRight, renderer: Box },
  };
};

export default setupWorld;
