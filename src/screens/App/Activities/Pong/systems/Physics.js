// @flow

import Matter from 'matter-js';


const Physics = (getSensors) => (entities, { time }) => {
  const sensors = getSensors();
  const { roll } = sensors.axes;
  // console.log(roll);

  const { engine } = entities.physics;
  const paddle = entities.paddle.body;

  const paddleSpeed = Math.abs(roll) < 10 ? 0 : 1;

  Matter.Body.setVelocity(paddle, {
    x: roll > 0 ? paddleSpeed : -paddleSpeed,
    y: 0,
  });

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
