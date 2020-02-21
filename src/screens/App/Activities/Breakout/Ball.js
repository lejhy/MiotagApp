// @flow

import { PIXI } from 'expo-pixi';

export default class Ball extends PIXI.Container {
  constructor(x, y, velocity, texture) {
    super();
    this.addChild(PIXI.Sprite.from(texture));
    this.position.x = x;
    this.position.y = y;
    this.radius = texture.width / 2;
    this.center = {
      getX: () => this.position.x + this.radius,
      getY: () => this.position.y + this.radius
    };

    this.velocity = velocity;
  }

  move(dTime) {
    const distance = this.velocity.mult(dTime);
    this.position.x += distance.x;
    this.position.y += distance.y;
  }
}
