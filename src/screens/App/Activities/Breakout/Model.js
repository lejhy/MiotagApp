/* jshint -W097 */
"use strict";

import Ball from './Ball';
import Paddle from './Paddle';
import { Physics, Vector2 } from './Physics';
import Brick from './Brick';
import { PIXI } from 'expo-pixi';
import SumoWrestler from './SumoWrestler.json';
import GameBug from './GameBug.json';
import MarioMushroom from './MarioMushroom.json';

export default function Model(width, height) {

    var observers = [];

    var colours = [0xFFFF00, 0x00FF00, 0x0000FF, 0xFF0000];

    var levels = [
        [SumoWrestler, "Sumo Wrestler", "IvoryMalinov", "piq.codeus.net", "http://piq.codeus.net/picture/70010/sumo_wrestler", "Creative Commons"],
        [GameBug, "Game bug", "mrskittens2003", "piq.codeus.net", "http://piq.codeus.net/picture/306960/game_bug", "Creative Commons"],
        [MarioMushroom, "Mario Mushroom", "mrskittens2003", "piq.codeus.net", "http://piq.codeus.net/picture/307048/mario_mushroom", "Creative Commons"]
    ];

    var running = false;
    var currentLevel;
    var paddle = null;
    var balls = [];
    var walls = [];
    var bricks = [];
    var physics = new Physics();

    var scene = new PIXI.Container();

    function restart() {
        scene.removeChildren().forEach(child => child.destroy());

        paddle = new Paddle(0.35*width, 0.95*height, 0.35*width, 0.02*height, 0, width);
        createWalls();
        loadLevel();
        balls = [new Ball(0.5*width, 0.75*height, 0.02*height, new Vector2(-0.002*height, -0.002*height))];

        scene.addChild(paddle);
        walls.forEach(wall => scene.addChild(wall));
        bricks.forEach(brick => scene.addChild(brick));
        balls.forEach(ball => scene.addChild(ball));
    }

    function createWalls() {
        let bottomWall = new Brick(-width, height, 3*width, height, 0x000000);
        let leftWall = new Brick(-width, -height, width, 3*height, 0x000000);
        let topWall = new Brick(-width, -height, 3*width, height, 0x000000);
        let rightWall = new Brick(width, -height, width, 3*height, 0x000000);
        walls = [bottomWall, leftWall, topWall, rightWall];
    }

    function loadLevel() {
        bricks = [];
        var level = levels[currentLevel][0];
        for (var row = 0; row < level.height; row++) {
            for (var pixel = 0; pixel < level.width; pixel++) {
                var index = row * level.width + pixel;
                if (level.data[index] > 0) {
                    var colour = level.data[index];
                    var brick = new Brick(
                      pixel * width / level.width,
                      row * width / level.height,
                      width / level.width,
                      width / level.height,
                      colour);
                    bricks.push(brick);
                }
            }
        }
    }

    function loadBasicLevel() {
        bricks = [];
        var colourIndex = 0;
        for (var i = 14/32; i < 18/32; i+=1/32) {
            for (var j = 0; j < 1; j+=1/18) {
                bricks.push(new Brick(j*width, i*height, 1/18*width, 1/32*height, colours[colourIndex]));
            }
            colourIndex++;
        }
    }

    function newGame() {
        currentLevel = 0;
        restart();
    }

    function startGame() {
        running = true;
    }

    function nextLevel() {
        currentLevel++;
        if (currentLevel === levels.length) {
            gameWon();
        } else {
            restart();
        }
    }

    function gameOver() {
        running = false;
        notify("GAME_OVER");
    }

    function gameWon() {
        running = false;
        notify("GAME_WON");
    }

    function getLevels() {
        return levels;
    }

    function tick(dTime) {
        if (running) {
            var input = 0; //TODO
            var scaledInput = input * dTime;
            scaledInput *= 0.0004*width;
            paddle.move(scaledInput);
            var collisions = physics.resolve(dTime, balls, getObstacles());
            resolveCollisions(collisions);
        }
    }

    function resolveCollisions(collisions) {
        for (var i =  0; i < collisions.length; i++) {
            var target = collisions[i].getTarget();
            // Check for bottom wall collision and game over
            if (target === walls[0]) {
                gameOver();
                return;
            }
            var index = bricks.indexOf(target);
            if (index >= 0) {
                bricks.splice(index, 1)[0].destroy();
                if (bricks.length === 0) {
                    nextLevel();
                    return;
                }
            }
        }
    }

    function getObstacles() {
        return [paddle].concat(bricks, walls);
    }

    function addObserver(observer) {
        observers.push(observer);
    }

    function removeObserver(observer) {
        var index = observers.indexOf(observer);
        observers.splice(index, 1);
    }

    function notify(args) {
        observers.forEach(function(observer) {
            observer.update(args);
        });
    }

    return {
        newGame : newGame,
        startGame: startGame,
        tick : tick,
        getLevels : getLevels,
        addObserver: addObserver,
        removeObserver: removeObserver,
        scene: scene
    }
}
