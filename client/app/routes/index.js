import Route from 'ember-route';
import get from 'ember-metal/get';
import service from 'ember-service/inject';

const include = 'memberships.player,current-round.question';

export default Route.extend({

  session: service(),

  model() {
    const player = get(this, 'session.player');
    return player ? get(this, 'store').findAll('game', {include}) : [];
  }

});
