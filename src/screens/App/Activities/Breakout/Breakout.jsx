// @flow

import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import ActivitiesService from '@services/api/ActivitiesService';
import Model from './Model';
import Controller from './Controller';
import { GLView } from 'expo-gl';
import { PIXI } from 'expo-pixi';
import Button from '@core/Button/Button';
import Text from '@core/Text/Text';

export default class Breakout extends PureComponent {

  state = {
    menu: []
  };

  app: PIXI.Application;
  pS: Number;
  tilt = 0;
  menu = null;
  scene = new PIXI.Container();

  constructor(props) {
    super(props);
  }

  onContextCreate = async context => {
    this.app = new PIXI.Application({ context });
    this.app.renderer.backgroundColor = 0xFFFFFF;
    this.pS = this.app.screen.height;
    const model = new Model(this.app.screen.width, this.app.screen.height);
    const controller = new Controller(model, this);
    controller.init();
  };

  componentWillUnmount() {
    ActivitiesService.newLog({
      activity: {
        id: this.props.navigation.getParam('id')
      },
      length: new Date() - this.createdAt,
      score: 0
    });
  }

  getTilt() {
    return this.tilt;
  }

  addHeader(text) {
    this.setState(prev => ({
      menu: prev.menu.concat([
        <Text
          style={styles.header}
        >
          {text}
        </Text>
      ])
    }));
  }

  addParagraph(text) {
    this.setState(prev => ({
      menu: prev.menu.concat([
        <Text
          style={styles.paragraph}
        >
          {text}
        </Text>
      ])
    }));
  }

  addButton(text, callback, argument) {
    this.setState(prev => ({
      menu: prev.menu.concat([
        <Button
          style={styles.button}
          onPress={() => {callback(argument)}}
        >
          {text}
        </Button>
      ])
    }));
  }

  eraseMenu() {
    this.setState( {menu: []})
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.menu}>
          {
            this.state.menu
          }
        </View>
        <GLView
          style={{ flex: 1 }}
          onContextCreate={this.onContextCreate}
          onStartShouldSetResponder={(event) => true}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 999
  },
  button: {
    width: '75%',
    margin: '10%'
  },
  header: {
    fontSize: 30,
    margin: '10%'
  },
  paragraph: {

  }
});

AppRegistry.registerComponent("Breakout", () => Breakout);
