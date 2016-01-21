import Route from 'ember-route';
import get from 'ember-metal/get';
import on from 'ember-evented/on';
import service from 'ember-service/inject';
import set from 'ember-metal/set';

const channel = 'GameChannel';

export default Route.extend({

  cable: service(),
  session: service(),

  afterModel(model) {
    if(!get(model, 'players').contains(get(this, 'session.player'))) {
      this.transitionTo('game.join');
    } else {
      const id = get(model, 'id');
      const subscription = get(this, 'cable').subscribe({channel, id});
      set(this, 'subscription', subscription);
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
    
    pick(membership) {
      this.perform('pick', {id: get(membership, 'id')});
    },

    submit(answers) {
      this.perform('submit', {ids: answers.mapBy('id')});
    }
  
  }

});
