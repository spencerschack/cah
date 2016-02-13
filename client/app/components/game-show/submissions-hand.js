import Component from 'ember-component';

export default Component.extend({

  classNames: ['game-show--submissions-hand'],

  // attrs
  choices: null,
  isCzar: null,
  position: null,
  'on-choose': null,
  'on-position': null,

  actions: {
    
    choose(choice) {
      this.sendAction('on-choose', choice);
    },

    position(position) {
      this.sendAction('on-position', position);
    }
  
  }

});
