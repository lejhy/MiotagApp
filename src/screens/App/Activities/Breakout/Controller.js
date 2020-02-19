export default function Controller(model, view) {

    // Declare states
    var states = {
        MENU : {
            onEnter : function() {
                model.newGame();
                renderGame();
                view.addHeader("MENU");
                view.addButton("Singleplayer", transition, states.SP_RUNNING);
                view.addButton("Attributions", transition, states.ATTRIBUTIONS);
            },
            onUpdate : function(args) {
                renderGame();
            },
            onLeave : function() {
                view.eraseMenu();
            }
        },
        SP_RUNNING : {
            onEnter : function() {
                startSpLoop();
            },
            onUpdate : function(args) {
                if (args === "GAME_OVER") {
                    transition(states.GAME_OVER);
                } else if (args === "GAME_WON") {
                    transition(states.GAME_WON);
                } else {
                    renderGame();
                }
            },
            onLeave : function() {
                stopLoop();
            }
        },
        GAME_OVER : {
            onEnter : function() {
                view.addHeader("GAME OVER");
                view.addButton("Back", transition, states.MENU);
            },
            onUpdate : function(args) {
                renderGame();
            },
            onLeave : function() {
                view.eraseMenu();
            }
        },
        GAME_WON : {
            onEnter : function() {
                view.addHeader("GAME WON");
                view.addButton("Back", transition, states.MENU);
            },
            onUpdate : function(args) {
                renderGame();
            },
            onLeave : function() {
                view.eraseMenu();
            }
        },
        ATTRIBUTIONS : {
            onEnter : function() {
                view.addHeader("ATTRIBUTIONS");
                var levels = model.getLevels();
                for (var i = 0; i < levels.length; i++) {
                    view.addParagraph("Level "+i+": "+levels[i][1]);
                    view.addParagraph("by "+levels[i][2]);
                    view.addParagraph("from <a href='"+levels[i][4]+"'>"+levels[i][3]+"</a>");
                    view.addParagraph("under "+levels[i][5]);
                    view.addParagraph("~~~~~~~~~~~~~")
                }
                view.addButton("Back", transition, states.MENU);
            },
            onUpdate : function(args) {
                renderGame();
            },
            onLeave : function() {
                view.eraseMenu();
            }
        }
    };

    // Transition table must be implemented after states declaration
    states.MENU.transitions = [
        states.SP_RUNNING, states.ATTRIBUTIONS
    ];
    states.SP_RUNNING.transitions = [
        states.GAME_OVER, states.GAME_WON
    ];
    states.GAME_OVER.transitions = [
        states.MENU
    ];
    states.GAME_WON.transitions = [
        states.MENU
    ];
    states.ATTRIBUTIONS.transitions = [
        states.MENU
    ];

    // Initial state
    var state = states.MENU;

    var intervalID;
    var dTime = 1000/60;

    function init() {
        model.addObserver(this);
        state.onEnter();
        renderGame();
    }

    function transition(nextState) {
        // Check that the transition is valid
        if (state.transitions.indexOf(nextState) < 0) {
            throw "Illegal state exception";
        }
        state.onLeave();
        state = nextState;
        state.onEnter();
    }

    function update(args) {
        state.onUpdate(args);
    }

    function spTick() {
        model.tick(dTime, view.getTilt());
    }

    function startSpLoop() {
        intervalID = setInterval(spTick, dTime);
    }

    function stopLoop() {
        clearInterval(intervalID);
    }

    function renderGame() {
        var currentModel = model;
        view.drawBackground();
        view.drawPaddle(currentModel.getPaddle().getRect());
        currentModel.getBalls().forEach(function(ball) {
            view.drawBall(ball.getCirc());
        });
        currentModel.getWalls().forEach(function(wall) {
            view.drawWall(wall.getRect(), wall.getColour());
        });
        currentModel.getBricks().forEach(function(brick) {
            view.drawBrick(brick.getRect(), brick.getColour());
        });
    }

    return {
        init : init,
        update : update
    }
}
