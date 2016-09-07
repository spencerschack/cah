import computed from 'ember-computed-decorators';
import random from '../../../utils/random';
import Transform from './base';
import Polar from './polar';

export const scale = 0.25;

export default Transform.extend(
  Polar,
{

  transformBindings: [
    'translateX(vw)',
    'translateY(vw)',
    'rotateZ(rad)',
    'rotateX(deg)',
    'scale'
  ],

  rotateX: 180,
  scale,

  @computed('card.answerOrdering.{id,updatedAt}')
  rotateZ(id, updatedAt) {
    return random(id, updatedAt, 'rotateZ').range(0, Math.PI * 2);
  },

  @computed('card.answerOrdering.{id,updatedAt}')
  theta(id, updatedAt) {
    return random(id, updatedAt, 'theta').range(0, 2 * Math.PI);
  },

  @computed('card.answerOrdering.{id,updatedAt}')
  radius(id, updatedAt) {
    return random(id, updatedAt, 'radius').range(0, 30);
  }

});
