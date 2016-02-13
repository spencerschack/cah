import Route from 'ember-route';
import get from 'ember-metal/get';
import service from 'ember-service/inject';

export default Route.extend({

  session: service(),

  afterModel(model) {
    const player = get(this, 'session.player');
    if(get(model, 'players').contains(player)) {
      this.transitionTo('game.play');
    } else if(player) {
      return this.join(player);
    }
  },

  join(player) {
    const game = this.modelFor(this.routeName);
    return get(this, 'store').createRecord('membership', {player, game}).save()
      .then(membership => this.transitionTo('game.play'));
  },

  actions: {
    
    join(player) {
      get(this, 'session').loaded(player);
      this.join(player);
    }
  
  }

});
