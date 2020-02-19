/* jshint -W097 */
"use strict";

import { Rectangle, Vector2 } from './Physics';

export default function Ball (circ, vel) {

    function move(dTime) {
        circ.o = circ.o.add(vel.mult(dTime));
        return new Vector2()
    }

    function flipHorizontally() {
        vel = vel.flip("x");
    }

    function flipVertically() {
        vel = vel.flip("y");
    }

    function getRect() {
        var vMin = new Vector2(circ.o.x - circ.r, circ.o.y - circ.r);
        var vMax = new Vector2(circ.o.x + circ.r, circ.o.y + circ.r);
        return new Rectangle(vMin, vMax);
    }

    function getCirc() {
        return circ;
    }

    function getVelocity() {
        return vel;
    }

    return {
        move : move,
        flipHorizontally : flipHorizontally,
        flipVertically : flipVertically,
        getRect : getRect,
        getCirc : getCirc,
        getVelocity : getVelocity
    }
}
