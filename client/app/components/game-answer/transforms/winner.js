import get from 'ember-metal/get';
import set from 'ember-metal/set';
import computed from 'ember-computed-decorators';
import Transform from './base';

export default Transform.extend({

  transformBindings: [
    'offsetX:translateX(%)',
    'offsetY:translateY(%)',
    'rotateZ(rad)',
    'scale'
  ],

  scale: 0.9,

  offsetX: 0,
  offsetY: 0,

  @computed('isCardPanning')
  transition(isCardPanning) {
    return isCardPanning ? 'none' : null;
  },

  panLeft({deltaX, deltaY}) {
    set(this, 'isCardPanning', true);
    if(get(this, 'offsetX') > 0) deltaX /= 4;
    this.incrementProperty('offsetX', deltaX * 100);
    this.incrementProperty('offsetY', deltaY * 100 / 4);
  },

  panEnd() {
    set(this, 'isCardPanning', false);
    if(get(this, 'offsetX') < -0.5)
      this.sendAction('on-acknowledge');
    set(this, 'offsetX', 0);
    set(this, 'offsetY', 0);
  }

});
