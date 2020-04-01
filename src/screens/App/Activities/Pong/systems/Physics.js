// @flow

import Matter from 'matter-js';

const MAX_PADDLE_SPEED = 10;
const ROLL_MIN = 5;
const ROLL_MAX = 75;

const Physics = (getImu, isPaused) => (entities, { time }) => {
  if (isPaused()) return entities;
  const { engine } = entities.physics;

  const imu = getImu();

  const roll = imu[3];

  let speed = 0;
  const rollAbs = Math.abs(roll);
  if (rollAbs > ROLL_MIN) {
    const multiplier = rollAbs >= ROLL_MAX ? 1 : rollAbs / ROLL_MAX;
    speed = MAX_PADDLE_SPEED * multiplier;
    if (roll < 0) {
      speed *= -1;
    }
  }

  const playerPaddle = entities.playerPaddle.body;

  Matter.Body.setVelocity(playerPaddle, {
    x: speed,
    y: 0,
  });

  // Matter.Body.rotate(playerPaddle, roll);

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
