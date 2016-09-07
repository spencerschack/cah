import Component from 'ember-component';
import {alias, on, not} from 'ember-computed-decorators';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import service from 'ember-service/inject';

export default Component.extend({

  session: service(),

  @alias('session.player') player,

  isMenuOpen: false,
  @not('game.hasPlayer') hasToJoin,

  actions: {
    
    toggle() {
      this.toggleProperty('isMenuOpen');
    },

    join() {
      const player = get(this, 'player');
      const membership = get(this, 'game.memberships').createRecord({player});
      membership.save();
    }

  }

});
