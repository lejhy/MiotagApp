// @flow

import { PIXI } from 'expo-pixi';

export default class Paddle extends PIXI.Container {
  constructor(x, y, xMin, xMax, texture) {
    super();
    this.addChild(PIXI.Sprite.from(texture));

    this.position.x = x;
    this.position.y = y;

    this.xMin = xMin;
    this.xMax = xMax;
  }

  move(xOffset) {
    this.position.x += xOffset;
    if (this.position.x < this.xMin) {
      this.position.x = this.xMin;
    }
    if ((this.position.x + this.width) > this.xMax) {
      this.position.x = this.xMax - this.width;
    }
  }
}
