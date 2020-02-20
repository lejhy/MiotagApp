export default function Controller(model, view) {

    // Declare states
    var states = {
        MENU : {
            onEnter : function() {
                model.newGame();
                view.addHeader("MENU");
                view.addButton("Singleplayer", transition, states.SP_RUNNING);
                view.addButton("Attributions", transition, states.ATTRIBUTIONS);
            },
            onUpdate : function(args) {
                // nothing
            },
            onLeave : function() {
                view.eraseMenu();
            }
        },
        SP_RUNNING : {
            onEnter : function() {
                model.startGame();
            },
            onUpdate : function(args) {
                if (args === "GAME_OVER") {
                    transition(states.GAME_OVER);
                } else if (args === "GAME_WON") {
                    transition(states.GAME_WON);
                }
            },
            onLeave : function() {
                // nothing
            }
        },
        GAME_OVER : {
            onEnter : function() {
                view.addHeader("GAME OVER");
                view.addButton("Back", transition, states.MENU);
            },
            onUpdate : function(args) {
                // nothing
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
                // nothing
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
                    view.addParagraph("from "+levels[i][3]);
                    view.addParagraph("under "+levels[i][5]);
                    view.addParagraph("~~~~~~~~~~~~~")
                }
                view.addButton("Back", transition, states.MENU);
            },
            onUpdate : function(args) {
                // nothing
            },
            onLeave : function() {
                view.eraseMenu();
            }
        }
    };

    // Initial state
    var state = states.MENU;

    function init() {
        model.addObserver(this);
        view.app.ticker.add(deltaTime => model.tick(deltaTime));
        view.app.stage.addChild(model.scene);
        state.onEnter();
    }

    function transition(nextState) {
        state.onLeave();
        state = nextState;
        state.onEnter();
    }

    function update(args) {
        state.onUpdate(args);
    }

    return {
        init : init,
        update : update
    }
}
