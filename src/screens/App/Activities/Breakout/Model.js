/* jshint -W097 */
"use strict";

import Ball from './Ball';
import Paddle from './Paddle';
import Wall from './Wall';
import { Circle, Physics, Rectangle, Vector2 } from './Physics';
import Brick from './Brick';

export default function Model() {

    var observers = [];

    var colours = [0xFFFF00, 0x00FF00, 0x0000FF, 0xFF0000];

    var levels = [
        ["piq_70010.png", "Sumo Wrestler", "IvoryMalinov", "piq.codeus.net", "http://piq.codeus.net/picture/70010/sumo_wrestler", "Creative Commons"],
        ["piq_306960.png", "Game bug", "mrskittens2003", "piq.codeus.net", "http://piq.codeus.net/picture/306960/game_bug", "Creative Commons"],
        ["piq_307048.png", "Mario Mushroom", "mrskittens2003", "piq.codeus.net", "http://piq.codeus.net/picture/307048/mario_mushroom", "Creative Commons"]
    ];

    var running = false;
    var currentLevel;
    var aR = 9/16; // aspectRatio, how many times is normalized x smaller that normalized y
    var paddle = [];
    var balls = [];
    var walls = [];
    var bricks = [];
    var physics = new Physics();
    const maxSubstepDeltaTime = 3;

    function restart() {
        paddle = new Paddle(new Rectangle(new Vector2(0.35*aR, 0.95), new Vector2(0.7*aR, 0.97)), 0, aR);
        createWalls();
        loadLevel();
        balls = [new Ball(new Circle(new Vector2(0.5*aR, 0.5), 0.02), new Vector2(-0.002, -0.002))];
        notify();
    }

    function createWalls() {
        var bottomWall = new Wall(new Rectangle(new Vector2(-aR, 1), new Vector2(2*aR, 2)), 0x000000);
        var leftWall = new Wall(new Rectangle(new Vector2(-aR, -1), new Vector2(0, 2)), 0x000000);
        var topWall = new Wall(new Rectangle(new Vector2(-aR, -1), new Vector2(2*aR, 0)), 0x000000);
        var rightWall = new Wall(new Rectangle(new Vector2(aR, -1), new Vector2(2*aR, 2)), 0x000000);
        walls = [bottomWall, leftWall, topWall, rightWall];
    }

    function loadLevel() { // TODO revert back to images
        bricks = [];
        var a = 1/32;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 18; j++) {
                bricks.push(new Brick(new Rectangle(new Vector2(j*a, (14+i)*a), new Vector2((j+1)*a, (14+i+1)*a)), colours[i]));
            }
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
            while (dTime > maxSubstepDeltaTime) {
                subTick(maxSubstepDeltaTime);
                dTime -= maxSubstepDeltaTime;
            }
            subTick(dTime);
        }
        notify()
    }

    function subTick(subDTime) {
        var input = 0; //TODO
        var scaledInput = input * subDTime;
        scaledInput *= 0.0004;
        paddle.move(scaledInput);
        var collisions = physics.resolve(subDTime, balls, getObstacles());
        resolveCollisions(collisions);
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
                bricks.splice(index, 1);
                if (bricks.length === 0) {
                    nextLevel();
                    return;
                }
            }
        }
    }

    function getObstacles() {
        var obstacles = [paddle];
        walls.forEach(function(wall) {
            obstacles.push(wall);
        });
        bricks.forEach(function(brick) {
            obstacles.push(brick);
        });
        return obstacles;
    }

    function getPaddle() {
        return paddle;
    }

    function getBalls() {
        return balls;
    }

    function getWalls() {
        return walls;
    }

    function getBricks() {
        return bricks;
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
        getPaddle : getPaddle,
        getBalls : getBalls,
        getWalls : getWalls,
        getBricks : getBricks,
        addObserver: addObserver,
        removeObserver: removeObserver
    }
}
