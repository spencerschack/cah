import Route from 'ember-route';
import get from 'ember-metal/get';
import on from 'ember-evented/on';
import service from 'ember-service/inject';
import set from 'ember-metal/set';

const channel = 'GameChannel';

export default Route.extend({

  cable: service(),
  session: service(),

  model(...args) {
    const game = this._super(...args);
    const player = get(this, 'session.player');
    const membership = get(game, 'memberships').findBy('player', player);
    if(!membership) {
      this.transitionTo('game.join');
    } else {
      const id = get(game, 'id');
      const subscription = get(this, 'cable').subscribe({channel, id});
      set(this, 'subscription', subscription);
      return membership;
    }
  },

  unsubscribe: on('willTransition', function() {
    const subscription = get(this, 'subscription');
    if(subscription) subscription.unsubscribe();
  }),

  perform(action, data) {
    return get(this, 'subscription').perform(action, data);
  },

  actions: {

    back() {
      this.transitionTo('lobby');
    },

    position(position) {
      this.perform('position', position);
    },
    
    pick(membership) {
      this.perform('pick', get(membership, 'id'));
    },

    submit(answer) {
      const membership = this.modelFor(this.routeName);
      const submissions = get(membership, 'submissions');
      submissions.addObject(answer);
      if(get(submissions, 'length') === get(membership, 'game.question.pick'))
        this.perform('submit', submissions.mapBy('id'));
    }
  
  }

});
