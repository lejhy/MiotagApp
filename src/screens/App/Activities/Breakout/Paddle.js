/* jshint -W097 */
"use strict";

import { PIXI } from 'expo-pixi';

export default class Paddle extends PIXI.Graphics {

    constructor(x, y, width, height, xMin, xMax) {
        super();
        this.beginFill(0x810F7C);
        this.lineStyle(1, 0, 0);
        this.drawRect(0, 0, width, height);
        this.endFill();

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
