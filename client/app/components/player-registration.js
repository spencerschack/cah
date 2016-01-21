import Component from 'ember-component';
import get from 'ember-metal/get';
import service from 'ember-service/inject';

export default Component.extend({

  store: service(),

  // attrs
  'on-register': null,

  actions: {
    
    submit(name) {
      if(name) {
        get(this, 'store').createRecord('player', {name}).save()
          .then(player => this.sendAction('on-register', player));
      }
    }
  
  }

});
