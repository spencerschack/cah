import Ember from 'ember';
import Route from 'ember-route';
import get from 'ember-metal/get';
import service from 'ember-service/inject';
import SubscriptionRoute from './mixins/subscription';

const include = [
  'memberships.player',
  'memberships.answer-orderings.answer',
  'rounds.submissions',
  'rounds.question'
].join(',');

export default Route.extend(
  SubscriptionRoute,
{

  session: service(),

  model({game_id}) {
    return get(this, 'store').findRecord('game', game_id, {include});
  },

  renderTemplate() {
    const player = get(this, 'session.player');
    if(!player) {
      this.render('intro');
    } else {
      this._super(...arguments);
    }
  },

  actions: {
    
    acknowledge() {
      const game = this.modelFor(this.routeName);
      const round = get(game, 'currentRound');
      this.transitionTo('game.round', round);
    }
  
  }

});
