// @flow

/* jshint -W097 */


export function Physics() {
  function resolve(dTime, balls, obstacles) {
    let collisions = [];
    balls.forEach((ball) => {
      collisions = collisions.concat(resolveBall(dTime, ball, obstacles));
    });
    return collisions;
  }

  function resolveBall(dTime, ball, obstacles) {
    const collisions = [];
    ball.move(dTime);
    obstacles.forEach((obstacle) => {
      const nearestX = Math.max(obstacle.position.x, Math.min(ball.center.getX(), obstacle.position.x + obstacle.width));
      const nearestY = Math.max(obstacle.position.y, Math.min(ball.center.getY(), obstacle.position.y + obstacle.height));

      const distanceX = nearestX - ball.center.getX();
      const distanceY = nearestY - ball.center.getY();
      const distanceMagnitude = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));

      if (distanceMagnitude <= ball.radius) {
        const normalisedDistanceX = distanceX / distanceMagnitude;
        const normalisedDistanceY = distanceY / distanceMagnitude;

        const velocityMagnitude = Math.sqrt((ball.velocity.x * ball.velocity.x) + (ball.velocity.y * ball.velocity.y));
        const normalisedVelocityX = ball.velocity.x / velocityMagnitude;
        const normalisedVelocityY = ball.velocity.y / velocityMagnitude;

        const penetrationDepth = ball.radius - distanceMagnitude;
        ball.position.x -= normalisedVelocityX * penetrationDepth;
        ball.position.y -= normalisedVelocityY * penetrationDepth;
        // TODO update velocity based on all colitions combined
        const dot = ball.velocity.x * normalisedDistanceX + ball.velocity.y * normalisedDistanceY;

        ball.velocity.x -= 2 * dot * normalisedDistanceX;
        ball.velocity.y -= 2 * dot * normalisedDistanceY;

        collisions.push(new Collision(ball, obstacle));
      }
    });
    return collisions;
  }

  return {
    resolve,
  };
}

export function Vector2(xCoordinate, yCoordinate) {
  this.x = xCoordinate;
  this.y = yCoordinate;

  this.add = function (vector) {
    const x = this.x + vector.x;
    const y = this.y + vector.y;
    return new Vector2(x, y);
  }.bind(this);

  this.sub = function (vector) {
    const x = this.x - vector.x;
    const y = this.y - vector.y;
    return new Vector2(x, y);
  }.bind(this);

  this.mult = function (number) {
    const x = this.x * number;
    const y = this.y * number;
    return new Vector2(x, y);
  }.bind(this);

  this.flip = function (axis) {
    if (axis === 'x') {
      return new Vector2(-this.x, this.y);
    }
    if (axis === 'y') {
      return new Vector2(this.x, -this.y);
    }
    if (axis === 'both') {
      return new Vector2(-this.x, -this.y);
    }
    throw Error("Illegal argument for 'axis'");
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
    getTarget,
    getSource,
  };
}
