import Component from 'ember-component';

export default Component.extend({

  classNames: ['game-show--answers-hand'],

  // attrs
  pick: 0,
  'player-membership': null,
  'on-choose': null,

  actions: {
    
    choose(choice) {
      this.sendAction('on-choose', choice);
    }
  
  }

});
