/* jshint -W097 */
"use strict";


export default function Brick(rect, colour) {

    function getRect() {
        return rect;
    }

    function getColour() {
        return colour
    }

    return {
        getRect : getRect,
        getColour : getColour
    }
}
