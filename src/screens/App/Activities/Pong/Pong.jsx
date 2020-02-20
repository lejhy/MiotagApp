// @flow

import React, { Component } from 'react';
import {
  StyleSheet, StatusBar, Dimensions,
} from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';

import Box from './entities/Box';
import Physics from './Physics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default class Pong extends Component {
  constructor(props) {
    super(props);

    this.state = {
      running: true,
      score: 0,
    };

    this.gameEngine = null;

    this.entities = this.setupWorld();
    console.log('setup:');
    console.log(this.entities);
  }

  setupWorld = () => {
    const { width, height } = Dimensions.get('window');

    const engine = Matter.Engine.create({ enableSleeping: false });
    const { world } = engine;
    world.gravity.y = 0.0;

    const plank = Matter.Bodies.rectangle(
      width / 2,
      height / 2,
      50,
      20,
      {
        isStatic: true,
        label: 'plank',
        width: 50,
        height: 20,
      },
    );


    Matter.World.add(world, [plank]);

    return {
      physics: { engine, world },
      plank: { body: plank, renderer: Box },
    };
  }

  render() {
    console.log('render');
    const { running } = this.state;
    return (
      <GameEngine
        ref={(ref) => { this.gameEngine = ref; }}
        style={styles.container}
        running={running}
        systems={[Physics]}
        entities={this.entities}
      >
        <StatusBar hidden />
      </GameEngine>
    );
  }
}
