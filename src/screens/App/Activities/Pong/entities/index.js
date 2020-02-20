// @flow

import { Dimensions } from 'react-native';
import Matter from 'matter-js';

import Box from './Box';

// Overriding this function because the original references HTMLElement
Matter.Common.isElement = () => false;

const { width, height } = Dimensions.get('window');
const paddleSize = Math.trunc(Math.max(width, height) * 0.075);

const engine = Matter.Engine.create({ enableSleeping: false });
const { world } = engine;

const paddle = Matter.Bodies.rectangle(
  width / 2,
  height / 2,
  paddleSize,
  paddleSize,
  { frictionAir: 0.021 },
);

const constraint = Matter.Constraint.create({
  label: 'Drag Constraint',
  pointA: { x: 0, y: 0 },
  pointB: { x: 0, y: 0 },
  length: 0.01,
  stiffness: 0.1,
  angularStiffness: 1,
});

Matter.World.add(world, [paddle]);
Matter.World.addConstraint(world, constraint);

const entities = {
  engine: { engine },
  world: { world },
  constraint: { constraint },
  paddle: {
    body: paddle, size: [paddleSize, paddleSize], color: 'pink', renderer: Box,
  },
};

export default entities;
