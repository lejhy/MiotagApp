// @flow

import Matter from 'matter-js';


const Physics = (entities, { time }) => {
  console.log(entities);
  const { engine } = entities.physics;

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
