// @flow

import Matter from 'matter-js';


const Physics = (getSensors) => (entities, { time }) => {
  const { engine } = entities.physics;

  const sensors = getSensors();
  console.log(sensors[6], sensors[7], sensors[8]);
  /*
  const paddle = entities.paddle.body;
  const sensors = getSensors();
  const { roll } = sensors.axes;
  // console.log(roll);

  const paddleSpeed = Math.abs(roll) < 10 ? 0 : 1;

  Matter.Body.setVelocity(paddle, {
    x: roll > 0 ? paddleSpeed : -paddleSpeed,
    y: 0,
  });
  */

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
