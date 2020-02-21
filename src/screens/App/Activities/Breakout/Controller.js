// @flow

export default function Controller(model, view) {
  // Declare states
  const states = {
    MENU: {
      onEnter() {
        model.newGame();
        view.addHeader('MENU');
        view.addButton('Singleplayer', transition, states.SP_RUNNING);
        view.addButton('Attributions', transition, states.ATTRIBUTIONS);
      },
      onUpdate(args) {
        // nothing
      },
      onLeave() {
        view.eraseMenu();
      },
    },
    SP_RUNNING: {
      onEnter() {
        model.startGame();
      },
      onUpdate(args) {
        if (args === 'GAME_OVER') {
          transition(states.GAME_OVER);
        } else if (args === 'GAME_WON') {
          transition(states.GAME_WON);
        }
      },
      onLeave() {
        // nothing
      },
    },
    GAME_OVER: {
      onEnter() {
        view.addHeader('GAME OVER');
        view.addButton('Back', transition, states.MENU);
      },
      onUpdate(args) {
        // nothing
      },
      onLeave() {
        view.eraseMenu();
      },
    },
    GAME_WON: {
      onEnter() {
        view.addHeader('GAME WON');
        view.addButton('Back', transition, states.MENU);
      },
      onUpdate(args) {
        // nothing
      },
      onLeave() {
        view.eraseMenu();
      },
    },
    ATTRIBUTIONS: {
      onEnter() {
        view.addHeader('ATTRIBUTIONS');
        const levels = model.getLevels();
        for (let i = 0; i < levels.length; i++) {
          view.addParagraph(`Level ${i}: ${levels[i][1]}`);
          view.addParagraph(`by ${levels[i][2]}`);
          view.addParagraph(`from ${levels[i][3]}`);
          view.addParagraph(`under ${levels[i][5]}`);
          view.addParagraph('~~~~~~~~~~~~~');
        }
        view.addButton('Back', transition, states.MENU);
      },
      onUpdate(args) {
        // nothing
      },
      onLeave() {
        view.eraseMenu();
      },
    },
  };

  // Initial state
  let state = states.MENU;

  function init() {
    model.addObserver(this);
    state.onEnter();
    view.app.ticker.add((deltaTime) => model.tick(deltaTime, view.getTilt()));
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
    init,
    update,
  };
}
