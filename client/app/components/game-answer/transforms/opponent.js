import computed from 'ember-computed-decorators';
import get from 'ember-metal/get';
import Transform from './base';
import Polar from './polar';
import {scale} from './pile';

const radius = 200;
const maxTheta = 3 / 4 * Math.PI;
const minTheta = -maxTheta;

export default Transform.extend(
  Polar,
{

  transformBindings: ['translateX(%)', 'translateY(%)', 'scale'],

  radius,
  scale,

  @computed('answerOrdering.{game.opponents.[],membership}')
  theta(submitters, submitter) {
    const index = submitters.indexOf(submitter);
    const position = index / (submitters.length - 1);
    return position * (maxTheta - minTheta) + minTheta
  }

});
