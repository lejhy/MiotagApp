// @flow

import Matter from 'matter-js';

const Physics = (state, { time }) => {
  console.log(state);
  const { engine } = state.engine;
  Matter.Engine.update(engine, time.delta);

  return state;
};

export default Physics;
