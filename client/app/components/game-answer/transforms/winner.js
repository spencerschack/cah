import get from 'ember-metal/get';
import set from 'ember-metal/set';
import {computed} from 'ember-decorators/object';
import {alias} from 'ember-decorators/object/computed';
import Transform from './base';

export default class WinnerTransform extends Transform {

  transformBindings = [
    'offsetX:translateX(%)',
    'offsetY:translateY(%)',
    'rotateZ(rad)',
    'scale'
  ]

  scale = 0.9

  offsetX = 0
  offsetY = 0

  @alias('round.isWinnerPanning') isCardPanning

  @computed('isCardPanning')
  transition(isCardPanning) {
    return isCardPanning ? 'none' : null;
  }

  panUp({elementDeltaX, elementDeltaY, viewportDeltaY}) {
    set(this, 'isCardPanning', true);
    if(get(this, 'offsetY') > 0) elementDeltaY /= 4;
    set(this, 'offsetX', elementDeltaX * 100 / 4);
    set(this, 'offsetY', elementDeltaY * 100);
    this.acknowledgeProgress(-viewportDeltaY);
  }

  panEnd() {
    set(this, 'isCardPanning', false);
    if(get(this, 'offsetY') < -50) {
      this.sendAction('on-acknowledging');
      get(this, 'component').one('transitionEnd',
        () => this.sendAction('on-acknowledged'));
    } else {
      set(this, 'offsetX', 0);
      set(this, 'offsetY', 0);
      this.acknowledgeProgress(0);
    }
  }

  acknowledgeProgress(progress) {
    set(this, 'round.acknowledgeProgress', progress);
  }

};
