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

  constructor(props) {
    super(props);
  }

  onContextCreate = async context => {
    this.app = new PIXI.Application({ context });
    this.app.renderer.backgroundColor = 0xFFFFFF;
    this.pS = this.app.screen.height;
    const model = new Model();
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

  drawBackground() {
    // var grad = bufferCtx.createLinearGradient(0,0,0,this.pS);
    // grad.addColorStop(0,"#4087c5");
    // grad.addColorStop(1,"#71abd6");
    // bufferCtx.fillStyle = grad;
    // bufferCtx.fillRect(0, 0, this.pS*aR, this.pS);
    this.app.stage.removeChildren().forEach(child => child.destroy());
  }

  drawPaddle(rect) {
    let rectangle = new PIXI.Graphics;
    rectangle.beginFill(0x810F7C);
    rectangle.lineStyle(1, 0, 0);
    rectangle.drawRect(rect.vMin.x*this.pS, rect.vMin.y*this.pS, rect.getWidth()*this.pS, rect.getHeight()*this.pS);
    this.app.stage.addChild(rectangle);
  }

  drawBall(circ) {
    let circle = new PIXI.Graphics;
    circle.beginFill(0x006344);
    circle.drawCircle(circ.o.x*this.pS, circ.o.y*this.pS, circ.r*this.pS)
    this.app.stage.addChild(circle);
  }

  drawWall(rect, colour) {
    let rectangle = new PIXI.Graphics;
    rectangle.beginFill(colour);
    rectangle.lineStyle(1, 0, 0);
    rectangle.drawRect(rect.vMin.x*this.pS, rect.vMin.y*this.pS, rect.getWidth()*this.pS, rect.getHeight()*this.pS);
    this.app.stage.addChild(rectangle);
  }

  drawBrick(rect, colour) {
    let rectangle = new PIXI.Graphics;
    rectangle.beginFill(colour);
    rectangle.lineStyle(1, 0, 0);
    rectangle.drawRect(rect.vMin.x*this.pS, rect.vMin.y*this.pS, rect.getWidth()*this.pS, rect.getHeight()*this.pS);
    this.app.stage.addChild(rectangle);
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
