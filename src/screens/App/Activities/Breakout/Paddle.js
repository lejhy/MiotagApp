/* jshint -W097 */
"use strict";


export default function Paddle(rect, xMin, xMax) {

    function move(xOffset) {
        rect.vMin.x += xOffset;
        rect.vMax.x += xOffset;
        if (rect.vMin.x < xMin) move(xMin - rect.vMin.x);
        if (rect.vMax.x > xMax) move(xMax - rect.vMax.x);
    }

    function getRect() {
        return rect;
    }

    return {
        move : move,
        getRect : getRect
    }
}
