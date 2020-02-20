/* jshint -W097 */
"use strict";

import { PIXI } from 'expo-pixi';

export default class Ball extends PIXI.Graphics {

    constructor(x, y, radius, velocity) {
        super();
        this.beginFill(0x006344);
        this.drawCircle(0, 0, radius);
        this.endFill();

        this.position.x = x;
        this.position.y = y;

        this.velocity = velocity
    }

    move(dTime) {
        const distance = this.velocity.mult(dTime);
        this.position.x += distance.x;
        this.position.y += distance.y;
    }
}
