import computed, {alias} from 'ember-computed-decorators';
import Mixin from 'ember-metal/mixin';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import {hand as zIndexBase} from './z-index-bases';

export default Mixin.create({

  transformBindings: [
    'translateX(vw)',
    'translateY(vw)',
    'rotateZ(rad)',
    'scale',
  ],

  angle: 0.143,
  scale: 0.55,
  radius: 350,
  zIndexBase,

  @computed('hand.[]', 'answerOrdering')
  index(hand, answerOrdering) {
    return hand.indexOf(answerOrdering);
  },

  @computed('index', 'position')
  relativePosition(index, position) {
    return index - position;
  },

  @computed('rotateZ', 'radius', 'scale')
  translateX(rotateZ, radius, scale) {
    return Math.sin(rotateZ) * radius - (1 - scale) * 50 + 7;
  },

  @computed('rotateZ', 'radius')
  translateY(rotateZ, radius) {
    return (1 - Math.cos(rotateZ)) * radius;
  },

  @computed('relativePosition', 'angle')
  rotateZ(relativePosition, angle) {
    let rotateZ = angle * relativePosition;
    if(relativePosition < 0)
      rotateZ /= 3;
    if(relativePosition > 1)
      rotateZ = angle + (relativePosition - 1) * angle / 2;
    return rotateZ;
  },

  @computed('index', 'zIndexBase')
  zIndex(index, zIndexBase) {
    return index + zIndexBase;
  }

});
