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
    // Must force reload because the game could have been just created and the
    // relationships would not have been sideloaded.
    return get(this, 'store').findRecord('game', game_id, {include, reload: true});
  },

  renderTemplate() {
    const player = get(this, 'session.player');
    if(!player) {
      this.render('intro');
    } else {
      this._super(...arguments);
    }
  }

});
