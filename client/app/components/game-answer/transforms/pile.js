import computed from 'ember-computed-decorators';
import random from '../../../utils/random';
import Transform from './base';
import Polar from './polar';
import {pile as zIndexBase} from './z-index-bases';

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
  scale: 0.25,

  @computed('answerOrdering.{id,updatedAt}')
  rotateZ(id, updatedAt) {
    return random(id, updatedAt, 'rotateZ').range(Math.PI / 4, 3 * Math.PI / 4);
  },

  @computed('answerOrdering.{id,updatedAt}')
  theta(id, updatedAt) {
    return random(id, updatedAt, 'theta').range(0, 2 * Math.PI);
  },

  @computed('answerOrdering.{id,updatedAt}')
  radius(id, updatedAt) {
    return random(id, updatedAt, 'radius').range(0, 30);
  },

  @computed('pileIndex')
  zIndex(pileIndex) {
    return zIndexBase + pileIndex;
  },

  @computed('round.submissions.[]', 'submission')
  pileIndex(submissions, submission) {
    return submissions.indexOf(submission);
  },

  @computed('pileIndex', 'round.pick', 'game.memberships.length')
  pileNumber(pileIndex, pick, memberships) {
    return (memberships - 1) * pick - pileIndex;
  }

});
