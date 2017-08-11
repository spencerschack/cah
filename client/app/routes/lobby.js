import Route from 'ember-route';
import get from 'ember-metal/get';
import service from 'ember-service/inject';

export default Route.extend({

  session: service(),

  beforeModel() {
    if(!get(this, 'session.player')) {
      this.transitionTo('register');
    }
  },

  model() {
    const player = get(this, 'session.player');
    return player.get('games').then(() => player);
  },

  actions: {

    created(game) {
      this.transitionTo('game', get(game, 'id'));
    }

  }

});
