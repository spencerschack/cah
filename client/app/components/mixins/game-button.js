import Mixin from 'ember-metal/mixin';

export default Mixin.create({

  classNameBindings: ['isHidden'],

  click() {
    this.sendAction();
  }

});
