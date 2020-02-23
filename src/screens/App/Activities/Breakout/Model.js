// @flow

import { PIXI } from 'expo-pixi';
import Ball from './Ball';
import Paddle from './Paddle';
import {Collision, Physics, Vector2} from './Physics';
import SumoWrestler from './SumoWrestler.json';
import GameBug from './GameBug.json';
import MarioMushroom from './MarioMushroom.json';

export default class Model {

  width: number;
  height: number;
  stage: PIXI.Container;
  renderer: PIXI.WebGLRenderer;

  observers = [];
  colours = [0xFFFF00, 0x00FF00, 0x0000FF, 0xFF0000];
  levels = [
    [SumoWrestler, 'Sumo Wrestler', 'IvoryMalinov', 'piq.codeus.net', 'http://piq.codeus.net/picture/70010/sumo_wrestler', 'Creative Commons'],
    [GameBug, 'Game bug', 'mrskittens2003', 'piq.codeus.net', 'http://piq.codeus.net/picture/306960/game_bug', 'Creative Commons'],
    [MarioMushroom, 'Mario Mushroom', 'mrskittens2003', 'piq.codeus.net', 'http://piq.codeus.net/picture/307048/mario_mushroom', 'Creative Commons'],
  ];

  running = false;
  currentLevel = 0;
  physics = new Physics();
  ballTexture: PIXI.Texture;
  wallTexture: PIXI.Texture;
  paddleTexture: PIXI.Texture;

  scene = new PIXI.Container();
  balls: PIXI.Container;
  walls: PIXI.Container;
  bricks: PIXI.Container;
  brickTextures: Map<number, PIXI.Texture>;

  paddle: Paddle;
  bottomWall: PIXI.Sprite;
  leftWall: PIXI.Sprite;
  topWall: PIXI.Sprite;
  rightWall: PIXI.Sprite;

  constructor(app: PIXI.Application) {
    this.width = app.screen.width;
    this.height = app.screen.height;
    this.stage = app.stage;
    this.renderer = app.renderer;

    const ballGraphics = new PIXI.Graphics();
    ballGraphics.beginFill(0x006344);
    ballGraphics.drawCircle(0, 0, 0.02 * this.height);
    ballGraphics.endFill();
    this.ballTexture = this.renderer.generateTexture(ballGraphics);

    const wallGraphics = new PIXI.Graphics();
    wallGraphics.beginFill(0x000000);
    wallGraphics.lineStyle(1, 0x000000, 1, 0);
    wallGraphics.drawRect(0, 0, this.width, this.height);
    wallGraphics.endFill();
    this.wallTexture = this.renderer.generateTexture(wallGraphics);

    const paddleGraphics = new PIXI.Graphics();
    paddleGraphics.beginFill(0x810F7C);
    paddleGraphics.lineStyle(1, 0, 0);
    paddleGraphics.drawRect(0, 0, 0.35 * this.width, 0.02 * this.height);
    paddleGraphics.endFill();
    this.paddleTexture = this.renderer.generateTexture(paddleGraphics);
  }

  restart() {
    this.stage.removeChildren();
    this.scene.destroy({ children: true});
    this.scene = new PIXI.Container();
    this.stage.addChild(this.scene);

    this.paddle = new Paddle(0.35 * this.width, 0.95 * this.height, 0, this.width, this.paddleTexture);
    this.scene.addChild(this.paddle);
    this.createWalls();
    this.createBalls();
    this.loadLevel();
  }

  createWalls() {
    this.walls = new PIXI.Container();

    this.bottomWall = this.walls.addChild(PIXI.Sprite.from(this.wallTexture));
    this.bottomWall.position.x = 0;
    this.bottomWall.position.y = this.height;

    this.leftWall = this.walls.addChild(PIXI.Sprite.from(this.wallTexture));
    this.leftWall.position.x = -this.width;
    this.leftWall.position.y = 0;

    this.topWall = this.walls.addChild(PIXI.Sprite.from(this.wallTexture));
    this.topWall.position.x = 0;
    this.topWall.position.y = -this.height;

    this.rightWall = this.walls.addChild(PIXI.Sprite.from(this.wallTexture));
    this.rightWall.position.x = this.width;
    this.rightWall.position.y = 0;

    this.scene.addChild(this.walls);
  }

  loadLevel() {
    this.bricks = new PIXI.Container();
    this.brickTextures = new Map<number, PIXI.Texture>();
    const level = this.levels[this.currentLevel][0];
    let width = this.width / level.width;
    let height = this.width / level.height;
    for (let row = 0; row < level.height; row++) {
      for (let pixel = 0; pixel < level.width; pixel++) {
        const index = row * level.width + pixel;
        if (level.data[index] > 0) {
          const colour = level.data[index];
          const texture = this._createBrickTexture(
            width,
            height,
            colour
          );
          const brick = PIXI.Sprite.from(texture);
          brick.position.x = pixel * this.width / level.width;
          brick.position.y = row * this.width / level.height;
          this.bricks.addChild(brick);
        }
      }
    }
    this.scene.addChild(this.bricks);
  }

  _createBrickTexture(width, height, colour): PIXI.Texture {
    let texture = this.brickTextures.get(colour);
    if (texture === undefined) {
      const brickGraphics = new PIXI.Graphics();
      brickGraphics.beginFill(colour);
      brickGraphics.lineStyle(1, 0x000000, 1, 0);
      brickGraphics.drawRect(0, 0, width, height);
      brickGraphics.endFill();
      texture = this.renderer.generateTexture(brickGraphics);
      this.brickTextures.set(colour, texture);
    }
    return texture;
  }

  createBalls() {
    this.balls = new PIXI.Container();
    this.createBall(0.5 * this.width, 0.75 * this.height, new Vector2(-0.002 * this.height, -0.002 * this.height));
    this.scene.addChild(this.balls);
  }

  createBall(x, y, v) {
    this.balls.addChild(new Ball(
      x,
      y,
      v,
      this.ballTexture
    ));
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

  resolveCollisions(collisions) {
    for (let i = 0; i < collisions.length; i++) {
      const target = collisions[i].getTarget();
      // Check for bottom wall collision and game over
      if (target === this.bottomWall) {
        const source = collisions[i].getSource();
        this.balls.removeChild(source).destroy();
        if (this.balls.children.length === 0) {
          this.gameOver();
          return;
        }
      }
      const removed = this.bricks.removeChild(target);
      if (removed) {
        if (this.bricks.children.length === 0) {
          this.nextLevel();
          return;
        } else {
          if (Math.random() < 0.1) {
            this.createBall(removed.position.x, removed.position.y, new Vector2(0, 0.005 * this.height));
          }
        }
        removed.destroy();
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
