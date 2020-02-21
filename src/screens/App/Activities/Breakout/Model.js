// @flow

import { PIXI } from 'expo-pixi';
import Ball from './Ball';
import Paddle from './Paddle';
import { Physics, Vector2 } from './Physics';
import Brick from './Brick';
import SumoWrestler from './SumoWrestler.json';
import GameBug from './GameBug.json';
import MarioMushroom from './MarioMushroom.json';

export default class Model {

  width: number;
  height: number;
  stage: PIXI.Container;

  observers = [];
  colours = [0xFFFF00, 0x00FF00, 0x0000FF, 0xFF0000];
  levels = [
    [SumoWrestler, 'Sumo Wrestler', 'IvoryMalinov', 'piq.codeus.net', 'http://piq.codeus.net/picture/70010/sumo_wrestler', 'Creative Commons'],
    [GameBug, 'Game bug', 'mrskittens2003', 'piq.codeus.net', 'http://piq.codeus.net/picture/306960/game_bug', 'Creative Commons'],
    [MarioMushroom, 'Mario Mushroom', 'mrskittens2003', 'piq.codeus.net', 'http://piq.codeus.net/picture/307048/mario_mushroom', 'Creative Commons'],
  ];
  brickTextures: PIXI.Texture[] = [];

  running = false;
  currentLevel = 0;
  physics = new Physics();

  scene = new PIXI.Container();
  balls: PIXI.Container;
  walls: PIXI.Container;
  bricks: PIXI.Container;

  paddle: Paddle;
  bottomWall: Brick;
  leftWall: Brick;
  topWall: Brick;
  rightWall: Brick;

  constructor(width: number, height: number, stage: PIXI.Container) {
    this.width = width;
    this.height = height;
    this.stage = stage;
  }

  restart() {
    this.stage.removeChildren();
    this.scene.destroy(true);
    this.scene = new PIXI.Container();
    this.stage.addChild(this.scene);

    this.paddle = new Paddle(0.35 * this.width, 0.95 * this.height, 0.35 * this.width, 0.02 * this.height, 0, this.width);
    this.scene.addChild(this.paddle);
    this.createWalls();
    this.createBalls();
    this.loadLevel();
  }

  createWalls() {
    this.walls = new PIXI.Container();
    this.bottomWall = this.walls.addChild(new Brick(-this.width, this.height, 3 * this.width, this.height, 0x000000));
    this.leftWall = this.walls.addChild(new Brick(-this.width, -this.height, this.width, 3 * this.height, 0x000000));
    this.topWall = this.walls.addChild(new Brick(-this.width, -this.height, 3 * this.width, this.height, 0x000000));
    this.rightWall = this.walls.addChild(new Brick(this.width, -this.height, this.width, 3 * this.height, 0x000000));
    this.scene.addChild(this.walls);
  }

  loadLevel() {
    this.bricks = new PIXI.Container();
    const level = this.levels[this.currentLevel][0];
    for (let row = 0; row < level.height; row++) {
      for (let pixel = 0; pixel < level.width; pixel++) {
        const index = row * level.width + pixel;
        if (level.data[index] > 0) {
          const colour = level.data[index];
          const brick = new Brick(
            pixel * this.width / level.width,
            row * this.width / level.height,
            this.width / level.width,
            this.width / level.height,
            colour,
          );
          this.bricks.addChild(brick);
        }
      }
    }
    this.scene.addChild(this.bricks);
  }

  createBalls() {
    this.balls = new PIXI.Container();
    this.balls.addChild(new Ball(0.5 * this.width, 0.75 * this.height, 0.02 * this.height, new Vector2(-0.002 * this.height, -0.002 * this.height)));
    this.scene.addChild(this.balls);
  }

  loadBasicLevel() {
    this.bricks = [];
    let colourIndex = 0;
    for (let i = 14 / 32; i < 18 / 32; i += 1 / 32) {
      for (let j = 0; j < 1; j += 1 / 18) {
        this.bricks.push(new Brick(j * this.width, i * this.height, 1 / 18 * this.width, 1 / 32 * this.height, this.colours[colourIndex]));
      }
      colourIndex++;
    }
  }

  newGame() {
    this.currentLevel = 0;
    this.restart();
  }

  startGame() {
    this.running = true;
  }

  nextLevel() {
    this.currentLevel++;
    if (this.currentLevel === this.levels.length) {
      this.gameWon();
    } else {
      this.restart();
    }
  }

  gameOver() {
    this.running = false;
    this.notify('GAME_OVER');
  }

  gameWon() {
    this.running = false;
    this.notify('GAME_WON');
  }

  getLevels() {
    return this.levels;
  }

  tick(dTime: number, tilt: number) {
    if (this.running) {
      let scaledInput = tilt * dTime;
      scaledInput *= 0.0004 * this.width;
      this.paddle.move(scaledInput);
      const collisions = this.physics.resolve(dTime, this.balls.children, this.getObstacles());
      this.resolveCollisions(collisions);
    }
  }

  resolveCollisions(collisions: PIXI.Graphics[]) {
    for (let i = 0; i < collisions.length; i++) {
      const target = collisions[i].getTarget();
      // Check for bottom wall collision and game over
      if (target === this.bottomWall) {
        this.gameOver();
        return;
      }
      const removed = this.bricks.removeChild(target);
      if (removed) {
        console.log("REMOVED", removed);
        removed.destroy();
        if (this.bricks.children.length === 0) {
          this.nextLevel();
          return;
        }
      }
    }
  }

  getObstacles(): PIXI.Graphics[]  {
    let obstacles = [this.paddle];
    return obstacles.concat(this.bricks.children, this.walls.children);
  }

  addObserver(observer: any) {
    this.observers.push(observer);
  }

  removeObserver(observer: any) {
    const index = this.observers.indexOf(observer);
    this.observers.splice(index, 1);
  }

  notify(args: any) {
    this.observers.forEach((observer) => {
      observer.update(args);
    });
  }
}
