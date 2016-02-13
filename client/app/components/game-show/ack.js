import Component from 'ember-component';

export default Component.extend({

  classNames: ['game-show--ack'],

  // attrs
  game: null,
  'on-ack': null,

  actions: {
    
    ack() {
      this.sendAction('on-ack');
    }
  
  }

});
