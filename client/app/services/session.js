import Service from 'ember-service';
import get from 'ember-metal/get';
import service from 'ember-service/inject';
import set from 'ember-metal/set';
import {storageFor} from 'ember-local-storage';
import computed, {or} from 'ember-computed';

export default Service.extend({

  store: service(),

  player: null,

  storage: storageFor('session'),

  token: or('devToken', 'storage.token'),

  devToken: computed(function() {
    const match = window.location.search.match(/token=([\w\.-]+)/);
    return match && match[1];
  }),

  load() {
    if(!get(this, 'token')) return;
    return get(this, 'store')
      .find('player', 'current')
      .then(_ => set(this, 'player', _))
      .catch();
  },

  createPlayer(attrs) {
    const player = get(this, 'store').createRecord('player', attrs);
    return player.save().then(player => {
      set(this, 'storage.token', get(player, 'token'));
      return set(this, 'player', player);
    });
  }

});
