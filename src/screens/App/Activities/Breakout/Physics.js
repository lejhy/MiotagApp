/* jshint -W097 */
"use strict";


export function Physics() {

    function resolve(dTime, balls, obstacles) {
        var collisions = [];
        balls.forEach(function(ball){
            collisions = collisions.concat(resolveBall(dTime, ball, obstacles));
        });
        return collisions;
    }

    function resolveBall(dTime, ball, obstacles) {
        var collisions = [];
        ball.move(dTime);
        obstacles.forEach(function(obstacle) {
            var nearestX = Math.max(obstacle.position.x, Math.min(ball.position.x, obstacle.position.x + obstacle.width));
            var nearestY = Math.max(obstacle.position.y, Math.min(ball.position.y, obstacle.position.y + obstacle.height));

            const distX = nearestX - ball.position.x;
            const distY = nearestY - ball.position.y;
            const distance = Math.sqrt((distX*distX) + (distY*distY));

            if (distance <= (ball.width / 2)) {
                console.log("COLLISION");
                var normX = distX / distance;
                var normY = distY / distance;
                var dot = ball.velocity.x * normX + ball.velocity.y * normY;

                ball.velocity.x -= 2 * dot * normX;
                ball.velocity.y -= 2 * dot * normY;

                collisions.push(new Collision(ball, obstacle))
            }
        });
        return collisions;
    }

    return {
        resolve : resolve
    }
}

export function Vector2(xCoordinate, yCoordinate) {

    this.x = xCoordinate;
    this.y = yCoordinate;

    this.add = function(vector) {
        var x = this.x + vector.x;
        var y = this.y + vector.y;
        return new Vector2(x, y);
    }.bind(this);

    this.sub = function(vector) {
        var x = this.x - vector.x;
        var y = this.y - vector.y;
        return new Vector2(x, y);
    }.bind(this);

    this.mult = function(number) {
        var x = this.x * number;
        var y = this.y * number;
        return new Vector2(x, y);
    }.bind(this);

    this.flip = function(axis) {
        if (axis === "x") {
            return new Vector2(-this.x, this.y);
        }
        if (axis === "y") {
            return new Vector2(this.x, -this.y);
        }
        if (axis === "both") {
            return new Vector2(-this.x, -this.y);
        }
        throw "Illegal argument for 'axis'";
    }.bind(this);

}

export function Collision(ball, rectangle) {

    function getTarget() {
        return rectangle;
    }

    function getSource() {
        return ball;
    }

    return {
        getTarget : getTarget,
        getSource : getSource
    }
}

