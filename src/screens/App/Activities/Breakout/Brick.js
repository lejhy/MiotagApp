/* jshint -W097 */
"use strict";

import { PIXI } from 'expo-pixi';

export default class Brick extends PIXI.Graphics {

    constructor(x, y, width, height, colour) {
        super();
        this.beginFill(colour);
        this.lineStyle(1, 0x000000, 1, 0);
        this.drawRect(0, 0, width, height);
        this.endFill();

        this.position.x = x;
        this.position.y = y;
    }
}
