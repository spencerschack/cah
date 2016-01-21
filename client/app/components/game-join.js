import Component from 'ember-component';

export default Component.extend({

  // attrs
  'on-register': null,

  actions: {
    
    registered(player) {
      this.sendAction('on-register', player);
    }
  
  }

});
