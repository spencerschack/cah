import Component from 'ember-component';
import computed, {alias, equal} from 'ember-computed-decorators';
import get from 'ember-metal/get';
import service from 'ember-service/inject';
import set from 'ember-metal/set';
import {task} from 'ember-concurrency';
import {rotateTo} from '../../utils/array';

export default Component.extend({

  classNameBindings: ['isClosed'],

  session: service(),

  @alias('session.player') player,
  @alias('round.game') game,
  @equal('game.memberships.length', 1) gameNeedsMemberships,

  @computed('game.players.[]', 'player')
  playerNeedsToJoin(players, player) {
    return !players.includes(player);
  },

  @computed('game.memberships', 'game.czar')
  memberships(memberships, czar) {
    return memberships::rotateTo(czar);
  },

  join: task(function * () {
    const player = get(this, 'player');
    const membership = get(this, 'game.memberships').createRecord({player});
    yield membership.save();
    this.send('close');
  }).drop(),

  actions: {

    close() {
      set(this, 'isClosed', true);
    }
  
  }

});
