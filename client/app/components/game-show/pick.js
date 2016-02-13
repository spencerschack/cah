import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';

export default Component.extend({

  // attrs
  pick: null,
  picked: null,

  classNames: ['game-show--pick'],

  instructionPick: computed('pick', 'picked', function() {
    const toPick = get(this, 'pick') - get(this, 'picked');
    return Math.max(1, toPick);
  })

});
