import {computed} from 'ember-decorators/object';
import {or} from 'ember-decorators/object/computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import run from 'ember-runloop';
import Mixin from 'ember-metal/mixin';
import Hand from './hand';
import {hand as zIndexBase} from './z-index-bases';

export default Mixin.create(
  Hand,
{

  transformBindings: [
    'offsetX:translateX(%)',
    'offsetY:translateY(%)',
    'translateX(vw)',
    'translateY(vw)',
    'rotateZ(rad)',
    'rotateFix:rotateZ(rad)',
    'scale',
  ],

  offsetX: 0,
  offsetY: 0,

  @computed('isCardPanning', 'isGroupPanning')
  transition(isCardPanning, isGroupPanning) {
    return (isCardPanning || isGroupPanning) ? 'none' : null;
  },

  @computed('offsetX', 'angle')
  rotateFix(offset, angle) {
    return offset * angle / 50;
  },

  @computed('hand.length')
  maxPosition(length) {
    return length - 1;
  },

  tap() {
    const index = get(this, 'index');
    if(get(this, 'position') === index) {
      // TODO: bounce
    } else {
      set(this, 'position', index);
    }
  },

  panUp({elementDeltaX, elementDeltaY}) {
    set(this, 'isCardPanning', true);
    if(get(this, 'offsetY') > 0) elementDeltaY /= 4;
    set(this, 'offsetX', elementDeltaX * 100);
    set(this, 'offsetY', elementDeltaY * 100);
  },

  panX({elementDeltaX}) {
    set(this, 'isGroupPanning', true);
    const position = get(this, 'position');
    if(position < 0 || position > get(this, 'maxPosition'))
      elementDeltaX /= 4;
    set(this, 'position', -elementDeltaX);
  },

  panEnd() {
    if(get(this, 'offsetY') < -50) {
      const answerOrdering = get(this, 'answerOrdering');
      run.next(() => this.sendAction('on-submit', answerOrdering));
    }
    let position = get(this, 'position');
    const maxPosition = get(this, 'maxPosition');
    position = Math.min(Math.max(Math.round(position), 0), maxPosition);
    set(this, 'position', position);
    set(this, 'offsetX', 0);
    set(this, 'offsetY', 0);
    set(this, 'isGroupPanning', false);
    set(this, 'isCardPanning', false);
  }

});
