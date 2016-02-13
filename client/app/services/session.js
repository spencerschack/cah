import Service from 'ember-service';
import get from 'ember-metal/get';
import service from 'ember-service/inject';
import set from 'ember-metal/set';

export default Service.extend({

  store: service(),

  player: null,

  loaded(player) {
    return set(this, 'player', player);
  },

  load() {
    return get(this, 'store').queryRecord('player', {})
      .then(players => this.loaded(players[0]), () => null);
  }

});
