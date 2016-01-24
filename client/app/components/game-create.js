import Component from 'ember-component';
import get from 'ember-metal/get';
import service from 'ember-service/inject';

export default Component.extend({

  classNames: ['game-create'],

  store: service(),

  // attrs
  'on-created': null,

  actions: {
    
    create() {
      get(this, 'store').createRecord('game').save()
        .then(game => this.sendAction('on-created', game));
    }
  
  }

});
