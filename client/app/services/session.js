import Service from 'ember-service';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import {storageFor} from 'ember-local-storage';
import {computed} from 'ember-decorators/object';
import {or} from 'ember-decorators/object/computed';
import {service} from 'ember-decorators/service';

export default class SessionService extends Service {

  @service store

  player = null

  storage = storageFor('session')

  @or('devToken', 'storage.token') token

  @computed
  devToken() {
    const match = window.location.search.match(/token=([\w\.-]+)/);
    return match && match[1];
  }

  load() {
    if(!get(this, 'token')) return;
    return get(this, 'store')
      .find('player', 'current')
      .then(_ => set(this, 'player', _))
      .catch();
  }

  createPlayer(attrs) {
    const player = get(this, 'store').createRecord('player', attrs);
    return player.save().then(player => {
      set(this, 'storage.token', get(player, 'token'));
      return set(this, 'player', player);
    });
  }

};
