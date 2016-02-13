import Route from 'ember-route';
import get from 'ember-metal/get';
import service from 'ember-service/inject';

export default Route.extend({

  session: service(),

  beforeModel() {
    if(get(this, 'session.player')) {
      this.transitionTo('lobby');
    }
  },

  actions: {
    
    registered(player) {
      get(this, 'session').loaded(player);
      this.transitionTo('lobby');
    }
  
  }

});
