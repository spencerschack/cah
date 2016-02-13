import Component from 'ember-component';

export default Component.extend({

  // attrs
  'on-created': null,

  actions: {
    
    created(game) {
      this.sendAction('on-created', game);
    }
  
  }

});
