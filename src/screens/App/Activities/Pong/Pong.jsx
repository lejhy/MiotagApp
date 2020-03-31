// @flow

import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { GameEngine } from 'react-native-game-engine';

import setupWorld from './setupWorld';
import Physics from './systems/Physics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const Pong = ({ getImu }) => {
  const entities = setupWorld();

  return (
    <GameEngine
      style={styles.container}
      systems={[Physics(getImu)]}
      entities={entities}
    >
      <StatusBar hidden />
    </GameEngine>
  );
};

export default Pong;
