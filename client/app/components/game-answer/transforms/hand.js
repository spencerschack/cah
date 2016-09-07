import computed, {alias} from 'ember-computed-decorators';
import get from 'ember-metal/get';
import Transform from './base';

const angle = 0.143;
const scale = 0.55;
const radius = 350;

export default Transform.extend({

  transformBindings: [
    'card.offsetX:translateX(%)',
    'card.offsetY:translateY(%)',
    'translateX(vw)',
    'translateY(vw)',
    'rotateZ(rad)',
    'rotateFix:rotateZ(rad)',
    'scale',
  ],

  scale,

  @alias('card.answerOrdering.handIndex') index,

  @computed('card.answerOrdering.handIndex', 'card.position')
  relativePosition(index, position) {
    return index - position;
  },

  @computed('rotateZ')
  translateX(rotateZ) {
    return Math.sin(rotateZ) * radius - (1 - scale) * 50 + 7;
  },

  @computed('rotateZ')
  translateY(rotateZ) {
    return radius * (1 - Math.cos(rotateZ));
  },

  @computed('card.offsetX')
  rotateFix(offset) {
    return angle * offset / 50;
  },

  @computed('relativePosition')
  rotateZ(relativePosition) {
    let rotateZ = angle * relativePosition;
    if(relativePosition < 0)
      rotateZ /= 3;
    if(relativePosition > 1)
      rotateZ = angle + (relativePosition - 1) * angle / 2;
    return rotateZ;
  },

  @computed('index')
  zIndex(index) {
    return index + 1;
  }

});
